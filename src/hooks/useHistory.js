import { useEffect, useState } from "react";

const STORAGE_KEY = "aspice_history";
const MAX_ENTRIES = 50;

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

export const useHistory = () => {
  const [history, setHistory] = useState(loadInitial);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch { /* empty */ }
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
