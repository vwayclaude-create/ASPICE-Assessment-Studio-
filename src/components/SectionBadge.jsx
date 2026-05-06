import { T, FONTS } from "../theme";

// 각 섹션 왼쪽 상단의 코드 라벨 (§ 01 · SPEC, § 02 · IMPORT 등)
export const SectionBadge = ({ color = T.accent, children }) => (
  <div style={{
    position: "absolute",
    top: -11,
    left: 26,
    background: T.surface3,
    color,
    border: `1px solid ${T.borderM}`,
    padding: "4px 14px",
    fontFamily: FONTS.mono,
    fontSize: 11,
    letterSpacing: "0.15em",
    fontWeight: 600,
    borderRadius: 3,
  }}>{children}</div>
);
