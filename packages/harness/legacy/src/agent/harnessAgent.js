import { TOOL_SCHEMAS, TERMINAL_TOOL, buildToolHandlers } from "./tools.js";
import { AGENT_SYSTEM_PROMPT } from "./systemPrompt.js";
import { lookupWorkProduct } from "../model/workProducts.js";
import { rateFromScore } from "../model/verdict.js";
import { resolveProvider } from "../llm/provider.js";

const DEFAULT_MAX_TURNS = 12;
const DEFAULT_MAX_TOKENS = 4096;

/**
 * Harness agent. Runs a provider-agnostic tool-use loop that drives the evaluation.
 *
 *   agent = new HarnessAgent({ harness, provider })
 *   raw   = await agent.evaluate({ plugin, artifacts })
 *
 * `provider` is any object satisfying the Provider contract (see src/llm/*.js):
 *   runTools({ system, tools, messages, maxTokens }) → { text, toolUses[], assistantPayload }
 *   appendAssistant(messages, resp) → void
 *   appendToolResults(messages, [{id, content}]) → void
 *
 * The returned shape is engine-compatible: { basePractices, workProducts, notes, trace }.
 * `trace` records every tool call so the engine report can surface it.
 */
export class HarnessAgent {
  constructor({ harness, provider, client, apiKey, model, llm, maxTurns, maxTokens } = {}) {
    this.harness = harness;
    this.provider = provider ?? null;
    // Deferred provider resolution: any of `client`, `apiKey`, `model`, or `llm`
    // triggers a lazy resolveProvider() on first evaluate(). Keeps the
    // simple `new HarnessAgent({ harness, client })` form working.
    this._pendingLlm = !this.provider && (client || apiKey || model || llm)
      ? { client, apiKey, model, ...(llm ?? {}) }
      : null;
    this.maxTurns = maxTurns ?? DEFAULT_MAX_TURNS;
    this.maxTokens = maxTokens ?? DEFAULT_MAX_TOKENS;
  }

  async evaluate({ plugin, artifacts }) {
    if (!this.provider && this._pendingLlm) {
      this.provider = await resolveProvider(this._pendingLlm);
      this._pendingLlm = null;
    }
    if (!this.provider) {
      return abstention(plugin, "Agent unavailable: no LLM provider (no API key / client).");
    }

    const handlers = buildToolHandlers({
      artifacts,
      harness: this.harness,
      processId: plugin.id,
    });

    const trace = [];
    const messages = [{
      role: "user",
      content:
        `Target process: ${plugin.id} ${plugin.name}\n` +
        `Purpose: ${plugin.purpose}\n` +
        `Artifacts available: ${artifacts.length}\n\n` +
        `Evaluate CL1 for this process. Begin by listing the artifacts and reading the process spec, ` +
        `then gather evidence and submit the verdict via submit_cl1_verdict.`,
    }];

    for (let turn = 0; turn < this.maxTurns; turn++) {
      let resp;
      try {
        resp = await this.provider.runTools({
          system: AGENT_SYSTEM_PROMPT,
          tools: TOOL_SCHEMAS,
          messages,
          maxTokens: this.maxTokens,
        });
      } catch (err) {
        return abstention(plugin, `Agent call failed (${this.provider.name ?? "llm"}): ${err.message}`, trace);
      }

      if (!resp?.toolUses || resp.toolUses.length === 0) {
        const text = resp?.text ?? "";
        return abstention(
          plugin,
          `Agent ended without calling submit_cl1_verdict. Final text: ${text.slice(0, 240)}`,
          trace,
        );
      }

      const terminalCall = resp.toolUses.find((t) => t.name === TERMINAL_TOOL);
      if (terminalCall) {
        trace.push({ turn, tool: TERMINAL_TOOL, input: terminalCall.input });
        return normalizeVerdict(plugin, terminalCall.input, trace);
      }

      this.provider.appendAssistant(messages, resp);
      const toolResults = [];
      for (const use of resp.toolUses) {
        const handler = handlers[use.name];
        let result;
        if (!handler) {
          result = { error: `Unknown tool: ${use.name}` };
        } else {
          try { result = await handler(use.input ?? {}); }
          catch (e) { result = { error: e.message }; }
        }
        trace.push({ turn, tool: use.name, input: use.input, result: summarizeForTrace(result) });
        toolResults.push({ id: use.id, content: JSON.stringify(result) });
      }
      this.provider.appendToolResults(messages, toolResults);
    }

    return abstention(plugin, `Agent exceeded max turns (${this.maxTurns}).`, trace);
  }
}

