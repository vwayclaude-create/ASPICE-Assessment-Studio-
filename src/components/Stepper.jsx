import { ChevronRight } from "lucide-react";
import { T, FONTS } from "../theme";

export const Stepper = ({ hasFile, analyzing, hasResults }) => {
  const steps = [
    { n: "01", label: "프로세스 선택",   active: true },
    { n: "02", label: "증적문서 업로드", active: hasFile },
    { n: "03", label: "분석 실행",       active: analyzing || hasResults },
    { n: "04", label: "NPLF 결과",       active: hasResults },
  ];

  return (
    <div style={{ display: "flex", gap: 24, alignItems: "center", marginBottom: 36, flexWrap: "wrap" }}>
      {steps.map((s, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{
            fontFamily: FONTS.mono,
            fontSize: 15.4,
            padding: "6px 13px",
            border: `1px solid ${s.active ? T.accent : T.borderM}`,
            color: s.active ? T.accent : T.textLo,
            background: s.active ? T.accentSoft : "transparent",
            fontWeight: 600,
            borderRadius: 3,
          }}>{s.n}</span>
          <span style={{
            fontSize: 18.2,
            fontWeight: 500,
            color: s.active ? T.textHi : T.textLo,
            letterSpacing: "-0.005em",
          }}>{s.label}</span>
          {i < steps.length - 1 && <ChevronRight size={20} style={{ color: T.textDim, marginLeft: 11 }} />}
        </div>
      ))}
    </div>
  );
};
