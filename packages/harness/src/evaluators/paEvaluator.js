import { percentToRating, collapse } from "../model/rating.js";

/**
 * Evaluate Process Attributes (PA 1.1 ~ PA 3.2) for a process using its
 * generic practices. PA 1.1 is anchored on BP results; PA 2.1/2.2/3.1/3.2
 * are evaluated via GP-specific prompts against the artifacts.
 *
 * @param {import("./types.js").ProcessSpec} processSpec
 * @param {Record<string, import("./types.js").PASpec>} paSpecs  from processAttributes.json
 * @param {import("../model/verdict.js").BPResult[]} bpResults
 * @param {import("../model/verdict.js").WPResult[]} [wpResults]
 * @param {import("../model/evidence.js").Artifact[]} artifacts
 * @param {import("./scorer.js").Scorer} scorer
 * @param {{level: 1|2|3, projectFingerprint?: import("../io/projectContext.js").ProjectFingerprint}} opts
 *   `level` selects which capability level range to evaluate up to;
 *   `projectFingerprint` is the precomputed batch fingerprint passed to the
 *   scorer so per-GP context-consistency checks have the same baseline.
 * @returns {Promise<import("../model/verdict.js").PAResult[]>}
 */
export async function evaluatePAs(
  processSpec,
  paSpecs,
  bpResults,
  wpResults,
  artifacts,
  scorer,
  opts
) {
  const maxLevel = opts?.level ?? 1;
  const projectFingerprint = opts?.projectFingerprint;
  const out = [];
  for (const [paId, paSpec] of Object.entries(paSpecs)) {
    if (paSpec.level > maxLevel) continue;

    const gps = [];
    for (const gp of paSpec.genericPractices) {
      const { scorePercent, evidence, gaps, contextConsistency } = await scorer.scoreGP({
        process: processSpec,
        paSpec,
        gp,
        bpResults,
        wpResults,
        artifacts,
        projectFingerprint,
      });
      gps.push({
        id: gp.id,
        title: gp.title,
        rating: percentToRating(scorePercent),
        scorePercent,
        evidence,
        gaps,
        contextConsistency: contextConsistency ?? { status: "unknown", note: "" },
      });
    }

    const avg =
      gps.length === 0 ? 0 : gps.reduce((s, g) => s + g.scorePercent, 0) / gps.length;
    const rating = percentToRating(avg);
    out.push({
      paId,
      level: paSpec.level,
      rating,
      collapsed: collapse(rating),
      gps,
    });
  }
  return out;
}
