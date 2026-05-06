/**
 * Requirement → Test coverage matrix.
 * Sources: requirement artifacts (WP 17-00, 17-08, 17-11). Targets: test
 * artifacts (WP 08-50, 08-52, 03-50). Reports percentage of source IDs
 * referenced by any target artifact.
 *
 * @param {import("../model/evidence.js").Artifact[]} artifacts
 */
export function computeCoverage(artifacts) {
  // v4.0 work products — requirements (17-*) and verification/validation
  // evidence (08-60/59 plan, 15-52/13-24 results, 03-50 verification data).
  const reqWps = new Set(["17-00", "17-05", "17-54", "17-55", "17-57"]);
  const testWps = new Set(["08-60", "08-59", "08-58", "08-57", "15-52", "13-24", "13-25", "03-50"]);

  const reqs = artifacts.filter((a) =>
    a.wpidCandidates?.some((w) => reqWps.has(w))
  );
  const tests = artifacts.filter((a) =>
    a.wpidCandidates?.some((w) => testWps.has(w))
  );

  const reqIds = new Set(reqs.flatMap((a) => a.extractedIds ?? []));
  const covered = new Set();

  for (const id of reqIds) {
    for (const t of tests) {
      if (t.text?.includes(id)) {
        covered.add(id);
        break;
      }
    }
  }

  const uncovered = [...reqIds].filter((id) => !covered.has(id));
  const coveragePercent =
    reqIds.size === 0 ? 0 : Math.round((covered.size / reqIds.size) * 100);

  return {
    totalRequirements: reqIds.size,
    coveredCount: covered.size,
    coveragePercent,
    uncovered,
  };
}
