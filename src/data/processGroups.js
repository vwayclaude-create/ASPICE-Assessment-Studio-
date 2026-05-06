// Category → process-id buckets for the sidebar. Populated dynamically from
// the harness canonical so v4.0 additions (MLE, PIM.3, SUP.11, HWE, REU.2)
// appear automatically.

import { PROCESS_IDS, ASPICE_DATA } from "./aspiceData";

const CATEGORY_META = {
  ACQ: { label: "Acquisition",          color: "#F472B6" },
  SPL: { label: "Supply",               color: "#FB7185" },
  SYS: { label: "System Engineering",   color: "#60A5FA" },
  SWE: { label: "Software Engineering", color: "#A78BFA" },
  MLE: { label: "ML Engineering",       color: "#C084FC" },
  HWE: { label: "Hardware Engineering", color: "#F59E0B" },
  VAL: { label: "Validation",           color: "#22D3EE" },
  SUP: { label: "Support",              color: "#FBBF24" },
  MAN: { label: "Management",           color: "#34D399" },
  PIM: { label: "Process Improvement",  color: "#A3E635" },
  REU: { label: "Reuse",                color: "#FCA5A5" },
};

const byCategory = new Map();
for (const id of PROCESS_IDS) {
  const cat = ASPICE_DATA[id]?.category ?? id.split(".")[0];
  const list = byCategory.get(cat) ?? [];
  list.push(id);
  byCategory.set(cat, list);
}

const CATEGORY_ORDER = ["ACQ", "SPL", "SYS", "SWE", "MLE", "HWE", "VAL", "SUP", "MAN", "PIM", "REU"];

export const PROCESS_GROUPS = CATEGORY_ORDER
  .filter((cat) => byCategory.has(cat))
  .map((cat) => ({
    label: CATEGORY_META[cat]?.label ?? cat,
    color: CATEGORY_META[cat]?.color ?? "#94A3B8",
    ids: byCategory.get(cat).sort((a, b) => {
      const an = Number(a.split(".")[1]);
      const bn = Number(b.split(".")[1]);
      return an - bn;
    }),
  }));
