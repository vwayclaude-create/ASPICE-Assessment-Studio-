/**
 * Cross-process graph construction.
 *
 * Two sources of truth, in preference order:
 *   1. Canonical seed (`spec/canonical/processGraph.json`) — hand-curated
 *      V-model edges with the specific WP IDs that flow across. This is
 *      authoritative because PAM v4.0 does not publish input WP tables.
 *   2. Inferred edges — computed from input/output WP overlap. Produces
 *      the same result when the seed was used to populate per-process
 *      inputWorkProducts; kept as a fallback / sanity check.
 *
 * @param {import("../evaluators/types.js").ProcessSpec[]} processes
 * @param {{seedEdges?: Array<{from: string, to: string, wps: string[]}>}} [opts]
 */
export function buildProcessGraph(processes, opts = {}) {
  const nodes = processes.map((p) => ({
    id: p.id,
    category: p.category,
    name: p.name,
  }));
  const knownIds = new Set(processes.map((p) => p.id));

  if (opts.seedEdges?.length) {
    const edges = opts.seedEdges
      .filter((e) => knownIds.has(e.from) && knownIds.has(e.to))
      .map((e) => ({ from: e.from, to: e.to, via: [...new Set(e.wps ?? [])] }));
    return { nodes, edges, source: "seed" };
  }

  const byOutput = new Map();
  for (const p of processes) {
    for (const wp of p.outputWorkProducts ?? []) {
      const list = byOutput.get(wp.id) ?? [];
      list.push(p.id);
      byOutput.set(wp.id, list);
    }
  }
  const edges = [];
  for (const target of processes) {
    const viaByFrom = new Map();
    for (const wp of target.inputWorkProducts ?? []) {
      const producers = byOutput.get(wp.id) ?? [];
      for (const from of producers) {
        if (from === target.id) continue;
        const via = viaByFrom.get(from) ?? new Set();
        via.add(wp.id);
        viaByFrom.set(from, via);
      }
    }
    for (const [from, via] of viaByFrom) {
      edges.push({ from, to: target.id, via: [...via] });
    }
  }
  return { nodes, edges, source: "inferred" };
}
