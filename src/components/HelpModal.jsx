import { X, Upload, FolderTree, Play, FileText, History, Lightbulb, Layers, GitBranch, Target } from "lucide-react";
import { T, FONTS } from "../theme";

const SectionTitle = ({ children }) => (
  <div style={{
    fontFamily: FONTS.mono,
    fontSize: 10,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: T.accent,
    fontWeight: 700,
    marginBottom: 10,
  }}>{children}</div>
);

const Step = ({ n, Icon, title, children }) => (
  <div style={{
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    gap: 18,
    padding: "16px 0",
    borderBottom: `1px solid ${T.borderL}`,
  }}>
    <div style={{
      width: 42,
      height: 42,
      borderRadius: 6,
      background: T.accentSoft,
      border: `1px solid ${T.borderM}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: T.accent,
      position: "relative",
    }}>
      <Icon size={17} />
      <span style={{
        position: "absolute",
        top: -6,
        right: -6,
        width: 18,
        height: 18,
        borderRadius: "50%",
        background: T.accent,
        color: T.onAccent,
        fontFamily: FONTS.mono,
        fontSize: 10,
        fontWeight: 700,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>{n}</span>
    </div>
    <div>
      <div style={{ fontSize: 14, fontWeight: 600, color: T.textHi, marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 13, color: T.textMd, lineHeight: 1.7 }}>{children}</div>
    </div>
  </div>
);

const Grade = ({ code, label, range, color }) => (
  <div style={{
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "10px 14px",
    background: T.surface2,
    border: `1px solid ${T.borderL}`,
    borderRadius: 5,
  }}>
    <span style={{
      width: 32,
      height: 32,
      borderRadius: 4,
      background: color,
      color: T.onAccent,
      fontFamily: FONTS.mono,
      fontWeight: 800,
      fontSize: 14,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>{code}</span>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: T.textHi }}>{label}</div>
      <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: T.textLo, marginTop: 2 }}>{range}</div>
    </div>
  </div>
);

const Code = ({ children }) => (
  <code style={{
    fontFamily: FONTS.mono,
    color: T.accent,
    background: T.accentSoft,
    padding: "1px 5px",
    borderRadius: 3,
    fontSize: 11,
  }}>{children}</code>
);

export const HelpModal = ({ onClose }) => (
  <div
    onClick={onClose}
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
        borderRadius: 10,
        width: "100%",
        maxWidth: 760,
        maxHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        animation: "fadeIn 0.18s ease",
        boxShadow: T.shadowLg,
      }}
    >
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "22px 32px",
        borderBottom: `1px solid ${T.borderL}`,
      }}>
        <div>
          <div style={{
            fontFamily: FONTS.mono,
            fontSize: 10,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: T.accent,
            marginBottom: 6,
            fontWeight: 500,
          }}>User Guide · 사용 가이드</div>
          <div style={{
            fontFamily: FONTS.sans,
            fontSize: 20,
            fontWeight: 700,
            color: T.textHi,
            letterSpacing: "-0.02em",
          }}>
            Automotive <span style={{ fontWeight: 300, color: T.accent }}>SPICE</span> Assessment Studio
          </div>
        </div>
        <button
          onClick={onClose}
          aria-label="닫기"
          style={{
            background: "transparent",
            border: `1px solid ${T.borderM}`,
            color: T.textMd,
            width: 34,
            height: 34,
            borderRadius: 4,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <X size={16} />
        </button>
      </div>

      <div style={{ padding: "8px 32px 24px", overflowY: "auto" }}>
        <div style={{ padding: "16px 0 6px" }}>
          <SectionTitle>개요</SectionTitle>
          <div style={{ fontSize: 13, color: T.textMd, lineHeight: 1.75 }}>
            본 스튜디오는 <strong style={{ color: T.textHi }}>VDA Automotive SPICE® 4.0</strong> 기준에 따라 산출물을 자동 진단합니다.
            두 가지 평가 모드를 제공합니다 — <strong style={{ color: T.textHi }}>프로세스 모드</strong>(단일 프로세스 · 단일 문서)와
            <strong style={{ color: T.textHi }}> 프로젝트 모드</strong>(다중 프로세스 · 다중 산출물 · Cross-process 검증).
          </div>
        </div>

        {/* Per-process mode */}
        <div style={{ paddingTop: 18 }}>
          <SectionTitle>프로세스 모드 — 진행 단계</SectionTitle>

          <Step n={1} Icon={FolderTree} title="프로세스 선택">
            좌측 사이드바에서 평가할 ASPICE 프로세스(예: <Code>SYS.2</Code>, <Code>SWE.3</Code>)를 고릅니다.
            파일명에 프로세스 ID가 포함되어 있으면 업로드 시 자동 감지·선택됩니다.
            그룹 헤더(▸)를 클릭하면 접었다 펼칠 수 있습니다.
          </Step>

          <Step n={2} Icon={Upload} title="산출물 업로드">
            지원 형식: <strong style={{ color: T.textHi }}>PDF · DOC · DOCX · XLSX · MD</strong>, 최대 <strong style={{ color: T.textHi }}>30MB</strong>.
            실제 문서가 없으면 <strong style={{ color: T.textHi }}>"Sample Report"</strong>로 예시 결과를 먼저 볼 수 있습니다.
          </Step>

          <Step n={3} Icon={Play} title="분석 실행">
            <strong style={{ color: T.textHi }}>"Run Assessment"</strong>를 누르면 확인 창이 뜨고,
            각 BP별 <strong style={{ color: T.textHi }}>N·P·L·F</strong> 등급과 근거가 산출됩니다.
            문서 크기에 따라 수십 초가 걸릴 수 있습니다.
          </Step>

          <Step n={4} Icon={FileText} title="결과 확인 및 내보내기">
            BP별 판정·근거·개선 제안이 평가 리포트에 표시됩니다.
            <strong style={{ color: T.textHi }}>PDF</strong>·<strong style={{ color: T.textHi }}>TXT</strong>로 저장 가능합니다.
          </Step>

          <Step n={5} Icon={History} title="이력 관리">
            실행된 분석은 자동 저장됩니다. 이력 항목을 클릭하면 이전 결과를 다시 열어볼 수 있고, 개별/전체 삭제도 가능합니다.
          </Step>
        </div>

        {/* Project mode */}
        <div style={{ paddingTop: 24 }}>
          <SectionTitle>프로젝트 모드 — 다중 프로세스 평가</SectionTitle>

          <div style={{
            fontSize: 13,
            color: T.textMd,
            lineHeight: 1.75,
            background: T.accentSoft,
            border: `1px solid ${T.accent}33`,
            borderLeft: `3px solid ${T.accent}`,
            padding: "12px 16px",
            borderRadius: 5,
            marginBottom: 4,
          }}>
            <strong style={{ color: T.textHi }}>프로젝트 모드</strong>는 여러 산출물(요구사항·아키텍처·테스트·CR 등)을 한 번에 올려
            여러 프로세스를 동시에 평가하고, <strong style={{ color: T.textHi }}>프로세스 간 연결성</strong>까지 자동 점검합니다.
            CL1 개별 BP 평가를 넘어 프로젝트 전체의 일관성을 확인할 때 사용하세요.
          </div>

          <Step n={1} Icon={Upload} title="여러 산출물 업로드">
            상단 탭에서 <strong style={{ color: T.textHi }}>"프로젝트 모드"</strong>를 선택한 뒤,
            증적 파일을 <strong style={{ color: T.textHi }}>여러 개 한꺼번에</strong> 선택합니다.
            예) 이해관계자 요구사항, 시스템 요구사항, SW 요구사항, 아키텍처 설계, 테스트 케이스, 변경요청.
            파일마다 <Code>REQ-001</Code>, <Code>ARCH-SYS-002</Code>, <Code>TC-001</Code> 같은 ID가 포함돼 있으면 트레이스 매트릭스가 더 정확해집니다.
          </Step>

          <Step n={2} Icon={Layers} title="대상 프로세스 선택">
            기본 선택: <Code>SYS.1</Code> <Code>SYS.2</Code> <Code>SYS.3</Code> <Code>SWE.1</Code> <Code>SYS.5</Code> <Code>SUP.10</Code>.
            필요에 따라 <strong style={{ color: T.textHi }}>"전체"</strong>로 모두 선택하거나 프로세스별로 토글할 수 있습니다.
            선택한 각 프로세스에 대해 BP/WP/PA 평가가 수행됩니다.
          </Step>

          <Step n={3} Icon={Target} title="목표 Capability Level 및 Scorer 선택">
            <strong style={{ color: T.textHi }}>CL1</strong>은 기본 수행, <strong style={{ color: T.textHi }}>CL2</strong>는 관리, <strong style={{ color: T.textHi }}>CL3</strong>는 확립된 프로세스입니다.
            엔진은 <Code>Rule</Code>(오프라인 키워드/WPID 매칭 · 무료 · 빠름), <Code>LLM</Code>(OpenAI — BP/WP/GP별 호출),
            <Code>Hybrid</Code>(0.4 rule + 0.6 llm, 권장) 중 선택합니다.
            LLM/Hybrid는 서버에 <Code>OPENAI_API_KEY</Code>가 설정돼 있어야 합니다.
          </Step>

          <Step n={4} Icon={GitBranch} title="Cross-process 검증 결과">
            평가가 끝나면 다음 6가지 뷰가 리포트에 표시됩니다.
            <ul style={{ margin: "8px 0 0 18px", padding: 0, color: T.textMd, lineHeight: 1.8 }}>
              <li><strong style={{ color: T.textHi }}>Capability Summary</strong> — 프로세스별 CL과 PA 1.1/2.1/2.2/3.1/3.2 평가.</li>
              <li><strong style={{ color: T.textHi }}>Traceability Matrix</strong> — V-모델 seed 엣지 기반 상·하위 프로세스 간 ID 커버리지.</li>
              <li><strong style={{ color: T.textHi }}>Consistency Findings</strong> — 산출물 간 용어·ID·상태 불일치.</li>
              <li><strong style={{ color: T.textHi }}>Requirement → Test Coverage</strong> — 요구사항별 테스트 매핑 및 미커버 ID.</li>
              <li><strong style={{ color: T.textHi }}>Change Propagation (SUP.10)</strong> — CR이 요구사항·설계·테스트에 모두 반영됐는지.</li>
              <li><strong style={{ color: T.textHi }}>Process Graph</strong> — 노드/엣지 수와 엣지 소스(seed / heuristic).</li>
            </ul>
          </Step>

          <div style={{
            marginTop: 14,
            padding: "14px 18px",
            background: T.surface2,
            border: `1px solid ${T.borderL}`,
            borderRadius: 6,
            display: "flex",
            gap: 12,
          }}>
            <Lightbulb size={16} color={T.warm} style={{ flexShrink: 0, marginTop: 2 }} />
            <div style={{ fontSize: 12, color: T.textMd, lineHeight: 1.7 }}>
              <strong style={{ color: T.textHi }}>Tip.</strong> 파일명에 프로세스 카테고리를 넣으면(<Code>sys2_req.pdf</Code>, <Code>swe3_arch.docx</Code>) WP 후보 추론이 더 잘 됩니다.
              일부 PDF 파일이 손상되어 파싱에 실패해도, 나머지 산출물들로 평가가 계속 진행됩니다.
              실패한 파일 목록은 리포트 헤더 상단에 경고로 표시됩니다.
            </div>
          </div>
        </div>

        {/* NPLF grades */}
        <div style={{ paddingTop: 24 }}>
          <SectionTitle>NPLF 등급 (ISO/IEC 33020)</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 4 }}>
            <Grade code="N" label="Not achieved"        range="0 – 15%"   color={T.err}  />
            <Grade code="P" label="Partially achieved"  range="16 – 50%"  color={T.warm} />
            <Grade code="L" label="Largely achieved"    range="51 – 85%"  color={T.accent} />
            <Grade code="F" label="Fully achieved"      range="86 – 100%" color={T.ok}   />
          </div>
        </div>
      </div>

      <div style={{
        padding: "16px 32px",
        borderTop: `1px solid ${T.borderL}`,
        display: "flex",
        justifyContent: "flex-end",
      }}>
        <button
          onClick={onClose}
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
          }}
        >
          확인
        </button>
      </div>
    </div>
  </div>
);
