import { useEffect, useState } from "react";

const STORAGE_KEY = "aspice_project_history";
const MAX_ENTRIES = 30;

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

export const useProjectHistory = () => {
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
