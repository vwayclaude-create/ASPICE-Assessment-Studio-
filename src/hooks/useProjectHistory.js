import { useEffect, useState } from "react";

const STORAGE_KEY = "aspice_project_history";
const MAX_ENTRIES = 30;
// Per-quote character cap when persisting to localStorage. Live-rendered
// verdicts keep full quotes; only the saved snapshot is trimmed so history
// fits in the ~5MB quota even with multi-process runs and long evidence.
const PERSIST_QUOTE_CHARS = 500;

const loadInitial = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch { /* empty */ }
  return [];
};

// Truncate evidence quotes and drop raw LLM payloads before persisting. Live
// in-memory verdict is untouched — slimming only applies to what we write to
// localStorage so history-list rendering and report drill-down still work.
const slimQuote = (q) =>
  typeof q === "string" && q.length > PERSIST_QUOTE_CHARS
    ? q.slice(0, PERSIST_QUOTE_CHARS) + "…(saved-trim)"
    : q;

const slimEvidenceArr = (arr) =>
  Array.isArray(arr)
    ? arr.map((e) => (e && typeof e === "object" ? { ...e, quote: slimQuote(e.quote) } : e))
    : arr;

const slimResultArr = (arr) =>
  Array.isArray(arr)
    ? arr.map((r) => {
        if (!r || typeof r !== "object") return r;
        const slim = { ...r, evidence: slimEvidenceArr(r.evidence) };
        delete slim.rawLlmResponse;
        return slim;
      })
    : arr;

const slimVerdictForStorage = (v) => {
  if (!v || typeof v !== "object") return v;
  const slim = { ...v };
  if (Array.isArray(v.processes)) {
    slim.processes = v.processes.map((p) => ({
      ...p,
      bps: slimResultArr(p.bps),
      wps: slimResultArr(p.wps),
      pas: Array.isArray(p.pas)
        ? p.pas.map((pa) => ({ ...pa, gps: slimResultArr(pa.gps) }))
        : p.pas,
    }));
  }
  return slim;
};

const slimEntryForStorage = (entry) =>
  entry && entry.verdict ? { ...entry, verdict: slimVerdictForStorage(entry.verdict) } : entry;

const isQuotaError = (err) =>
  err && (err.name === "QuotaExceededError" ||
          err.code === 22 || err.code === 1014 ||
          /quota/i.test(err.message || ""));

// Persist entries to localStorage with a quota-aware retry: slim every entry,
// then on quota failure drop the oldest one and try again until it fits or
// the list is empty. Returns { ok, persistedCount } so callers can surface a
// warning when entries get evicted.
const persistHistory = (entries) => {
  let working = entries.map(slimEntryForStorage);
  while (working.length > 0) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(working));
      return { ok: true, persistedCount: working.length };
    } catch (err) {
      if (!isQuotaError(err)) {
        console.warn("[aspice/projectHistory] save failed:", err);
        return { ok: false, persistedCount: 0 };
      }
      // Drop the oldest entry (entries are newest-first) and retry.
      working = working.slice(0, -1);
    }
  }
  // Even one entry was too large to fit — clear storage so we don't keep an
  // outdated snapshot, and warn so the user knows why nothing landed.
  try { localStorage.removeItem(STORAGE_KEY); } catch { /* empty */ }
  console.warn(
    "[aspice/projectHistory] entry exceeds localStorage quota even after slimming — not persisted. " +
    "Reduce processes, files, or evidence quote length."
  );
  return { ok: false, persistedCount: 0 };
};

export const useProjectHistory = () => {
  const [history, setHistory] = useState(loadInitial);

  useEffect(() => {
    persistHistory(history);
  }, [history]);

  const addEntry = (entry) => {
    setHistory((prev) => [entry, ...prev].slice(0, MAX_ENTRIES));
  };

  const removeEntry = (id) => {
    setHistory((prev) => prev.filter((x) => x.id !== id));
  };

  const clearAll = () => setHistory([]);

  return { history, addEntry, removeEntry, clearAll };
};

export const buildProjectHistoryEntry = ({
  verdict,
  artifacts,
  processIds,
  targetLevel,
  engine,
  isSample = false,
}) => ({
  id: `p_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
  date: new Date().toISOString(),
  artifactNames: (artifacts || []).map((a) => a.name),
  artifactCount: artifacts?.length ?? 0,
  processIds: [...(processIds || [])],
  targetLevel,
  engine,
  verdict,
  isSample,
});
