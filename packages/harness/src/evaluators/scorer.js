/**
 * Scorer contract. Concrete implementations:
 *   - RuleScorer    : keyword / WPID presence heuristics (offline, fast)
 *   - LlmScorer     : one-shot LLM call with PAM citation enforced
 *   - HybridScorer  : weighted fusion of the above
 *
 * All scorer methods return a uniform shape so the evaluators remain agnostic.
 *
 * @typedef {Object} ScoreResult
 * @property {number} scorePercent   0..100
 * @property {import("../model/verdict.js").Evidence[]} evidence
 * @property {string[]} gaps
 *
 * @typedef {Object} Scorer
 * @property {(ctx: {process, bp, artifacts}) => Promise<ScoreResult>} scoreBP
 * @property {(ctx: {process, wp, artifacts}) => Promise<ScoreResult>} scoreWP
 * @property {(ctx: {process, paSpec, gp, bpResults, wpResults, artifacts}) => Promise<ScoreResult>} scoreGP
 */

export {};
