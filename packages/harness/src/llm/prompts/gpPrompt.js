/**
 * Build the assessor prompt for one Generic Practice (PA 1.1 ~ 3.2).
 *
 * Project-context check applies here too: GP evidence drawn from off-project
 * artifacts (e.g. another program's planning template) does not demonstrate
 * the GP for *this* project.
 */
export function buildGpPrompt({
  process,
  paSpec,
  gp,
  bpResults,
  wpResults,
  artifactsExcerpt,
  projectFingerprint,
}) {
  const system = `You are a qualified Automotive SPICE v4.0 assessor. You evaluate Process Attributes by judging their Generic Practices against evidence, AND verify that the evidence belongs to the same product/project context as the rest of the deliverables. Cite PAM §X.Y.Z for the rule you apply. Return JSON ONLY. All natural-language fields ("gaps", "evidence[].quote", "contextConsistency.note") MUST be written in Korean (한국어). PAM citations and identifiers stay as-is.`;

  const bpSummary = (bpResults ?? [])
    .map((r) => `  ${r.id}: ${r.rating} (${r.scorePercent}%)`)
    .join("\n") || "  (none)";
  const wpSummary = (wpResults ?? [])
    .map((r) => `  ${r.wpId} ${r.name}: ${r.rating}`)
    .join("\n") || "  (none)";

  const context = [
    `Process: ${process.id} ${process.name}`,
    `Process Attribute: ${paSpec.id} ${paSpec.name} (capability level ${paSpec.level})`,
    `PA scope: ${paSpec.scope ?? ""}`,
    "",
    `Project / product context fingerprint (dominant terms across the uploaded batch):`,
    `  ${projectFingerprint || "(unknown)"}`,
    "",
    `Prior per-process results:`,
    `Base Practices:`,
    bpSummary,
    `Output Work Products:`,
    wpSummary,
    "",
    `Evidence excerpts:`,
    artifactsExcerpt || "(no artifacts supplied)",
  ].join("\n");

  const task = [
    `Evaluate this Generic Practice:`,
    `  ${gp.id}: ${gp.title}`,
    gp.description ? `  ${gp.description}` : "",
    "",
    `Score 0-100. Cite the PAM section for this GP (typically "PAM §5 ${gp.id}").`,
    `Then judge whether the evidence preserves the project / product context:`,
    `  - "consistent" | "partial" | "off-context" | "unknown"`,
    `If "partial" or "off-context" you MUST reduce scorePercent and explain in contextConsistency.note.`,
    `Return JSON ONLY:`,
    `{`,
    `  "scorePercent": <0-100>,`,
    `  "evidence": [{"artifactName": "...", "quote": "..."}],`,
    `  "gaps": ["..."],`,
    `  "pamCitation": "PAM §...",`,
    `  "contextConsistency": { "status": "consistent|partial|off-context|unknown", "note": "..." }`,
    `}`,
  ].join("\n");

  return { system, context, task };
}
