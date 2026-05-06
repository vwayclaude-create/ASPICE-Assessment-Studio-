import { Play } from "lucide-react";
import { T, FONTS } from "../theme";
import { getFormatByName } from "../data/formats";

const LabelRow = ({ label, children }) => (
  <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
    <div style={{
      fontFamily: FONTS.mono,
      fontSize: 10,
      color: T.textLo,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      minWidth: 80,
      paddingTop: 2,
    }}>{label}</div>
    <div>{children}</div>
  </div>
);

export const ConfirmModal = ({ proc, fileName, fileSize, onCancel, onConfirm }) => (
  <div
    onClick={onCancel}
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 9999,
      background: T.overlay,
      backdropFilter: "blur(4px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
    }}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        background: T.surface,
        border: `1px solid ${T.borderM}`,
        borderRadius: 8,
        padding: "36px 40px",
        maxWidth: 520,
        width: "100%",
        animation: "fadeIn 0.18s ease",
        boxShadow: T.shadowLg,
      }}
    >
      <div style={{
        fontFamily: FONTS.mono,
        fontSize: 16,
        letterSpacing: "0.2em",
        color: T.accent,
        textTransform: "uppercase",
        fontWeight: 700,
        marginBottom: 20,
      }}>
        ⚡ Run Assessment — 분석 확인
      </div>

      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 16, color: T.textMd, lineHeight: 1.6, marginBottom: 20 }}>
          아래 내용으로 <span style={{ color: T.textHi, fontWeight: 600 }}>NPLF 평가</span>를 실행하시겠습니까?
        </div>

        <div style={{
          background: T.surface2,
          border: `1px solid ${T.borderL}`,
          borderRadius: 5,
          padding: "16px 20px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}>
          <LabelRow label="Target">
            <span style={{
              fontFamily: FONTS.mono,
              fontSize: 13,
              fontWeight: 700,
              color: T.accent,
              marginRight: 10,
            }}>{proc.id}</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: T.textHi }}>{proc.name}</span>
          </LabelRow>
          <LabelRow label="Document">
            <div style={{ fontSize: 13, color: T.textHi, fontWeight: 500, wordBreak: "break-all" }}>{fileName}</div>
            <div style={{
              fontFamily: FONTS.mono,
              fontSize: 10,
              color: T.textLo,
              marginTop: 4,
            }}>{(fileSize/1024).toFixed(1)} KB · {getFormatByName(fileName)?.label || "FILE"}</div>
          </LabelRow>
          <LabelRow label="Base Practices">
            <div style={{ fontSize: 14, fontWeight: 700, color: T.textHi }}>{proc.bps.length} BPs</div>
          </LabelRow>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        <button
          onClick={onCancel}
          style={{
            background: "transparent",
            color: T.textMd,
            border: `1px solid ${T.borderM}`,
            padding: "11px 26px",
            fontFamily: FONTS.mono,
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            cursor: "pointer",
            borderRadius: 4,
            fontWeight: 600,
          }}
        >
          취소
        </button>
        <button
          onClick={onConfirm}
          style={{
            background: T.accent,
            color: T.onAccent,
            border: "none",
            padding: "11px 32px",
            fontFamily: FONTS.mono,
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            cursor: "pointer",
            borderRadius: 4,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Play size={13} /> 분석 시작
        </button>
      </div>
    </div>
  </div>
);
