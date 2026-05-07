/**
 * HybridScorer — weighted fusion of rule and llm scores (default 40/60).
 *
 * Abstention handling: if either scorer throws or returns score=0 with a
 * `gaps` entry explicitly mentioning "rejected"/"failed", the remaining
 * scorer's result is used directly (no weighting dilution).
 *
 * Evidence and gaps from both scorers are concatenated so the final report
 * retains both the deterministic rule trace and the LLM narrative.
 *
 * Project-context: each scorer may attach a `contextConsistency` field. The
 * hybrid result reconciles them — the more decisive verdict wins (off-context
 * > partial > consistent > unknown), so a worry from either side is preserved.
 *
 * @param {{
 *   rule: import("./scorer.js").Scorer,
 *   llm: import("./scorer.js").Scorer,
 *   weights?: {rule: number, llm: number}
 * }} opts
 * @returns {import("./scorer.js").Scorer}
 */
export function createHybridScorer({ rule, llm, weights = { rule: 0.4, llm: 0.6 } }) {
  if (!rule || !llm) throw new Error("HybridScorer requires both `rule` and `llm` scorers");
  return {
    scoreBP: merge("scoreBP", rule, llm, weights),
    scoreWP: merge("scoreWP", rule, llm, weights),
    scoreGP: merge("scoreGP", rule, llm, weights),
  };
}

const CONTEXT_PRIORITY = { "off-context": 3, partial: 2, consistent: 1, unknown: 0 };

function reconcileContext(ruleCtx, llmCtx) {
  const r = ruleCtx ?? { status: "unknown", note: "" };
  const l = llmCtx ?? { status: "unknown", note: "" };
  // Prefer the more decisive (worse) status. Ties go to the LLM since it has
  // the richer signal (semantic comparison vs. term-set comparison).
  const rPrio = CONTEXT_PRIORITY[r.status] ?? 0;
  const lPrio = CONTEXT_PRIORITY[l.status] ?? 0;
  if (rPrio > lPrio) return r;
  if (lPrio > rPrio) return l;
  return l.status !== "unknown" ? l : r;
}

function merge(method, rule, llm, weights) {
  return async function combined(ctx) {
    const [r, l] = await Promise.allSettled([rule[method](ctx), llm[method](ctx)]);
    const ruleRes = r.status === "fulfilled" ? r.value : abstain(`rule threw: ${r.reason?.message}`);
    const llmRes = l.status === "fulfilled" ? l.value : abstain(`llm threw: ${l.reason?.message}`);

    const ruleOk = !isAbstention(ruleRes);
    const llmOk = !isAbstention(llmRes);

    let scorePercent;
    if (ruleOk && llmOk) {
      scorePercent = Math.round(ruleRes.scorePercent * weights.rule + llmRes.scorePercent * weights.llm);
    } else if (ruleOk) scorePercent = ruleRes.scorePercent;
    else if (llmOk) scorePercent = llmRes.scorePercent;
    else scorePercent = 0;

    return {
      scorePercent,
      // LLM evidence first: it produces full-sentence quotes with location/citation.
      // Rule evidence (keyword snippets) is supplementary and gets clipped by the
      // legacy adapter's slice(0, N) — putting it second keeps the richer quotes.
      evidence: [...(llmRes.evidence ?? []), ...(ruleRes.evidence ?? [])],
      gaps: [
        ...(ruleRes.gaps ?? []).map((g) => `[rule] ${g}`),
        ...(llmRes.gaps ?? []).map((g) => `[llm] ${g}`),
      ],
      pamCitation: llmRes.pamCitation,
      contextConsistency: reconcileContext(ruleRes.contextConsistency, llmRes.contextConsistency),
    };
  };
}

function isAbstention(r) {
  if (!r) return true;
  const gaps = r.gaps ?? [];
  return gaps.some((g) => /rejected|failed|threw/.test(g));
}

function abstain(reason) {
  return {
    scorePercent: 0,
    evidence: [],
    gaps: [`rejected: ${reason}`],
    contextConsistency: { status: "unknown", note: "" },
  };
}
