/**
 * Build a prompt for LLM-assisted trace link detection between two process
 * artifact sets. Use only when the mechanical ID-matching in
 * crossProcess/traceability.js returns low confidence (e.g., natural-language
 * requirements without explicit IDs).
 */
export function buildTracePrompt({ sourceProcess, targetProcess, sourceExcerpt, targetExcerpt }) {
  return `You are helping verify bidirectional traceability between two ASPICE work products.

Source process: ${sourceProcess.id} ${sourceProcess.name}
Target process: ${targetProcess.id} ${targetProcess.name}

Source excerpts (requirements/architecture items):
${sourceExcerpt}

Target excerpts (downstream items that should reference the source):
${targetExcerpt}

For each source item, identify target items that satisfy / refine / verify it.
If none, mark as orphan. Return JSON:
{
  "links": [{"fromId": "...", "toId": "...", "confidence": 0-1, "rationale": "..."}],
  "orphansSource": ["..."],
  "orphansTarget": ["..."]
}
`.trim();
}
