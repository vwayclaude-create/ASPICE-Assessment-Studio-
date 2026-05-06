// Light theme tokens — optimized for clear legibility on a bright surface.
export const T = {
  bg:         "#F4F6FA",
  bgGrad:     "radial-gradient(ellipse at top, #FFFFFF 0%, #F1F4F9 55%, #E6EAF2 100%)",
  surface:    "#FFFFFF",
  surface2:   "#F5F7FB",
  surface3:   "#E9EDF4",
  borderL:    "#E3E6EC",
  borderM:    "#CED2DA",
  borderH:    "#B4B9C4",
  textHi:     "#0F172A",
  textMd:     "#334155",
  textLo:     "#64748B",
  textDim:    "#94A3B8",
  accent:     "#2563EB",
  accentSoft: "#DBEAFE",
  warm:       "#D97706",
  ok:         "#059669",
  err:        "#DC2626",
  onAccent:   "#FFFFFF",
  overlay:    "rgba(15, 23, 42, 0.45)",
  shadowLg:   "0 18px 50px rgba(15, 23, 42, 0.15)",
  shadowMd:   "0 10px 28px rgba(15, 23, 42, 0.10)",
};

export const FONTS = {
  sans: "'Inter', system-ui, -apple-system, sans-serif",
  mono: "'JetBrains Mono', monospace",
};

export const FONT_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
`;

// 섹션 카드 공통 스타일 (§ 01·ProcessCard, § 02·ImportCard, § 04·HistoryCard 등에서 사용)
export const SECTION_CONTAINER_STYLE = {
  background: T.surface,
  border: `1px solid ${T.borderL}`,
  borderRadius: 8,
  padding: "32px 36px",
  marginBottom: 26,
  position: "relative",
  boxShadow: T.shadowMd,
};
