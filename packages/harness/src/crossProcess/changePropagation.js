/**
 * Analyze SUP.10 Change Request propagation across the V-model.
 *
 * For each CR ID extracted from artifacts tagged as 13-16 Change Request:
 *   - Find every artifact that references the CR ID in its body text.
 *   - Group the impacted artifacts by WP ID and by process category, so the
 *     report can show "CR-042 touched SRS (17-00), SW arch (04-04), and test
 *     cases (08-50)" — i.e. whether the change propagated through the V.
 *   - Flag CRs that have no downstream references (unresolved / not yet
 *     implemented) vs CRs with references only in test-adjacent WPs
 *     (verification-only, may indicate missed design updates).
 *
 * @param {import("../model/evidence.js").Artifact[]} artifacts
 * @param {{graph?: ReturnType<typeof import("./traceGraph.js").buildProcessGraph>}} [ctx]
 */
export function analyzeChangePropagation(artifacts, ctx = {}) {
  // A "change request ID" is conventionally prefixed CR- / CHG- / ECR-.
  // We restrict to this shape to avoid treating every requirement/design ID
  // that happens to appear in a 13-16 artifact as a change request.
  const CR_ID_RE = /^(?:CR|CHG|ECR)[-_]\d+/i;
  const crArtifacts = artifacts.filter((a) => a.wpidCandidates?.includes("13-16"));
  const crIds = new Set();
  const crToOrigin = new Map();
  for (const a of crArtifacts) {
    for (const id of a.extractedIds ?? []) {
      if (!CR_ID_RE.test(id)) continue;
      crIds.add(id);
      if (!crToOrigin.has(id)) crToOrigin.set(id, a.name);
    }
  }

  const impactByCr = new Map();
  for (const cr of crIds) {
    const impacted = [];
    for (const a of artifacts) {
      if (a.wpidCandidates?.includes("13-16")) continue;
      if (a.text?.includes(cr)) {
        impacted.push({
          artifactName: a.name,
          wpidCandidates: a.wpidCandidates ?? [],
          processHint: guessProcess(a.wpidCandidates ?? [], ctx.graph),
        });
      }
    }
    impactByCr.set(cr, impacted);
  }

  const report = [];
  for (const cr of crIds) {
    const impacts = impactByCr.get(cr) ?? [];
    const wps = new Set(impacts.flatMap((i) => i.wpidCandidates));
    const processes = new Set(impacts.map((i) => i.processHint).filter(Boolean));
    const testOnly =
      impacts.length > 0 &&
      impacts.every((i) =>
        i.wpidCandidates.some((w) => ["08-60", "08-59", "15-52", "13-24", "13-25", "03-50"].includes(w))
      );
    let status = "unresolved";
    if (impacts.length > 0 && !testOnly) status = "propagated";
    else if (testOnly) status = "verification-only";
    report.push({
      crId: cr,
      origin: crToOrigin.get(cr),
      status,
      impactedArtifactCount: impacts.length,
      impactedWps: [...wps],
      impactedProcesses: [...processes],
      artifacts: impacts.map((i) => i.artifactName),
    });
  }

  return {
    changeRequests: [...crIds],
    report,
    summary: {
      total: crIds.size,
      propagated: report.filter((r) => r.status === "propagated").length,
      unresolved: report.filter((r) => r.status === "unresolved").length,
      verificationOnly: report.filter((r) => r.status === "verification-only").length,
    },
  };
}

function guessProcess(wps, graph) {
  if (!graph) return null;
  const wpToProducer = new Map();
  for (const e of graph.edges ?? []) {
    for (const w of e.via ?? []) if (!wpToProducer.has(w)) wpToProducer.set(w, e.from);
  }
  for (const w of wps) {
    if (wpToProducer.has(w)) return wpToProducer.get(w);
  }
  return null;
}
