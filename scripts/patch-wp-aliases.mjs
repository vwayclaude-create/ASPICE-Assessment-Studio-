// One-shot helper: apply a patch of `aliases` arrays onto workProducts.json.
// Run with: node scripts/patch-wp-aliases.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const jsonPath = resolve(__dirname, "..", "packages", "harness", "spec", "canonical", "workProducts.json");

// 한국어 + 영문 약어 alias.
// 핵심 원칙:
//   - 단일 일반어 ("요구사항" 단독 등) 는 피한다 — substring 매칭이 너무 넓어진다.
//   - 가능하면 두 단어 이상 phrase 또는 명세서/계획서/보고서 같은 명확한 어미 포함.
//   - 영문 약어는 ASPICE/V-model 에서 통용되는 것만 (SRS, SyRS, SWAD, SWDD 등).
const PATCH = {
  // === Requirements family ===
  "17-00": [
    "요구사항 명세서", "요구사항 정의서", "요구사항 정의", "요구사항 문서",
    "system requirements specification", "software requirements specification",
    "syrs", "srs", "swrs",
  ],
  "17-05": ["산출물 요구사항", "work product requirement"],
  "17-54": [
    "요구사항 속성", "요구사항 특성", "요구사항 ID", "요구사항 식별자",
    "requirement attribute", "requirement attributes",
  ],
  "17-55": ["자원 필요사항", "리소스 필요사항", "resource needs"],
  "17-57": [
    "특별 특성", "특수 특성", "안전 특성", "안전 관련 특성",
    "special characteristic", "special characteristics", "safety characteristic",
  ],

  // === Architecture / Design family ===
  "04-04": [
    "소프트웨어 아키텍처", "sw 아키텍처", "소프트웨어 구조",
    "아키텍처 설계서", "아키텍처 설계", "swad", "software architectural design",
  ],
  "04-05": [
    "소프트웨어 상세설계", "sw 상세설계", "상세설계서", "상세 설계",
    "swdd", "software detailed design",
  ],
  "04-06": [
    "시스템 아키텍처", "시스템 구조", "syad",
    "system architectural design", "system architecture",
  ],
  "04-02": ["도메인 아키텍처", "domain architecture"],
  "04-51": ["ml 아키텍처", "머신러닝 아키텍처", "ml architecture"],
  "04-52": ["하드웨어 아키텍처", "hw 아키텍처", "hwad", "hardware architecture"],
  "04-53": ["하드웨어 상세설계", "hw 상세설계", "hwdd", "hardware detailed design"],
  "04-54": ["하드웨어 회로도", "hw 회로도", "hardware schematic"],
  "04-55": ["하드웨어 레이아웃", "hw 레이아웃", "hardware layout"],
  "04-56": ["하드웨어 인터페이스", "hw 인터페이스", "hardware element interface"],

  // === Components / Units / Integration ===
  "01-03": ["소프트웨어 컴포넌트", "sw 컴포넌트", "software component"],
  "01-50": ["통합 소프트웨어", "통합 sw", "integrated software"],
  "01-52": ["형상 항목 목록", "형상 식별 목록", "configuration item list"],
  "01-53": ["학습된 ml 모델", "trained ml model"],
  "01-54": ["하이퍼파라미터", "hyperparameter"],
  "11-05": ["소프트웨어 유닛", "sw 유닛", "software unit"],
  "11-06": ["통합 시스템", "integrated system"],

  // === Verification / Validation / Test ===
  "08-58": [
    "검증 케이스 선정", "검증 항목 선정", "검증 측정 선정",
    "verification measure selection", "verification measure selection set",
  ],
  "08-59": ["확인 측정", "확인 절차", "validation measure"],
  "08-60": [
    "검증 측정", "검증 절차", "검증 계획", "테스트 계획", "테스트 명세",
    "verification measure", "verification plan", "test plan", "test specification",
  ],
  "08-57": ["확인 측정 선정", "validation measure selection"],
  "03-50": ["검증 데이터", "테스트 데이터", "verification measure data"],
  "13-24": [
    "확인 결과", "validation result", "validation results",
  ],
  "13-25": [
    "검증 결과", "검증 데이터", "검증 로그", "테스트 결과", "테스트 로그",
    "verification result", "verification results", "verification data and logs",
  ],
  "15-52": ["검증 결과 보고서", "검증 보고서", "verification result report"],

  // === Consistency / Traceability evidence ===
  "13-51": [
    "일관성 증거", "일관성 점검", "일관성 평가", "추적성 매트릭스",
    "consistency evidence", "traceability matrix",
  ],
  "13-52": [
    "의사소통 증거", "커뮤니케이션 증거", "공지 메일", "배포 메일",
    "communication evidence",
  ],

  // === Project management ===
  "08-53": ["작업 범위", "scope of work"],
  "08-54": ["타당성 분석", "feasibility analysis"],
  "08-55": ["리스크 측정", "위험 측정", "risk measure"],
  "08-56": ["일정", "프로젝트 일정", "마스터 일정", "schedule"],
  "08-61": ["자원 할당", "리소스 할당", "resource allocation"],
  "08-62": ["커뮤니케이션 매트릭스", "의사소통 매트릭스", "communication matrix"],
  "13-06": ["인도 증거", "납품 증거", "delivery evidence"],
  "13-07": ["문제", "이슈", "결함", "problem report"],
  "13-08": ["베이스라인", "기준선", "baseline"],
  "13-09": ["회의록", "회의 자료", "meeting minute", "meeting support evidence"],
  "13-13": ["릴리스 승인", "출하 승인", "product release approval"],
  "13-14": ["진척 현황", "진척 보고", "progress status"],
  "13-16": ["변경 요청", "변경 요구서", "change request"],
  "13-18": ["품질 적합성 증거", "quality conformance evidence"],
  "13-19": ["리뷰 증거", "검토 증거", "리뷰 결과", "검토 결과", "review evidence"],
  "13-50": ["ml 테스트 결과", "ml test result"],
  "13-53": ["적격성 증거", "qualification evidence"],
  "15-06": ["프로젝트 현황", "project status"],
  "15-07": ["재사용 분석", "재사용 검토", "reuse analysis"],
  "15-09": ["리스크 현황", "위험 현황", "risk status"],
  "15-12": ["문제 현황", "이슈 현황", "problem status"],
  "15-13": ["평가 보고서", "심사 보고서", "assessment report", "audit report"],
  "15-16": ["개선 기회", "improvement opportunity"],
  "15-51": ["분석 결과", "analysis result", "analysis results"],
  "15-55": ["문제 분석 증거", "problem analysis evidence"],

  // === Release ===
  "11-03": ["릴리스 노트", "릴리즈 노트", "release note"],
  "11-04": ["제품 릴리스 패키지", "release package"],
  "11-50": ["배포된 ml 모델", "deployed ml model"],
  "18-06": ["릴리스 기준", "출하 기준", "product release criteria"],

  // === Quality / Process governance ===
  "18-07": ["품질 기준", "quality criteria"],
  "18-52": ["에스컬레이션 경로", "escalation path"],
  "18-53": ["형상 항목 선정 기준", "configuration item selection criteria"],
  "18-57": ["변경 분석 기준", "change analysis criteria"],
  "18-58": ["프로세스 성과 목표", "process performance objective"],
  "18-59": ["리뷰 승인 기준", "review and approval criteria"],

  // === ML domain (light coverage) ===
  "03-51": ["ml 데이터셋", "ml data set", "ml dataset"],
  "03-53": ["ml 데이터", "ml data"],
  "08-64": ["ml 테스트 접근", "ml test approach"],
  "08-65": ["ml 학습 검증 접근", "ml training and validation approach"],
  "19-50": ["ml 데이터 품질 접근", "ml data quality approach"],
};

const json = JSON.parse(readFileSync(jsonPath, "utf8"));
let touched = 0;
let skipped = 0;
for (const [id, aliases] of Object.entries(PATCH)) {
  if (!json[id]) {
    console.warn(`[patch] WP id not found in catalog: ${id}`);
    skipped++;
    continue;
  }
  json[id].aliases = aliases;
  touched++;
}
writeFileSync(jsonPath, JSON.stringify(json, null, 2) + "\n", "utf8");
console.log(`[patch] applied aliases to ${touched} WPs (skipped ${skipped}). file: ${jsonPath}`);
