import { useEffect, useRef, useState } from "react";
import { idbGet, idbSet, idbDel } from "../utils/idb";

// IndexedDB key (used inside the single "kv" object store created by utils/idb.js).
// Keep the same name as the legacy localStorage key so logical identity is preserved.
const STORAGE_KEY = "aspice_project_history";
const MAX_ENTRIES = 30;

// One-shot helper: drop debug payloads we never need to keep around.
// `rawLlmResponse` shows up only on rejected LLM calls and bloats entries.
const slimEntryForStorage = (entry) => {
  if (!entry || !entry.verdict || !Array.isArray(entry.verdict.processes)) return entry;
  const dropRaw = (results) =>
    Array.isArray(results)
      ? results.map((r) => {
          if (!r || typeof r !== "object" || !("rawLlmResponse" in r)) return r;
          const slim = { ...r };
          delete slim.rawLlmResponse;
          return slim;
        })
      : results;
  return {
    ...entry,
    verdict: {
      ...entry.verdict,
      processes: entry.verdict.processes.map((p) => ({
        ...p,
        bps: dropRaw(p.bps),
        wps: dropRaw(p.wps),
        pas: Array.isArray(p.pas)
          ? p.pas.map((pa) => ({ ...pa, gps: dropRaw(pa.gps) }))
          : p.pas,
      })),
    },
  };
};

// One-time migration: pull any old localStorage payload into IDB so users do
// not lose entries when the storage backend changes.
async function migrateLegacyLocalStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    await idbSet(STORAGE_KEY, parsed);
    localStorage.removeItem(STORAGE_KEY);
    return parsed;
  } catch {
    return null;
  }
}

export const useProjectHistory = () => {
  const [history, setHistory] = useState([]);
  // Defer persistence until the initial async load has finished — otherwise
  // the first render would write our empty state over whatever is in IDB.
  const [loaded, setLoaded] = useState(false);
  const cancelled = useRef(false);

  useEffect(() => {
    cancelled.current = false;
    (async () => {
      let entries = null;
      try {
        const v = await idbGet(STORAGE_KEY);
        if (Array.isArray(v)) entries = v;
      } catch (err) {
        console.warn("[aspice/projectHistory] IDB read failed:", err);
      }
      if (!entries) {
        entries = await migrateLegacyLocalStorage();
      }
      if (cancelled.current) return;
      setHistory(Array.isArray(entries) ? entries : []);
      setLoaded(true);
    })();
    return () => { cancelled.current = true; };
  }, []);

  useEffect(() => {
    if (!loaded) return;
    (async () => {
      try {
        if (history.length === 0) {
          await idbDel(STORAGE_KEY);
          return;
        }
        await idbSet(STORAGE_KEY, history.map(slimEntryForStorage));
      } catch (err) {
        console.warn("[aspice/projectHistory] IDB save failed:", err);
      }
    })();
  }, [history, loaded]);

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
