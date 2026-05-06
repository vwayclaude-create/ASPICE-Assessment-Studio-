// Rating scale boundaries follow the harness canonical
// `ratingScale.json` (intacs extended 6-point scale, §3.2.2 of PAM v4.0).
// BP / GP / PA render on 6 levels; CL aggregation collapses to 4.

import { ratingScale as HARNESS_SCALE } from "aspice-harness/spec/all";

const byCode = Object.fromEntries(HARNESS_SCALE.levels.map((l) => [l.code, l]));

// Light-theme pill palette: soft pastel bg + saturated text for clear legibility.
const VISUAL = {
  F:    { bg: "#D1FAE5", fg: "#047857", bar: "#10B981", pct: 95 },
  "L+": { bg: "#ECFCCB", fg: "#4D7C0F", bar: "#84CC16", pct: 77 },
  "L-": { bg: "#ECFCCB", fg: "#4D7C0F", bar: "#65A30D", pct: 59 },
  L:    { bg: "#ECFCCB", fg: "#4D7C0F", bar: "#84CC16", pct: 68 },
  "P+": { bg: "#FEF3C7", fg: "#B45309", bar: "#F59E0B", pct: 42 },
  "P-": { bg: "#FFEDD5", fg: "#C2410C", bar: "#F97316", pct: 24 },
  P:    { bg: "#FFEDD5", fg: "#C2410C", bar: "#F97316", pct: 33 },
  N:    { bg: "#FEE2E2", fg: "#B91C1C", bar: "#EF4444", pct: 8  },
};

const KOR_LABEL = {
  F:    "완전 달성",
  "L+": "거의 완전",
  "L-": "대부분 달성",
  L:    "대부분 달성",
  "P+": "절반 이상",
  "P-": "부분 달성",
  P:    "부분 달성",
  N:    "미달성",
};

function rangeFor(code) {
  const lv = byCode[code];
  if (lv) return `${lv.min}-${lv.max}%`;
  // Collapsed codes (L, P) are a union of two half-ranges.
  if (code === "L") return `${byCode["L-"].min}-${byCode["L+"].max}%`;
  if (code === "P") return `${byCode["P-"].min}-${byCode["P+"].max}%`;
  return "";
}

const build = (code, label) => ({
  label,
  kor: KOR_LABEL[code],
  range: rangeFor(code),
  ...VISUAL[code],
});

export const RATING_META = {
  F:    build("F",  "Fully"),
  "L+": build("L+", "Largely+"),
  "L-": build("L-", "Largely-"),
  L:    build("L",  "Largely"),
  "P+": build("P+", "Partially+"),
  "P-": build("P-", "Partially-"),
  P:    build("P",  "Partially"),
  N:    build("N",  "Not"),
};

export const RATING_ORDER = ["F", "L+", "L-", "P+", "P-", "N"];

// CL1 threshold per PAM §3.2.2 (collapsed L or F).
export const CL1_PASS_RATINGS = ["F", "L", "L+", "L-"];

export const isCl1Pass = (ratings) =>
  ratings.every((r) => CL1_PASS_RATINGS.includes(r.rating));

export const countRatings = (ratings) =>
  ratings.reduce((acc, r) => {
    acc[r.rating] = (acc[r.rating] || 0) + 1;
    return acc;
  }, {});
