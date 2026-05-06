import { T, FONTS } from "../theme";

export const authPageStyle = {
  minHeight: "100vh",
  background: T.bgGrad,
  fontFamily: FONTS.sans,
  color: T.textHi,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "48px 24px",
  letterSpacing: "-0.005em",
};

export const authCardStyle = {
  background: T.surface,
  border: `1px solid ${T.borderL}`,
  borderRadius: 8,
  padding: "44px 44px 36px",
  width: "100%",
  maxWidth: 460,
  boxShadow: T.shadowLg,
};

export const authEyebrowStyle = {
  fontFamily: FONTS.mono,
  fontSize: 11,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: T.accent,
  fontWeight: 500,
  marginBottom: 14,
};

export const authTitleStyle = {
  fontFamily: FONTS.sans,
  fontWeight: 700,
  fontSize: 28,
  lineHeight: 1.2,
  letterSpacing: "-0.02em",
  margin: 0,
  color: T.textHi,
};

export const authSubtitleStyle = {
  fontSize: 13,
  color: T.textMd,
  marginTop: 8,
  lineHeight: 1.55,
};

export const labelStyle = {
  fontFamily: FONTS.mono,
  fontSize: 10,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: T.textLo,
  fontWeight: 600,
  display: "block",
  marginBottom: 8,
};

export const inputStyle = {
  width: "100%",
  background: T.surface2,
  border: `1px solid ${T.borderL}`,
  borderRadius: 4,
  padding: "12px 14px",
  fontSize: 14,
  fontFamily: FONTS.sans,
  color: T.textHi,
  outline: "none",
  transition: "border-color 0.15s",
  boxSizing: "border-box",
};

export const inputErrorStyle = {
  ...inputStyle,
  borderColor: T.err,
};

export const fieldErrorStyle = {
  fontFamily: FONTS.mono,
  fontSize: 10,
  letterSpacing: "0.06em",
  color: T.err,
  marginTop: 6,
};

export const fieldGroupStyle = {
  marginBottom: 18,
};

export const primaryButtonStyle = {
  width: "100%",
  background: T.accent,
  color: T.onAccent,
  border: "none",
  padding: "13px 24px",
  fontFamily: FONTS.mono,
  fontSize: 11,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  cursor: "pointer",
  borderRadius: 4,
  fontWeight: 700,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
};

export const ghostButtonStyle = {
  width: "100%",
  background: "transparent",
  color: T.textHi,
  border: `1px solid ${T.borderM}`,
  padding: "13px 24px",
  fontFamily: FONTS.mono,
  fontSize: 11,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  cursor: "pointer",
  borderRadius: 4,
  fontWeight: 600,
};

export const linkButtonStyle = {
  background: "transparent",
  border: "none",
  color: T.accent,
  cursor: "pointer",
  fontFamily: FONTS.sans,
  fontSize: 12,
  fontWeight: 600,
  padding: 0,
  textDecoration: "underline",
  textUnderlineOffset: 3,
};

export const footerNoteStyle = {
  marginTop: 22,
  textAlign: "center",
  fontSize: 12,
  color: T.textLo,
};

export const errorBannerStyle = {
  background: "rgba(239,68,68,0.08)",
  border: `1px solid rgba(239,68,68,0.4)`,
  color: T.err,
  padding: "10px 14px",
  borderRadius: 4,
  fontSize: 12,
  marginBottom: 18,
  fontFamily: FONTS.mono,
  letterSpacing: "0.04em",
};

export const infoBannerStyle = {
  background: "rgba(96,165,250,0.08)",
  border: `1px solid rgba(96,165,250,0.35)`,
  color: T.accent,
  padding: "12px 14px",
  borderRadius: 4,
  fontSize: 12,
  marginBottom: 18,
  fontFamily: FONTS.mono,
  letterSpacing: "0.04em",
  lineHeight: 1.6,
};
