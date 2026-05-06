import { rateFromScore } from "../model/verdict.js";
import { lookupWorkProduct } from "../model/workProducts.js";
import { resolveProvider } from "../llm/provider.js";

/**
 * One-shot LLM evaluator (Anthropic or OpenAI, selected via the provider layer).
 *
 * One request per process. The prompt includes:
 *   - ASPICE CL1 rating scale (N/P/L/F)
 *   - The process purpose, BPs, and expected output WPs
 *   - Concatenated artifact excerpts (trimmed to a token-safe window)
 *
 * Expects a strict JSON response; falls back to an abstention shape if parsing fails.
 */
export class LlmEngine {
  constructor({ llm } = {}) {
    this.llm = llm ?? null;
  }

  async evaluate({ plugin, artifacts }) {
    const provider = await resolveProvider(this.llm ?? {});
    if (!provider) {
      return abstain(plugin, "LLM provider unavailable (no API key / client).");
    }

    const excerpt = buildExcerpt(artifacts, 24000);
    const user = buildPrompt(plugin, excerpt);

    try {
      const { text } = await provider.complete({
        system: SYSTEM_PROMPT,
        user,
        maxTokens: 4000,
      });
      const parsed = parseJsonBlock(text);
      return normalizeLlmResult(plugin, parsed);
    } catch (err) {
      return abstain(plugin, `LLM call failed (${provider.name}): ${err.message}`);
    }
  }
}

const SYSTEM_PROMPT = `You are an ASPICE v4.0 assessor specialized in Capability Level 1.
Evaluate whether the supplied artifact excerpts provide evidence that the target
process is performed. Use the PAM v4.0 rating scale strictly:
  F = >85-100% achieved
  L = >50-85%
  P = >15-50%
  N = 0-15%
Output ONLY valid JSON; no commentary, no markdown fences.`;

function buildPrompt(plugin, excerpt) {
  const wpList = plugin.outputWorkProducts.map((wp) => {
    const id = typeof wp === "string" ? wp : wp.id;
    const meta = lookupWorkProduct(id);
    return `  - ${id} ${meta.name}`;
  }).join("\n");
  const bpList = plugin.basePractices.map((bp) => `  - ${bp.id}: ${bp.title}`).join("\n");

  return `Process: ${plugin.id} ${plugin.name}
Purpose: ${plugin.purpose}

Base Practices:
${bpList}

Expected Output Work Products:
${wpList}

Artifact excerpts (${excerpt.length} chars, may be truncated):
-----
${excerpt}
-----

Return JSON of this exact shape:
{
  "basePractices": [ { "id": "BP1", "score": 0..1, "evidence": ["..."], "gaps": ["..."] } ],
  "workProducts":  [ { "id": "04-04", "score": 0..1, "found": true|false, "evidence": ["..."], "gaps": ["..."] } ],
  "notes": ["..."]
}
Include every BP and every Output WP listed above.`;
}

function buildExcerpt(artifacts, maxChars) {
  const chunks = [];
  let remaining = maxChars;
  for (const a of artifacts) {
    if (remaining <= 0) break;
    const body = (a.text ?? "").slice(0, remaining);
    chunks.push(`### ${a.name}\n${body}`);
    remaining -= body.length + (a.name?.length ?? 0) + 8;
  }
  return chunks.join("\n\n");
}

function parseJsonBlock(text) {
  if (!text) return null;
  const trimmed = text.trim();
  const body = trimmed.startsWith("```")
    ? trimmed.replace(/^```(?:json)?/i, "").replace(/```$/, "").trim()
    : trimmed;
  try {
    return JSON.parse(body);
  } catch {
    const m = body.match(/\{[\s\S]*\}$/);
    if (m) {
      try { return JSON.parse(m[0]); } catch { return null; }
    }
    return null;
  }
}

function normalizeLlmResult(plugin, parsed) {
  if (!parsed) {
    return {
      basePractices: plugin.basePractices.map((bp) => ({
        id: bp.id, title: bp.title, score: 0.5, rating: rateFromScore(0.5),
        evidence: [], gaps: ["LLM returned unparseable output."], note: "abstain",
      })),
      workProducts: plugin.outputWorkProducts.map((wp) => {
        const id = typeof wp === "string" ? wp : wp.id;
        return { id, score: 0.5, rating: rateFromScore(0.5), found: false, evidence: [], gaps: [] };
      }),
      notes: ["LLM JSON parse failed."],
    };
  }

  const bpByPlugin = new Map(plugin.basePractices.map((bp) => [bp.id, bp]));
  const bpResults = (parsed.basePractices ?? []).map((bp) => {
    const src = bpByPlugin.get(bp.id);
    return {
      id: bp.id,
      title: src?.title ?? bp.id,
      score: Number(bp.score) || 0,
      rating: rateFromScore(Number(bp.score) || 0),
      evidence: bp.evidence ?? [],
      gaps: bp.gaps ?? [],
    };
  });
  for (const [id, src] of bpByPlugin) {
    if (!bpResults.find((r) => r.id === id)) {
      bpResults.push({
        id, title: src.title, score: 0.5, rating: rateFromScore(0.5),
        evidence: [], gaps: ["LLM omitted this BP."], note: "abstain",
      });
    }
  }

  const declaredWpIds = plugin.outputWorkProducts.map((wp) => (typeof wp === "string" ? wp : wp.id));
  const wpResults = (parsed.workProducts ?? []).map((wp) => ({
    id: wp.id,
    score: Number(wp.score) || 0,
    rating: rateFromScore(Number(wp.score) || 0),
    found: Boolean(wp.found),
    evidence: wp.evidence ?? [],
    gaps: wp.gaps ?? [],
  }));
  for (const id of declaredWpIds) {
    if (!wpResults.find((r) => r.id === id)) {
      wpResults.push({
        id, score: 0.5, rating: rateFromScore(0.5), found: false,
        evidence: [], gaps: ["LLM omitted this Work Product."],
      });
    }
  }

  return {
    basePractices: bpResults,
    workProducts: wpResults,
    notes: parsed.notes ?? [],
  };
}

function abstain(plugin, reason) {
  const basePractices = plugin.basePractices.map((bp) => ({
    id: bp.id, title: bp.title, score: 0.5, rating: rateFromScore(0.5),
    evidence: [], gaps: [reason], note: "abstain",
  }));
  const workProducts = plugin.outputWorkProducts.map((wp) => {
    const id = typeof wp === "string" ? wp : wp.id;
    return { id, score: 0.5, rating: rateFromScore(0.5), found: false, evidence: [], gaps: [reason] };
  });
  return { basePractices, workProducts, notes: [reason] };
}
