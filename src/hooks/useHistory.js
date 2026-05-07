import { useEffect, useState } from "react";

const STORAGE_KEY = "aspice_history";
const MAX_ENTRIES = 50;
// Per-quote character cap when persisting. Live state keeps full quotes;
// only the saved snapshot is trimmed so history fits in the ~5MB quota even
// when many BPs carry long evidence passages.
const PERSIST_QUOTE_CHARS = 500;

// 히스토리를 localStorage에 동기적으로 초기화해두면 저장 useEffect가 첫 렌더에서 빈 배열로
// 덮어쓰는 레이스를 막을 수 있다.
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

const slimQuote = (q) =>
  typeof q === "string" && q.length > PERSIST_QUOTE_CHARS
    ? q.slice(0, PERSIST_QUOTE_CHARS) + "…(saved-trim)"
    : q;

const slimRatings = (ratings) =>
  Array.isArray(ratings)
    ? ratings.map((r) => {
        if (!r || typeof r !== "object") return r;
        const evidence = Array.isArray(r.evidence)
          ? r.evidence.map((e) =>
              e && typeof e === "object" ? { ...e, quote: slimQuote(e.quote) } : e
            )
          : r.evidence;
        return { ...r, evidence };
      })
    : ratings;

const slimEntryForStorage = (entry) => {
  if (!entry || !entry.results) return entry;
  return {
    ...entry,
    results: { ...entry.results, ratings: slimRatings(entry.results.ratings) },
  };
};

const isQuotaError = (err) =>
  err && (err.name === "QuotaExceededError" ||
          err.code === 22 || err.code === 1014 ||
          /quota/i.test(err.message || ""));

const persistHistory = (entries) => {
  let working = entries.map(slimEntryForStorage);
  while (working.length > 0) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(working));
      return;
    } catch (err) {
      if (!isQuotaError(err)) {
        console.warn("[aspice/history] save failed:", err);
        return;
      }
      working = working.slice(0, -1);
    }
  }
  try { localStorage.removeItem(STORAGE_KEY); } catch { /* empty */ }
  console.warn("[aspice/history] entry exceeds localStorage quota even after slimming — not persisted.");
};

export const useHistory = () => {
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

export const buildHistoryEntry = ({ proc, fileName, fileSize, results, isSample = false }) => ({
  id: `h_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
  date: new Date().toISOString(),
  processId: proc.id,
  processName: proc.name,
  fileName,
  fileSize,
  results,
  isSample,
});
