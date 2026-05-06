import { percentToRating } from "../model/rating.js";

/**
 * Evaluate every Base Practice of a process against the supplied artifacts.
 * Returns an array of BPResult. Concrete scoring delegates to the configured
 * scoring strategy (rule | llm | hybrid) — this module is the orchestrator,
 * not the scorer.
 *
 * @param {import("./types.js").ProcessSpec} processSpec
 * @param {import("../model/evidence.js").Artifact[]} artifacts
 * @param {import("./scorer.js").Scorer} scorer
 * @param {{projectFingerprint?: import("../io/projectContext.js").ProjectFingerprint}} [options]
 * @returns {Promise<import("../model/verdict.js").BPResult[]>}
 */
export async function evaluateBPs(processSpec, artifacts, scorer, options = {}) {
  const { projectFingerprint } = options;
  const results = [];
  for (const bp of processSpec.basePractices) {
    const { scorePercent, evidence, gaps, contextConsistency } = await scorer.scoreBP({
      process: processSpec,
      bp,
      artifacts,
      projectFingerprint,
    });
    results.push({
      id: bp.id,
      title: bp.title,
      rating: percentToRating(scorePercent),
      scorePercent,
      evidence,
      gaps,
      pamCitation: bp.pamCitation ?? processSpec.pamSection,
      contextConsistency: contextConsistency ?? { status: "unknown", note: "" },
    });
  }
  return results;
}
