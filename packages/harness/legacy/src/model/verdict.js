// ASPICE PAM v4.0 rating scale (ISO/IEC 33020)
// N Not achieved         0-15%
// P Partially achieved   >15-50%
// L Largely achieved     >50-85%
// F Fully achieved       >85-100%

export const RATING = Object.freeze({
  N: "N",
  P: "P",
  L: "L",
  F: "F",
});

export function rateFromScore(score) {
  if (score > 0.85) return RATING.F;
  if (score > 0.50) return RATING.L;
  if (score > 0.15) return RATING.P;
  return RATING.N;
}

export function labelOf(rating) {
  return {
    N: "Not achieved",
    P: "Partially achieved",
    L: "Largely achieved",
    F: "Fully achieved",
  }[rating] ?? "Unknown";
}

// CL1 is achieved when PA 1.1 (Process performance) is at least Largely achieved.
// The process-level score is the minimum of all Base Practice scores and all
// required Output Work Product scores, because CL1 requires evidence that
// every BP produces its expected WP.
export function aggregateCL1({ basePractices, workProducts }) {
  const bpScores = basePractices.map((bp) => bp.score);
  const wpScores = workProducts.map((wp) => wp.score);
  const allScores = [...bpScores, ...wpScores];

  if (allScores.length === 0) {
    return { score: 0, rating: RATING.N, achieved: false };
  }

  const avg = allScores.reduce((a, b) => a + b, 0) / allScores.length;
  const min = Math.min(...allScores);
  // Penalize heavily when any single BP/WP is missing (weighted 60/40 avg/min).
  const score = avg * 0.6 + min * 0.4;
  const rating = rateFromScore(score);
  const achieved = rating === RATING.L || rating === RATING.F;
  return { score, rating, achieved };
}
