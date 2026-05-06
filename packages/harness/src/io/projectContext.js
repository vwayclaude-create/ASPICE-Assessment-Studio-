/**
 * Project / product context fingerprinting.
 *
 * Goal: when several artifacts are evaluated together, assessors should know
 * whether each artifact is actually talking about the same product/project as
 * the others. Off-context evidence (e.g. a different program's SRS uploaded
 * by mistake) must not earn the same BP/WP/GP credit as on-context evidence.
 *
 * Approach (purely deterministic, runs at indexing time):
 *
 *   1. Per-artifact term extraction — collect candidate proper-nouns:
 *        - uppercase tokens from the filename (e.g. "BMS-G3-SRS.docx" → BMS, G3)
 *        - mid-segments of extracted internal IDs (REQ-BMS-001 → BMS)
 *        - multi-word capitalized phrases that recur in the document head
 *      Generic ASPICE / document-template terms are filtered as noise.
 *
 *   2. Batch fingerprint — terms that appear in a majority (≥ ⌈N/2⌉, min 2)
 *      of artifacts. If no term clears the bar, fall back to terms shared by
 *      ≥ 2 artifacts. With only one artifact the fingerprint is empty (no
 *      cross-doc signal available).
 *
 *   3. Per-artifact match score — fraction of fingerprint terms present in
 *      the artifact's term set. Buckets: ≥0.6 consistent, ≥0.3 partial,
 *      otherwise off-context. `null` ⇒ unknown (cannot decide).
 *
 * Downstream consumers:
 *   - llm prompts include the fingerprint and ask for an explicit
 *     `contextConsistency` verdict.
 *   - ruleScorer down-weights matches that come only from off-context artifacts.
 *   - hybrid + adapters surface the per-result `contextConsistency` to UI.
 */

const NOISE = new Set([
  // standards / framework terms
  "PAM", "ASPICE", "SPICE", "ISO", "IEC", "SAE", "AUTOSAR", "MISRA",
  "SYS", "SWE", "MAN", "SUP", "ACQ", "SPL", "REU", "PIM", "PRM",
  // generic doc / engineering vocabulary that recurs in any project
  "REQ", "REQS", "REQUIREMENT", "REQUIREMENTS", "SRS", "SDD", "SAD",
  "TEST", "TESTS", "TC", "ARCH", "DESIGN", "API", "FAQ", "TBD", "TODO",
  "DOC", "DOCS", "DOCUMENT", "OVERVIEW", "INTRODUCTION", "PURPOSE",
  "REFERENCE", "REFERENCES", "VERSION", "RELEASE", "REVISION", "DRAFT",
  "APPENDIX", "ANNEX", "CHAPTER", "SECTION", "TABLE", "FIGURE",
  "BP", "GP", "WP", "PA", "CL",
  // common english / month / weekday words that the regex can pick up
  "THE", "AND", "OR", "FOR", "WITH", "FROM", "INTO", "OVER",
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
  "MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN",
]);

// Capitalized multi-word phrase (1–4 words, each starting with uppercase).
const PHRASE_RE = /\b([A-Z][A-Za-z0-9]+(?:[ -][A-Z][A-Za-z0-9]+){0,3})\b/g;
// Bare uppercase codename (≥3 chars), optionally with -SUFFIX.
const CODENAME_RE = /\b([A-Z][A-Z0-9]{2,}(?:-[A-Z0-9]+)*)\b/g;

function isAcceptable(term) {
  if (!term) return false;
  const t = term.trim();
  if (t.length < 3) return false;
  const upper = t.toUpperCase();
  // Skip pure numbers and noise tokens.
  if (/^\d+$/.test(t)) return false;
  if (NOISE.has(upper)) return false;
  // Each whitespace-separated piece must individually pass the noise filter,
  // so phrases like "Software Requirements" are still rejected via "REQUIREMENTS".
  for (const piece of upper.split(/[\s-]+/)) {
    if (NOISE.has(piece)) return false;
  }
  return true;
}

/**
 * Extract candidate project/product terms from one artifact.
 * Pure function; safe to call before or after `indexArtifacts`.
 */
