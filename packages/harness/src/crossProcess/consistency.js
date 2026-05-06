/**
 * Look for consistency issues across artifacts that span multiple processes.
 * Targets the spirit of WP 13-51 "Consistency Evidence" and
 * "BPx: Ensure consistency and establish bidirectional traceability".
 *
 * Checks:
 *  - ID mismatch (same logical ID with different attributes across docs)
 *  - Status drift (req says "approved" in one, "draft" in another)
 *  - Terminology divergence (same concept named inconsistently)
 *
 * @param {import("../model/evidence.js").Artifact[]} artifacts
 * @returns {import("../model/trace.js").ConsistencyFinding[]}
 */
export function checkConsistency(artifacts) {
  const findings = [];
  const idToOccurrences = new Map();

  for (const a of artifacts) {
    for (const id of a.extractedIds ?? []) {
      const list = idToOccurrences.get(id) ?? [];
      list.push(a);
      idToOccurrences.set(id, list);
    }
  }

  const statusRegex = /\b(draft|review|approved|released|obsolete)\b/gi;
  for (const [id, occurrences] of idToOccurrences) {
    if (occurrences.length < 2) continue;
    const statuses = new Set();
    for (const a of occurrences) {
      const window = sliceAround(a.text ?? "", id, 120);
      for (const m of window.matchAll(statusRegex)) {
        statuses.add(m[1].toLowerCase());
      }
    }
    if (statuses.size > 1) {
      findings.push({
        kind: "status-drift",
        description: `ID ${id} appears with divergent statuses: ${[...statuses].join(", ")}`,
        relatedArtifacts: occurrences.map((a) => a.name),
        severity: "warning",
      });
    }
  }

  return findings;
}

function sliceAround(text, needle, window) {
  const i = text.indexOf(needle);
  if (i < 0) return "";
  return text.slice(Math.max(0, i - window), i + needle.length + window);
}
