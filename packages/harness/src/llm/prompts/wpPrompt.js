/**
 * Build the assessor prompt for one Output Work Product.
 *
 * The assessor must also confirm that the evidence used to satisfy the WP is
 * from the same product/project context as the rest of the batch. Submitting
 * a perfectly-formed SRS from a different program does not satisfy the WP for
 * *this* program.
 */
export function buildWpPrompt({ process, wp, artifactsExcerpt, projectFingerprint }) {
  const system = `You are a qualified Automotive SPICE v4.0 assessor. You judge whether submitted evidence satisfies the existence and characteristics of a declared Output Work Product, AND whether that evidence belongs to the same product/project context as the rest of the deliverables. Cite PAM §X.Y.Z. Return JSON ONLY. All natural-language fields ("gaps", "evidence[].quote", "contextConsistency.note") MUST be written in Korean (한국어). PAM citations and identifiers stay as-is.`;

  const context = [
    `Process: ${process.id} ${process.name}`,
    `PAM section: ${process.pamSection}`,
    "",
    `Project / product context fingerprint (dominant terms across the uploaded batch):`,
    `  ${projectFingerprint || "(unknown)"}`,
    "",
    `Evidence excerpts:`,
    artifactsExcerpt || "(no artifacts supplied)",
  ].join("\n");

  const task = [
    `Evaluate this Output Work Product:`,
    `  ${wp.id} ${wp.name}`,
    "",
    `Is there evidence that ${wp.id} ${wp.name} was produced with appropriate characteristics for THIS project/product?`,
    `Score 0-100 for extent of achievement. Cite PAM §${process.pamSection} or Annex B ${wp.id}.`,
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
