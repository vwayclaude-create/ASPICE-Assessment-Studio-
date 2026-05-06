/**
 * Render a ProcessVerdict or ProjectVerdict as Markdown or JSON.
 *
 * Project mode shows: per-process capability verdicts, cross-process trace
 * matrices (source → target coverage + orphans), consistency findings,
 * requirement→test coverage, and SUP.10 change-propagation status.
 *
 * @param {import("../model/verdict.js").ProcessVerdict | {processes: any[], crossProcess: any, meta?: any}} verdict
 * @param {"markdown"|"json"} format
 */
export function renderReport(verdict, format = "markdown") {
  if (format === "json") return JSON.stringify(verdict, null, 2);
  if ("processes" in verdict) return renderProjectMd(verdict);
  return renderProcessMd(verdict);
}

function renderProcessMd(v) {
  const lines = [];
  lines.push(`## ${v.processId} ${v.processName}`);
  lines.push(`**Capability Level achieved: CL${v.capabilityLevel}** — ${v.capabilityLevelReason ?? ""}`);
  lines.push("");
  lines.push("### Base Practices");
  for (const bp of v.bps) {
    lines.push(`- **${bp.id}** [${bp.rating}] ${bp.title} — ${bp.scorePercent}% <sub>${bp.pamCitation}</sub>`);
  }
  if (v.wps?.length) {
    lines.push("");
    lines.push("### Output Work Products");
    for (const wp of v.wps) {
      lines.push(`- ${wp.wpId} ${wp.name}: [${wp.rating}] ${wp.scorePercent}%`);
    }
  }
  lines.push("");
  lines.push("### Process Attributes");
  for (const pa of v.pas) {
    lines.push(`#### ${pa.paId} (level ${pa.level}) — ${pa.rating} (collapses to ${pa.collapsed})`);
    for (const gp of pa.gps) {
      lines.push(`- ${gp.id} [${gp.rating}] ${gp.title} — ${gp.scorePercent}%`);
    }
  }
  return lines.join("\n");
}

function renderProjectMd(v) {
  const parts = [];
  parts.push(`# ASPICE Project Assessment Report`);
  if (v.meta) {
    parts.push(
      `_Target CL: ${v.meta.targetLevel} · Artifacts: ${v.meta.artifactCount} · Graph source: ${v.meta.graphSource}_`
    );
  }
  parts.push("");

  // Summary table
  parts.push("## Capability Summary");
  parts.push("| Process | CL | PA 1.1 | PA 2.1 | PA 2.2 | PA 3.1 | PA 3.2 |");
  parts.push("|---|:-:|:-:|:-:|:-:|:-:|:-:|");
  for (const p of v.processes) {
    const cell = (id) => p.pas.find((pa) => pa.paId === id)?.rating ?? "—";
    parts.push(
      `| ${p.processId} | ${p.capabilityLevel} | ${cell("PA 1.1")} | ${cell("PA 2.1")} | ${cell("PA 2.2")} | ${cell("PA 3.1")} | ${cell("PA 3.2")} |`
    );
  }
  parts.push("");

  // Cross-process section
  if (v.crossProcess) {
    parts.push("## Cross-Process Verification");

    const tm = v.crossProcess.traceMatrices ?? [];
    if (tm.length) {
      parts.push("### Traceability Matrix");
      parts.push("| From → To | WP | Src IDs | Tgt IDs | Coverage | Orphans src / tgt |");
      parts.push("|---|---|:-:|:-:|:-:|:-:|");
      for (const m of tm) {
        const cov = m.coveragePercent == null ? "n/a" : `${m.coveragePercent}%`;
        parts.push(
          `| ${m.sourceProcess} → ${m.targetProcess} | ${m.sourceWp} | ${m.sourceIds.length} | ${m.targetIds.length} | ${cov} | ${m.orphansSource.length} / ${m.orphansTarget.length} |`
        );
      }
      parts.push("");
    }

    if (v.crossProcess.consistency?.length) {
      parts.push("### Consistency Findings");
      for (const f of v.crossProcess.consistency) {
        parts.push(`- [${f.severity}] **${f.kind}** — ${f.description} (_artifacts: ${f.relatedArtifacts.join(", ")}_)`);
      }
      parts.push("");
    }

    const cov = v.crossProcess.coverage;
    if (cov && cov.totalRequirements > 0) {
      parts.push("### Requirement → Test Coverage");
      parts.push(
        `- Total requirements: ${cov.totalRequirements} · Covered: ${cov.coveredCount} (${cov.coveragePercent}%)`
      );
      if (cov.uncovered.length) parts.push(`- Uncovered: ${cov.uncovered.join(", ")}`);
      parts.push("");
    }

    const ch = v.crossProcess.changes;
    if (ch && ch.summary.total > 0) {
      parts.push("### Change Propagation (SUP.10)");
      parts.push(
        `- Total CRs: ${ch.summary.total} · Propagated: ${ch.summary.propagated} · Verification-only: ${ch.summary.verificationOnly} · Unresolved: ${ch.summary.unresolved}`
      );
      for (const r of ch.report) {
        parts.push(
          `- **${r.crId}** [${r.status}] — touched ${r.impactedArtifactCount} artifact(s): ${r.artifacts.join(", ") || "—"}`
        );
      }
      parts.push("");
    }
  }

  parts.push("---");
  parts.push("## Per-Process Detail");
  for (const p of v.processes) {
    parts.push(renderProcessMd(p));
    parts.push("");
  }
  return parts.join("\n");
}
