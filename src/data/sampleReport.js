// 데모용 샘플 리포트 (API 호출 없이 UI 미리보기)
// SWE.2에 고정 — 5 BPs, 6-tier 등급 샘플(N/P-/P+/L-/L+/F)
export const SAMPLE_PROCESS_ID = "SWE.2";
export const SAMPLE_FILE_NAME = "sample_SWAD_v2.1.docx";
export const SAMPLE_FILE_SIZE = 1843200;

export const SAMPLE_RESULTS = {
  ratings: [
    {
      bp: "BP1",
      rating: "L+",
      rationale: "정적 아키텍처(컴포넌트/인터페이스) 명세가 문서화되어 있으나, 일부 외부 인터페이스 상세 정의 미흡.",
      evidence: [
        {
          quote: "10개 SW 컴포넌트의 책임·의존성을 도식화하고, 각 컴포넌트의 입력·출력 신호를 표로 정리.",
          location: "§3.1 Component Diagram, p.14",
        },
        {
          quote: "외부 인터페이스 14개 중 3개(IF-EXT-07, 09, 12)는 데이터 타입·범위·주기가 'TBD'로 표기됨.",
          location: "§3.3 Interface List — Table 3-2, pp.20-22",
        },
      ],
    },
    {
      bp: "BP2",
      rating: "L-",
      rationale: "시퀀스 다이어그램 등 동적 측면이 일부 작성되었으나, 소프트웨어 모드/상태 전환 행위 정의가 부분적.",
      evidence: [
        {
          quote: "정상 시동/정상 종료/저전압 진입 등 5개 시나리오 중 3개에 대해 시퀀스 다이어그램이 제공됨.",
          location: "§4 Sequence Diagrams, pp.27-33",
        },
        {
          quote: "Diagnostic Mode ↔ Operational Mode 간 상태 전환 조건이 본문에 서술되어 있으나 상태 전이도(state machine)는 누락.",
          location: "§4.2 SW Modes, p.35",
        },
      ],
    },
    {
      bp: "BP3",
      rating: "P+",
      rationale: "아키텍처 분석이 수행되었으나, Cybersecurity/Safety 관련 설계 결정 근거 문서화 미흡.",
      evidence: [
        {
          quote: "성능·메모리 사용량에 대한 정량 분석 결과(예: 최악 응답시간 12ms, RAM 사용 78%)가 정리되어 있음.",
          location: "§5.1 Performance Analysis, pp.41-43",
        },
        {
          quote: "Action Item 5건 중 2건(AI-03 보안 위협 모델링, AI-04 ASIL-B 결정 trace)이 'Open' 상태로 미결.",
          location: "SWAD Review MoM 2026-01-20, §3 Action Items",
        },
      ],
    },
    {
      bp: "BP4",
      rating: "F",
      rationale: "Teamer를 통해 SW 아키텍처와 SW 요구사항 간 양방향 추적성 완전 확립. 0 orphan.",
      evidence: [
        {
          quote: "SW 요구사항 142건 → 아키텍처 요소 추적 100%, 역방향(아키텍처 → 요구사항) 추적도 100%, orphan 0건.",
          location: "Teamer Traceability Matrix 2026-03-15, summary p.1",
        },
      ],
    },
    {
      bp: "BP5",
      rating: "L-",
      rationale: "합의된 아키텍처가 관련 이해관계자에게 배포되었으나, 일부 팀의 검토 수신 확인이 누락.",
      evidence: [
        {
          quote: "SWAD v2.1이 SharePoint에 게시되고 7개 팀에 알림 메일이 발송된 기록 확인.",
          location: "SharePoint 배포 이력 — Distribution Log 2026-02-08",
        },
        {
          quote: "수신 확인서(서명 PDF) 7건 중 6건만 제출, QA 팀 1건 누락.",
          location: "Distribution Log Annex A, p.2",
        },
      ],
    },
  ],
  summary: "BP3(아키텍처 분석) P+ 미달로 CL1 미충족. 설계 결정 근거 문서화 및 Safety 분석 보완 필요.",
  strengths: "Teamer 기반 완전한 양방향 추적성 확립(BP4 F), 정적 아키텍처 체계적 명세(BP1 L+)",
  gaps: "아키텍처 분석 근거 문서화 미흡(BP3 P+), 동적 행위 정의 불완전(BP2 L-), 이해관계자 검토 확인 누락(BP5 L-)",
};
