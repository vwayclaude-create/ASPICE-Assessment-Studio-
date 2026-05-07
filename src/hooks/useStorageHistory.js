// 공통 history 훅. localStorage / IndexedDB 두 백엔드를 동일 API 로 다룬다.
// 사용 예:
//   useStorageHistory({ storageKey, backend: "idb", maxEntries, slimEntry })
//   useStorageHistory({ storageKey, backend: "localStorage", maxEntries, slimEntry })
//
// localStorage 백엔드는 quota-aware 재시도(가장 오래된 항목부터 떨어뜨리며 재시도)
// 후에도 한 entry 가 못 들어가면 기존 저장본을 그대로 보존한다 — 이전 cataclysmic
// wipe 버그를 재현하지 않는다.
//
// idb 백엔드는 src/utils/idb.js 의 비동기 어댑터를 쓴다. 마운트 직후 비동기 로드,
// loaded=true 가 된 뒤에야 변경분을 IDB 로 다시 쓴다. 첫 번째 IDB 로드 시
// 동일 키의 localStorage 값이 남아 있으면 한 번 옮겨오고 원본은 삭제한다.
import { useEffect, useRef, useState } from "react";
import { idbGet, idbSet, idbDel } from "../utils/idb";

const isQuotaError = (err) =>
  err && (err.name === "QuotaExceededError" ||
          err.code === 22 || err.code === 1014 ||
          /quota/i.test(err.message || ""));

const safeJsonParse = (raw) => {
  try { return JSON.parse(raw); } catch { return null; }
};

function loadInitialFromLocalStorage(storageKey) {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return [];
    const parsed = safeJsonParse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch { return []; }
}

async function loadInitialFromIdb(storageKey, logTag) {
  try {
    const v = await idbGet(storageKey);
    if (Array.isArray(v)) return v;
  } catch (err) {
    console.warn(`[${logTag}] IDB read failed:`, err);
  }
  // 첫 진입 시 동일 키의 localStorage 값을 한 번 옮겨오고 원본 삭제.
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return [];
    const parsed = safeJsonParse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      await idbSet(storageKey, parsed);
      localStorage.removeItem(storageKey);
      return parsed;
    }
    localStorage.removeItem(storageKey);
  } catch { /* empty */ }
  return [];
}

function persistToLocalStorage(storageKey, entries, slim, logTag) {
  if (entries.length === 0) {
    try { localStorage.removeItem(storageKey); } catch { /* empty */ }
    return;
  }
  let working = entries.map(slim);
  while (working.length > 0) {
    try {
      localStorage.setItem(storageKey, JSON.stringify(working));
      return;
    } catch (err) {
      if (!isQuotaError(err)) {
        console.warn(`[${logTag}] save failed:`, err);
        return;
      }
      working = working.slice(0, -1);
    }
  }
  console.warn(
    `[${logTag}] new entry exceeds localStorage quota even after slimming — not persisted. ` +
    "Previously saved history retained intact."
  );
}

async function persistToIdb(storageKey, entries, slim, logTag) {
  try {
    if (entries.length === 0) {
      await idbDel(storageKey);
      return;
    }
    await idbSet(storageKey, entries.map(slim));
  } catch (err) {
    console.warn(`[${logTag}] IDB save failed:`, err);
  }
}

/**
 * @param {{
 *   storageKey: string,
 *   maxEntries: number,
 *   backend?: "localStorage" | "idb",
 *   slimEntry?: (entry: any) => any,
 *   logTag?: string,
 * }} opts
 */
export function useStorageHistory(opts) {
  const {
    storageKey,
    maxEntries,
    backend = "localStorage",
    slimEntry,
    logTag = `aspice/${backend}History`,
  } = opts;

  const isAsync = backend === "idb";

  // slimEntry 는 호출자에서 전달되는 함수라 매 렌더마다 identity 가 바뀔 수 있다.
  // ref 에 담아두면 effect deps 에 넣지 않고도 최신 값을 쓸 수 있다.
  const slimEntryRef = useRef(slimEntry);
  useEffect(() => { slimEntryRef.current = slimEntry; }, [slimEntry]);

  const [history, setHistory] = useState(() =>
    isAsync ? [] : loadInitialFromLocalStorage(storageKey)
  );
  // localStorage 는 첫 렌더에 데이터를 동기적으로 들고 있어 항상 loaded.
  const [loaded, setLoaded] = useState(!isAsync);
  const cancelled = useRef(false);

  // IDB 비동기 초기 로드.
  useEffect(() => {
    if (!isAsync) return;
    cancelled.current = false;
    (async () => {
      const entries = await loadInitialFromIdb(storageKey, logTag);
      if (cancelled.current) return;
      setHistory(entries);
      setLoaded(true);
    })();
    return () => { cancelled.current = true; };
  }, [isAsync, storageKey, logTag]);

  // 변경 시 저장.
  useEffect(() => {
    if (!loaded) return;
    const slim = slimEntryRef.current ?? ((e) => e);
    if (isAsync) {
      persistToIdb(storageKey, history, slim, logTag);
    } else {
      persistToLocalStorage(storageKey, history, slim, logTag);
    }
  }, [history, loaded, isAsync, storageKey, logTag]);

  const addEntry = (entry) => {
    setHistory((prev) => [entry, ...prev].slice(0, maxEntries));
  };
  const removeEntry = (id) => {
    setHistory((prev) => prev.filter((x) => x.id !== id));
  };
  const clearAll = () => setHistory([]);

  return { history, addEntry, removeEntry, clearAll };
}
