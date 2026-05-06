// Walks every BP evidence item in the verdict (per-process or project shape)
// and tags each with the source-page number when locatable. Looks the quote
// up in the artifact's cleaned text and matches the offset against the
// pages array we built during extraction.

export function annotateEvidenceWithPages(verdict, artifacts) {
  const byName = new Map(artifacts.map((a) => [a.name, a]));
  const annotateBp = (b) => ({
    ...b,
    evidence: (b.evidence || []).map((ev) => {
      if (ev.page != null) return ev;
      const a = byName.get(ev.artifactName);
      const page = findPage(a?.pages, a?.text, ev.quote);
      return page != null ? { ...ev, page } : ev;
    }),
  });
  if (Array.isArray(verdict.bps)) {
    verdict.bps = verdict.bps.map(annotateBp);
  }
  if (Array.isArray(verdict.processes)) {
    verdict.processes = verdict.processes.map((p) => ({
      ...p,
      bps: Array.isArray(p.bps) ? p.bps.map(annotateBp) : p.bps,
    }));
  }
}

function findPage(pages, text, quote) {
  if (!pages?.length || !text || !quote) return null;
  const needle = String(quote).trim();
  if (!needle) return null;
  const probes = [needle];
  if (needle.length > 40) probes.push(needle.slice(0, 40));
  const lcText = text.toLowerCase();
  for (const probe of probes) {
    let idx = text.indexOf(probe);
    if (idx < 0) idx = lcText.indexOf(probe.toLowerCase());
    if (idx >= 0) {
      for (const p of pages) {
        if (idx >= p.start && idx < p.end) return p.page;
      }
    }
  }
  return null;
}
