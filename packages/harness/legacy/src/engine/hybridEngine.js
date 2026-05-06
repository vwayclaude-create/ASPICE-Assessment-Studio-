import { RuleEngine } from "./ruleEngine.js";
import { LlmEngine } from "./llmEngine.js";
import { AgentEngine } from "./agentEngine.js";
import { rateFromScore } from "../model/verdict.js";

/**
 * Hybrid evaluator.
 *
 * Strategy:
 *   1. Run the rule engine first — cheap, deterministic, offline.
 *   2. Run the LLM engine on the same inputs (if available).
 *   3. Fuse per-item scores: weighted average, but when the rule engine
 *      returned abstention (score == 0.5 with a "no keywords" gap) we trust
 *      the LLM alone. When the LLM abstains we trust rules alone.
 *
 * This keeps behavior sensible offline and under API failure, while still
 * getting qualitative lift when the LLM is reachable.
 */
export class HybridEngine {
  constructor({ llm, weights, partner = "llm" } = {}) {
    this.rule = new RuleEngine();
    this.partnerName = partner;
    this.partner = partner === "agent"
      ? new AgentEngine({ llm })
      : new LlmEngine({ llm });
    this.weights = { rule: 0.4, llm: 0.6, ...(weights ?? {}) };
  }

  async evaluate(context) {
    const [ruleResult, llmResult] = await Promise.all([
      this.rule.evaluate(context),
      this.partner.evaluate(context),
    ]);

    const basePractices = fuseList(
      ruleResult.basePractices,
      llmResult.basePractices,
      this.weights,
      (r, l) => ({
        id: r?.id ?? l.id,
        title: r?.title ?? l.title,
        evidence: mergeStrings(r?.evidence, l?.evidence),
        gaps: mergeStrings(r?.gaps, l?.gaps),
      }),
    );

    const workProducts = fuseList(
      ruleResult.workProducts,
      llmResult.workProducts,
      this.weights,
      (r, l) => ({
        id: r?.id ?? l.id,
        found: Boolean(r?.found || l?.found),
        evidence: mergeStrings(r?.evidence, l?.evidence),
        gaps: mergeStrings(r?.gaps, l?.gaps),
      }),
    );

    return {
      basePractices,
      workProducts,
      notes: [...(ruleResult.notes ?? []), ...(llmResult.notes ?? [])],
      trace: llmResult.trace,
    };
  }
}

function fuseList(ruleItems, llmItems, weights, mergeExtras) {
  const byId = new Map();
  for (const r of ruleItems ?? []) byId.set(r.id, { rule: r, llm: null });
  for (const l of llmItems ?? []) {
    const entry = byId.get(l.id) ?? { rule: null, llm: null };
    entry.llm = l;
    byId.set(l.id, entry);
  }

  const out = [];
  for (const [id, { rule, llm }] of byId) {
    const score = fuseScore(rule, llm, weights);
    const extras = mergeExtras(rule, llm);
    out.push({
      ...extras,
      id,
      score,
      rating: rateFromScore(score),
    });
  }
  return out;
}

function fuseScore(rule, llm, weights) {
  const ruleAbstains = rule?.note === "abstain";
  const llmAbstains = llm?.note === "abstain";
  if (rule && llm && !ruleAbstains && !llmAbstains) {
    return clamp01(rule.score * weights.rule + llm.score * weights.llm);
  }
  if (rule && !ruleAbstains) return clamp01(rule.score);
  if (llm && !llmAbstains) return clamp01(llm.score);
  // Both abstain or both missing — return neutral abstention.
  return rule?.score ?? llm?.score ?? 0.5;
}

function mergeStrings(a, b) {
  const set = new Set();
  for (const s of (a ?? [])) set.add(s);
  for (const s of (b ?? [])) set.add(s);
  return Array.from(set);
}

function clamp01(n) {
  if (Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(1, n));
}