export function extractProjectTerms(artifact) {
  const out = new Set();

  // 1. Filename tokens — split on non-alphanumeric, keep CamelCase / UPPER tokens.
  const nameTokens = (artifact.name || "")
    .replace(/\.[a-z0-9]+$/i, "")
    .split(/[^A-Za-z0-9]+/);
  for (const tok of nameTokens) {
    if (/^[A-Z][A-Za-z0-9]{2,}$/.test(tok) && isAcceptable(tok)) out.add(tok);
  }

  // 2. ID prefixes — REQ-BMS-001, ARCH_BMS_002 → "BMS".
  for (const id of artifact.extractedIds ?? []) {
    const parts = id.split(/[-_]/);
    // skip first segment (usually the generic role: REQ/TC/ARCH/SRS/CR)
    // and last segment (the numeric suffix).
    for (let i = 1; i < parts.length - 1; i++) {
      const p = parts[i];
      if (/^[A-Z][A-Z0-9]{1,}$/.test(p) && isAcceptable(p)) out.add(p);
    }
  }

  // 3. Body head — proper-noun phrases that recur ≥ 2× in the first ~4k chars.
  const head = (artifact.text ?? "").slice(0, 4000);
  const phraseCounts = new Map();
  for (const re of [PHRASE_RE, CODENAME_RE]) {
    // matchAll re-uses regex state; reset for safety.
    for (const m of head.matchAll(new RegExp(re.source, "g"))) {
      const term = m[1].trim();
      if (!isAcceptable(term)) continue;
      phraseCounts.set(term, (phraseCounts.get(term) ?? 0) + 1);
    }
  }
  for (const [term, n] of phraseCounts) {
    if (n >= 2) out.add(term);
  }

  return [...out];
}

/**
 * Compute the batch fingerprint and per-artifact match.
 *
 * @param {Array<{name: string, projectTerms?: string[], extractedIds?: string[], text?: string}>} artifacts
 * @returns {{
 *   dominant: string[],
 *   perArtifact: Array<{name: string, terms: string[], hits: string[], contextMatch: number|null}>
 * }}
 */
export function computeProjectFingerprint(artifacts) {
  const total = artifacts.length;
  const termsPerArtifact = artifacts.map((a) =>
    new Set(a.projectTerms ?? extractProjectTerms(a))
  );

  if (total === 0) return { dominant: [], perArtifact: [] };

  // Document-frequency: how many artifacts each term appears in.
  const docFreq = new Map();
  for (const terms of termsPerArtifact) {
    for (const t of terms) docFreq.set(t, (docFreq.get(t) ?? 0) + 1);
  }

  // Majority threshold (rounded up), but require co-occurrence in ≥ 2 artifacts.
  const majority = Math.max(2, Math.ceil(total * 0.5));
  let dominant = [...docFreq.entries()]
    .filter(([, n]) => n >= majority)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([t]) => t)
    .slice(0, 12);

  // Fallback: nothing reaches majority but some terms recur — use those.
  if (dominant.length === 0 && total >= 2) {
    dominant = [...docFreq.entries()]
      .filter(([, n]) => n >= 2)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([t]) => t)
      .slice(0, 8);
  }

  // No cross-document signal possible (single artifact, or terms all disjoint).
  if (dominant.length === 0) {
    return {
      dominant: [],
      perArtifact: artifacts.map((a, i) => ({
        name: a.name,
        terms: [...termsPerArtifact[i]],
        hits: [],
        contextMatch: null,
      })),
    };
  }

  const dom = new Set(dominant);
  const perArtifact = artifacts.map((a, i) => {
    const terms = termsPerArtifact[i];
    const hits = [...dom].filter((t) => terms.has(t));
    return {
      name: a.name,
      terms: [...terms],
      hits,
      contextMatch: dom.size ? hits.length / dom.size : null,
    };
  });

  return { dominant, perArtifact };
}

/** Bucket a context-match score (0..1 or null) into a categorical verdict. */
export function classifyContextMatch(score) {
  if (score == null) return "unknown";
  if (score >= 0.6) return "consistent";
  if (score >= 0.3) return "partial";
  return "off-context";
}

/**
 * Render the fingerprint into a short human-readable line for prompts.
 * Empty fingerprints become "(unknown — single artifact or no shared terms)"
 * so the assessor can still report contextConsistency=unknown without guessing.
 */
export function fingerprintForPrompt(fingerprint) {
  if (!fingerprint || !fingerprint.dominant?.length) {
    return "(unknown — single artifact or no shared product/project terms detected)";
  }
  return fingerprint.dominant.slice(0, 8).join(", ");
}
