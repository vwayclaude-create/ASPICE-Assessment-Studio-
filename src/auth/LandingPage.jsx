import { ArrowRight, ShieldCheck, FileSearch, History } from "lucide-react";
import { T, FONTS } from "../theme";
import { ASPICE_DATA } from "../data/aspiceData";

const FEATURES = [
  {
    Icon: FileSearch,
    title: "PAM 4.0 기반 NPLF 평가",
    body: "PDF·DOCX·XLSX 산출물을 업로드하면 Base Practice 단위로 N·P·L·F 등급과 근거를 자동 도출합니다.",
  },
  {
    Icon: ShieldCheck,
    title: "VDA Guideline 해석 일관성",
    body: "VDA 4.0 가이드라인의 해석 기준을 적용해 평가자 간 편차를 줄이고, 결론의 재현성을 높입니다.",
  },
  {
    Icon: History,
    title: "분석 이력 보존",
    body: "프로세스·문서·등급 결과가 이력으로 누적되어, 산출물 개선 추이를 손쉽게 추적할 수 있습니다.",
  },
];

export function LandingPage({ onLogin, onSignup }) {
  return (
    <div style={{
      minHeight: "100vh",
      background: T.bgGrad,
      fontFamily: FONTS.sans,
      color: T.textHi,
      padding: "48px 24px 80px",
      letterSpacing: "-0.005em",
    }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <nav style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 72,
        }}>
          <div style={{
            fontFamily: FONTS.mono,
            fontSize: 25,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: T.accent,
            fontWeight: 600,
          }}>
            ASPICE Assessment Studio
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={onLogin} style={navButtonStyle()}>로그인</button>
            <button onClick={onSignup} style={navButtonStyle({ primary: true })}>회원가입</button>
          </div>
        </nav>

        <section style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
          gap: 64,
          alignItems: "center",
          marginBottom: 96,
        }}>
          <div>
            <div style={{
              fontFamily: FONTS.mono,
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: T.accent,
              marginBottom: 18,
              fontWeight: 500,
            }}>
              VDA · Automotive SPICE® 4.0 · CL1 Diagnostic Workbench
            </div>
            <h1 style={{
              fontFamily: FONTS.sans,
              fontWeight: 700,
              fontSize: "clamp(40px, 5vw, 56px)",
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
              margin: 0,
              color: T.textHi,
            }}>
              Automotive <span style={{ fontWeight: 300, color: T.accent }}>SPICE</span><br/>
              <span style={{ fontWeight: 300, color: T.textMd }}>Assessment, 자동화하다</span>
            </h1>
            <p style={{
              fontSize: 15,
              color: T.textMd,
              maxWidth: 520,
              marginTop: 24,
              lineHeight: 1.7,
            }}>
              산출물 한 건만 올리면 PAM Base Practice 별 N·P·L·F 등급과 그 근거를 받아볼 수 있습니다.
              회원으로 가입하면 분석 이력이 안전하게 보존되고, 평가 기준과 결과를 팀과 공유할 수 있습니다.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
              <button onClick={onSignup} style={ctaButtonStyle({ primary: true })}>
                무료로 시작하기 <ArrowRight size={14} />
              </button>
              <button onClick={onLogin} style={ctaButtonStyle()}>
                기존 계정으로 로그인
              </button>
            </div>
          </div>

          <div style={{
            background: T.surface,
            border: `1px solid ${T.borderL}`,
            borderRadius: 8,
            padding: "28px 30px",
            boxShadow: T.shadowLg,
          }}>
            <div style={{
              fontFamily: FONTS.mono,
              fontSize: 10,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: T.textLo,
              marginBottom: 16,
            }}>
              Loaded Process Reference
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: 8,
            }}>
              {Object.keys(ASPICE_DATA).slice(0, 12).map((id) => (
                <div key={id} style={{
                  background: T.surface2,
                  border: `1px solid ${T.borderL}`,
                  borderRadius: 4,
                  padding: "10px 12px",
                  fontFamily: FONTS.mono,
                  fontSize: 11,
                  fontWeight: 700,
                  color: T.accent,
                  textAlign: "center",
                }}>
                  {id}
                </div>
              ))}
            </div>
            <div style={{
              marginTop: 20,
              paddingTop: 18,
              borderTop: `1px solid ${T.borderL}`,
              fontFamily: FONTS.mono,
              fontSize: 10,
              color: T.textLo,
              lineHeight: 1.85,
            }}>
              <div>REF · PAM v4.0 (2023-11-29)</div>
              <div>REF · Guidelines (2024-03-12)</div>
              <div>SCALE · ISO/IEC 33020 NPLF</div>
              <div style={{ color: T.accent, marginTop: 6 }}>
                ⬤ {Object.keys(ASPICE_DATA).length} PROCESSES LOADED
              </div>
            </div>
          </div>
        </section>

        <section>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 18,
          }}>
            {FEATURES.map((f) => {
              const { Icon, title, body } = f;
              return (
              <div key={title} style={{
                background: T.surface,
                border: `1px solid ${T.borderL}`,
                borderRadius: 6,
                padding: "26px 26px 28px",
              }}>
                <Icon size={22} color={T.accent} strokeWidth={1.5} />
                <div style={{
                  fontWeight: 700,
                  fontSize: 16,
                  color: T.textHi,
                  marginTop: 16,
                  marginBottom: 10,
                  letterSpacing: "-0.01em",
                }}>
                  {title}
                </div>
                <div style={{
                  fontSize: 13,
                  color: T.textMd,
                  lineHeight: 1.6,
                }}>
                  {body}
                </div>
              </div>
              );
            })}
          </div>
        </section>

        <footer style={{
          marginTop: 80,
          paddingTop: 28,
          borderTop: `1px solid ${T.borderL}`,
          fontFamily: FONTS.mono,
          fontSize: 10,
          color: T.textLo,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          textAlign: "center",
        }}>
          ASPICE Assessment Studio · for evaluation use
        </footer>
      </div>
    </div>
  );
}

function navButtonStyle({ primary = false } = {}) {
  return {
    background: primary ? T.accent : "transparent",
    color: primary ? T.onAccent : T.textHi,
    border: primary ? "none" : `1px solid ${T.borderM}`,
    padding: "9px 18px",
    fontFamily: FONTS.mono,
    fontSize: 11,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    cursor: "pointer",
    borderRadius: 4,
    fontWeight: 700,
  };
}

function ctaButtonStyle({ primary = false } = {}) {
  return {
    background: primary ? T.accent : "transparent",
    color: primary ? T.onAccent : T.textHi,
    border: primary ? "none" : `1px solid ${T.borderM}`,
    padding: "13px 24px",
    fontFamily: FONTS.mono,
    fontSize: 11,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    cursor: "pointer",
    borderRadius: 4,
    fontWeight: 700,
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
  };
}
