import { useStorageHistory } from "./useStorageHistory";

const STORAGE_KEY = "aspice_history";
const MAX_ENTRIES = 50;
// Per-quote character cap when persisting. Live state keeps full quotes;
// only the saved snapshot is trimmed so history fits in the ~5MB localStorage
// quota even when many BPs carry long evidence passages.
const PERSIST_QUOTE_CHARS = 500;

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

export const useHistory = () =>
  useStorageHistory({
    storageKey: STORAGE_KEY,
    maxEntries: MAX_ENTRIES,
    backend: "localStorage",
    slimEntry: slimEntryForStorage,
    logTag: "aspice/history",
  });

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
