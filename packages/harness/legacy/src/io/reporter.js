import { labelOf } from "../model/verdict.js";

/**
 * Render a harness report as plain text, Markdown, or JSON.
 * Accepts either a single report (from evaluate) or a bundle (from evaluateAll).
 */
export function renderReport(report, format = "markdown") {
  const bundle = report.reports ? report : { reports: [report] };
  switch (format) {
    case "json": return JSON.stringify(report, null, 2);
    case "text": return bundle.reports.map(renderOneText).join("\n\n");
    case "markdown":
    default: return renderBundleMarkdown(bundle);
  }
}

function renderBundleMarkdown(bundle) {
  const header = bundle.reports.length > 1
    ? `# ASPICE CL1 Assessment — ${bundle.reports.length} processes\n\n`
      + `Engine: \`${bundle.engine ?? bundle.reports[0]?.engine ?? "-"}\`  `
      + `Achieved: **${bundle.achieved ?? bundle.reports.filter(r => r.achieved).length} / ${bundle.reports.length}**\n\n`
      + "| Process | Name | Rating | Score | CL1 |\n|---|---|:-:|:-:|:-:|\n"
      + bundle.reports.map((r) =>
          `| \`${r.processId}\` | ${r.processName} | **${r.rating}** | ${(r.score * 100).toFixed(0)}% | ${r.achieved ? "✓" : "✗"} |`,
        ).join("\n")
      + "\n\n---\n\n"
    : "";
  const bodies = bundle.reports.map(renderOneMarkdown).join("\n\n---\n\n");
  return header + bodies;
}

function renderOneMarkdown(r) {
  const lines = [];
  lines.push(`## ${r.processId} — ${r.processName}`);
  lines.push(`**Rating: ${r.rating}** (${labelOf(r.rating)}) · Score ${(r.score * 100).toFixed(1)}% · CL1 ${r.achieved ? "ACHIEVED" : "NOT ACHIEVED"}`);
  lines.push(`Engine: \`${r.engine}\` · Evaluated: ${r.evaluatedAt}`);
  lines.push("");
  lines.push("### Base Practices");
  lines.push("| BP | Title | Rating | Score |\n|---|---|:-:|:-:|");
  for (const bp of r.basePractices) {
    lines.push(`| ${bp.id} | ${bp.title} | ${bp.rating} | ${(bp.score * 100).toFixed(0)}% |`);
  }
  lines.push("");
  lines.push("### Output Work Products");
  lines.push("| ID | Name | Found | Rating | Score |\n|---|---|:-:|:-:|:-:|");
  for (const wp of r.workProducts) {
    lines.push(`| ${wp.id} | ${wp.name ?? ""} | ${wp.found ? "✓" : "✗"} | ${wp.rating} | ${(wp.score * 100).toFixed(0)}% |`);
  }
  if (r.gaps.length) {
    lines.push("");
    lines.push("### Gaps");
    for (const g of r.gaps) lines.push(`- ${g}`);
  }
  if (r.notes?.length) {
    lines.push("");
    lines.push("### Notes");
    for (const n of r.notes) lines.push(`- ${n}`);
  }
  return lines.join("\n");
}

function renderOneText(r) {
  const lines = [];
  lines.push(`${r.processId} ${r.processName}`);
  lines.push(`  Rating: ${r.rating} (${labelOf(r.rating)})  Score: ${(r.score * 100).toFixed(1)}%  CL1: ${r.achieved ? "ACHIEVED" : "NOT ACHIEVED"}`);
  lines.push(`  Base Practices:`);
  for (const bp of r.basePractices) {
    lines.push(`    - ${bp.id} [${bp.rating}]: ${bp.title}`);
  }
  lines.push(`  Work Products:`);
  for (const wp of r.workProducts) {
    lines.push(`    - ${wp.id} [${wp.rating}] ${wp.found ? "FOUND" : "MISSING"}`);
  }
  if (r.gaps.length) {
    lines.push(`  Gaps:`);
    for (const g of r.gaps) lines.push(`    * ${g}`);
  }
  return lines.join("\n");
}
