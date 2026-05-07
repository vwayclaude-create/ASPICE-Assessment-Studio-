import { extractProjectTerms } from "./projectContext.js";

/**
 * Given raw Artifacts, attach:
 *   - wpidCandidates : likely WP IDs inferred from filename / content
 *   - extractedIds   : internal IDs (REQ-001, SRS_001, etc) extracted from body
 *   - projectTerms   : candidate product/project proper-nouns used by
 *                      projectContext.js to fingerprint the batch
 *
 * `extraExcludedIdPrefixes` lets a caller add project-specific noise prefixes
 * on top of the built-in deny list (standards refs, algorithm names, protocol
 * tokens, environmental constraints) so e.g. team-specific tagging like
 * "DOC-*" or "MEMO-*" can be silenced without editing the harness.
 *
 * @param {import("../model/evidence.js").Artifact[]} artifacts
 * @param {{
 *   wpCatalog: Record<string, {name: string, aliases?: string[]}>,
 *   extraExcludedIdPrefixes?: Iterable<string>,
 * }} ctx
 */
export function indexArtifacts(artifacts, ctx) {
  const wpByAlias = buildAliasIndex(ctx.wpCatalog);
  const idOpts = ctx.extraExcludedIdPrefixes
    ? { excludedPrefixes: [...ctx.extraExcludedIdPrefixes].map((p) => p.toUpperCase()) }
    : undefined;
  return artifacts.map((a) => {
    const extractedIds = extractInternalIds(a.text ?? "", idOpts);
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

// Prefixes that look like internal IDs but are domain vocabulary, standards
// references, or environmental/algorithmic terms — never project requirements.
// Anything whose first prefix segment matches this set is dropped from
// extractedIds, keeping coverage / traceability metrics focused on real IDs.
//
// Heuristic: only the first prefix segment before the first separator is
// checked. So "EC-001" is filtered (prefix "EC"), but "REQ-EC-001" is kept
// (prefix "REQ").
const EXCLUDED_PREFIXES = new Set([
  // Environmental / domain constraint tags
  "EC",
  // Checksum / hash / encryption algorithms (not IDs)
  "CRC", "MD", "SHA", "AES", "HMAC", "RSA",
  // Standards / specifications references
  "ISO", "IEC", "SAE", "IEEE", "RFC", "ASTM", "ANSI", "DIN", "EN",
  "MISRA", "AUTOSAR", "VDA", "ASPICE", "PAM",
  // Automotive safety integrity levels
  "ASIL", "QM",
  // Network / bus protocols and protocol variants
  "CAN", "LIN", "UDS", "OBD", "FLEXRAY", "ETHERNET", "DOIP",
  // Network / web protocols and versions
  "HTTP", "HTTPS", "TCP", "UDP", "IP", "IPV", "URL", "URI", "USB", "PCI",
  // Diagnostic identifiers (not requirements; could be test targets but
  // typically appear as values rather than trace IDs)
  "DTC",
]);

export function extractInternalIds(text, opts = {}) {
  const excluded = opts.excludedPrefixes
    ? new Set([...EXCLUDED_PREFIXES, ...opts.excludedPrefixes])
    : EXCLUDED_PREFIXES;
  const ids = new Set();
  for (const m of text.matchAll(ID_PATTERN)) {
    const id = m[1];
    const firstPrefix = id.split(/[-_]/)[0];
    if (excluded.has(firstPrefix)) continue;
    ids.add(id);
  }
  return [...ids];
}

function normalize(s) {
  return s.toLowerCase().trim();
}
