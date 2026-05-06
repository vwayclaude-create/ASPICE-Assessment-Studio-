import { HelpCircle } from "lucide-react";
import { T, FONTS } from "../theme";

export const HelpButton = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label="도움말"
    style={{
      display: "flex",
      alignItems: "center",
      gap: 8,
      background: T.surface2,
      border: `1px solid ${T.borderL}`,
      borderRadius: 6,
      padding: "9px 14px",
      cursor: "pointer",
      color: T.textHi,
      fontFamily: FONTS.mono,
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      height: 46,
    }}
    onMouseEnter={(e) => { e.currentTarget.style.borderColor = T.borderH; }}
    onMouseLeave={(e) => { e.currentTarget.style.borderColor = T.borderL; }}
  >
    <HelpCircle size={14} color={T.accent} />
    Help
  </button>
);
