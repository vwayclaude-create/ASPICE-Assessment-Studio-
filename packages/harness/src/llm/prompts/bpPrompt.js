/**
 * Build the assessor prompt for one Base Practice.
 *
 * Returns a three-part structure that the LLM client adapters can translate
 * into cached + dynamic message blocks (Anthropic) or a concatenated user
 * message (OpenAI):
 *   - system  : assessor persona (stable, cacheable across all calls)
 *   - context : process spec + evidence excerpt (stable within a process eval)
 *   - task    : BP-specific question (varies per call)
 *
 * Project-context check: the assessor must additionally judge whether each
 * cited piece of evidence preserves the *product / project context* of the
 * batch (i.e. is from the same program/system as the rest of the deliverables).
 * Off-context evidence cannot earn full credit even if it structurally matches
 * the BP description.
 */
export function buildBpPrompt({
  process,
  bp,
  artifactsExcerpt,
  projectFingerprint,
}) {
  const system = `You are a qualified Automotive SPICE v4.0 assessor. You evaluate evidence against Base Practices and Process Attributes defined in the PAM. You MUST cite the relevant PAM section for every verdict (format: "PAM §X.Y.Z" with optional " BP#" or " GP X.Y.Z"). You also verify that submitted evidence is from the SAME product/project context as the rest of the deliverables — evidence that is structurally relevant but clearly references a different program, product, system, or release MUST be down-rated and flagged. You return JSON ONLY. All natural-language fields ("gaps", "evidence[].quote", "contextConsistency.note") MUST be written in Korean (한국어). PAM citations and identifiers stay as-is. Each "evidence[].quote" MUST be a verbatim, COMPLETE passage from the source — include the surrounding sentences so the reader has full context. Never truncate mid-sentence or mid-word, never abbreviate with "…", and prefer 2–6 contiguous sentences (typically 300–800 characters) over a one-line snippet.`;

  const context = [
    `Process: ${process.id} ${process.name}`,
    `PAM section: ${process.pamSection}`,
    `Process purpose: ${process.purpose}`,
    "",
    `Project / product context fingerprint (dominant terms across the uploaded batch):`,
    `  ${projectFingerprint || "(unknown)"}`,
    "",
    `Evidence excerpts (from uploaded work products):`,
    artifactsExcerpt || "(no artifacts supplied)",
  ].join("\n");

  const task = [
    `Evaluate this Base Practice:`,
    `  ${process.id}.${bp.id}: ${bp.title}`,
    bp.description ? `  ${bp.description}` : "",
    "",
    `Score 0-100 for extent of achievement. Cite PAM §${process.pamSection} ${bp.id} (or narrower).`,
    `Then judge whether the evidence preserves the project / product context:`,
    `  - "consistent"  : evidence clearly belongs to the same project/product as the fingerprint`,
    `  - "partial"     : evidence is mixed; some artifacts look off-project`,
    `  - "off-context" : evidence references a different project/product/release than the fingerprint`,
    `  - "unknown"     : not enough signal to decide`,
    `If status is "partial" or "off-context" you MUST reduce scorePercent accordingly and explain in "contextConsistency.note".`,
    `Return JSON ONLY:`,
    `{`,
    `  "scorePercent": <0-100>,`,
    `  "evidence": [{"artifactName": "...", "quote": "...", "location": "..."}],`,
    `  "gaps": ["..."],`,
    `  "pamCitation": "PAM §...",`,
    `  "contextConsistency": { "status": "consistent|partial|off-context|unknown", "note": "..." }`,
    `}`,
  ].join("\n");

  return { system, context, task };
}
