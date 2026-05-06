import { T, FONTS } from "../theme";

export const Stat = ({ icon, label, value }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <span style={{ color: T.accent }}>{icon}</span>
    <span style={{
      fontFamily: FONTS.mono,
      fontSize: 10,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: T.textLo,
      fontWeight: 500,
    }}>{label}:</span>
    <span style={{
      fontFamily: FONTS.sans,
      fontSize: 18,
      fontWeight: 700,
      color: T.textHi,
      letterSpacing: "-0.02em",
    }}>{value}</span>
  </div>
);