function normalizeVerdict(plugin, payload, trace) {
  const bpById = new Map(plugin.basePractices.map((bp) => [bp.id, bp]));
  const submittedBpIds = new Set((payload.basePractices ?? []).map((b) => b.id));
  const basePractices = (payload.basePractices ?? []).map((bp) => {
    const src = bpById.get(bp.id);
    const score = clamp01(Number(bp.score) || 0);
    return {
      id: bp.id,
      title: src?.title ?? bp.id,
      score,
      rating: rateFromScore(score),
      evidence: bp.evidence ?? [],
      gaps: bp.gaps ?? [],
    };
  });
  for (const [id, src] of bpById) {
    if (!submittedBpIds.has(id)) {
      basePractices.push({
        id, title: src.title, score: 0, rating: rateFromScore(0),
        evidence: [], gaps: ["Agent did not submit this BP."], note: "omitted",
      });
    }
  }

  const declaredWpIds = plugin.outputWorkProducts.map((wp) => (typeof wp === "string" ? wp : wp.id));
  const submittedWpIds = new Set((payload.workProducts ?? []).map((w) => w.id));
  const workProducts = (payload.workProducts ?? []).map((wp) => {
    const score = clamp01(Number(wp.score) || 0);
    const meta = lookupWorkProduct(wp.id);
    return {
      id: wp.id,
      name: meta.name,
      score,
      rating: rateFromScore(score),
      found: Boolean(wp.found ?? score > 0),
      evidence: wp.evidence ?? [],
      gaps: wp.gaps ?? [],
    };
  });
  for (const id of declaredWpIds) {
    if (!submittedWpIds.has(id)) {
      const meta = lookupWorkProduct(id);
      workProducts.push({
        id, name: meta.name, score: 0, rating: rateFromScore(0), found: false,
        evidence: [], gaps: ["Agent did not submit this Work Product."],
      });
    }
  }

  return {
    basePractices,
    workProducts,
    notes: payload.notes ?? [],
    trace,
  };
}

function abstention(plugin, reason, trace = []) {
  const basePractices = plugin.basePractices.map((bp) => ({
    id: bp.id, title: bp.title, score: 0.5, rating: rateFromScore(0.5),
    evidence: [], gaps: [reason], note: "abstain",
  }));
  const workProducts = plugin.outputWorkProducts.map((wp) => {
    const id = typeof wp === "string" ? wp : wp.id;
    const meta = lookupWorkProduct(id);
    return {
      id, name: meta.name, score: 0.5, rating: rateFromScore(0.5),
      found: false, evidence: [], gaps: [reason],
    };
  });
  return { basePractices, workProducts, notes: [reason], trace };
}

function summarizeForTrace(result) {
  if (result == null) return null;
  if (typeof result === "string") return result.slice(0, 200);
  const copy = {};
  for (const [k, v] of Object.entries(result)) {
    if (typeof v === "string" && v.length > 200) copy[k] = v.slice(0, 200) + "…";
    else if (Array.isArray(v) && v.length > 5) copy[k] = [...v.slice(0, 5), `…(+${v.length - 5} more)`];
    else copy[k] = v;
  }
  return copy;
}

function clamp01(n) {
  if (Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(1, n));
}
