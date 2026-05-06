import { extractProjectTerms } from "./projectContext.js";

/**
 * Given raw Artifacts, attach:
 *   - wpidCandidates : likely WP IDs inferred from filename / content
 *   - extractedIds   : internal IDs (REQ-001, SRS_001, etc) extracted from body
 *   - projectTerms   : candidate product/project proper-nouns used by
 *                      projectContext.js to fingerprint the batch
 *
 * @param {import("../model/evidence.js").Artifact[]} artifacts
 * @param {{wpCatalog: Record<string, {name: string, aliases?: string[]}>}} ctx
 */
export function indexArtifacts(artifacts, ctx) {
  const wpByAlias = buildAliasIndex(ctx.wpCatalog);
  return artifacts.map((a) => {
    const extractedIds = extractInternalIds(a.text ?? "");
    const enriched = { ...a, extractedIds };
    return {
      ...enriched,
      wpidCandidates: inferWpIds(enriched, wpByAlias),
      projectTerms: extractProjectTerms(enriched),
    };
  });
}

function buildAliasIndex(catalog) {
  const idx = new Map();
  for (const [id, entry] of Object.entries(catalog ?? {})) {
    const tokens = [entry.name, ...(entry.aliases ?? [])];
    for (const t of tokens) {
      if (!t) continue;
      idx.set(normalize(t), id);
    }
  }
  return idx;
}

function inferWpIds(artifact, idx) {
  const hits = new Set();
  const hay = (artifact.name + " " + (artifact.text ?? "")).toLowerCase();
  for (const [alias, wpId] of idx) {
    if (hay.includes(alias)) hits.add(wpId);
  }
  return [...hits];
}

// Matches requirement/test/CR-style identifiers, including multi-segment
// forms like REQ-SYS-001, TC-SYS-003, ARCH-SYS-002, CR-042, STK-001.
const ID_PATTERN = /\b([A-Z]{2,6}(?:[-_][A-Z0-9]{2,})*[-_]\d+[A-Z0-9]*)\b/g;

function extractInternalIds(text) {
  const ids = new Set();
  for (const m of text.matchAll(ID_PATTERN)) ids.add(m[1]);
  return [...ids];
}

function normalize(s) {
  return s.toLowerCase().trim();
}
