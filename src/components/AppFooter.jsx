import { T, FONTS } from "../theme";

export const AppFooter = () => (
  <div style={{
    marginTop: 40,
    paddingTop: 24,
    borderTop: `1px solid ${T.borderL}`,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 14,
    fontFamily: FONTS.mono,
    fontSize: 9,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: T.textDim,
    fontWeight: 500,
  }}>
    <div>Automotive SPICE® VDA QMC · PAM v4.0 · Guidelines 2024-03-12</div>
    <div>⬤ F fully  ◆ L largely  ◇ P partially  ○ N not achieved</div>
  </div>
);
