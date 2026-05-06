// Turns the JSON payload of files (text|base64) into harness-ready artifacts.
// A per-file extraction failure is logged and the file is skipped — the rest
// of the batch still evaluates. Returns { artifacts, skipped }.

import { extractText } from "./_textExtractor.js";

export async function buildArtifacts(input) {
  if (!Array.isArray(input)) return { artifacts: [], skipped: [] };
  const artifacts = [];
  const skipped = [];
  for (const a of input) {
    try {
      const { text, pages } = await extractText(a);
      artifacts.push({
        name: a.name,
        path: a.name,
        mimeType: a.mimeType || "text/plain",
        sizeBytes: a.sizeBytes ?? (text?.length ?? 0),
        text,
        pages,
      });
    } catch (e) {
      skipped.push({ name: a.name, reason: String(e?.message || e) });
      console.warn(`[aspice] skipped artifact "${a.name}":`, e?.message || e);
    }
  }
  return { artifacts, skipped };
}
