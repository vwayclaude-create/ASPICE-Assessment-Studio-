# aspice-harness

Spec-driven **Automotive SPICE v4.0** assessment harness (CL1~CL3) with
cross-process consistency, traceability, and change-propagation verification.

판정 기준은 두 원본 표준 문서(`Automotive-SPICE-PAM-v40.md`,
`ASPICE Guideline_20240312.md`)에서 직접 파싱한 canonical JSON
(`spec/canonical/`)만을 사용합니다 — 하드코딩된 키워드나 휴리스틱이 아닙니다.

```
spec/
├── extractor.js              # PAM + Guideline → canonical JSON
├── processGraph.seed.json    # 수작업 curated V-model edges (inputWorkProducts 근거)
└── canonical/                # 자동 생성
    ├── processes/            # 32개 프로세스 (ACQ/SPL/SYS/SWE/MLE/HWE/VAL/SUP/MAN/PIM/REU)
    ├── processAttributes.json# PA 1.1 ~ 3.2 + Generic Practices
    ├── workProducts.json     # WP 카탈로그 (01-xx..19-xx, v4.0 전체)
    ├── ratingScale.json      # N/P-/P+/L-/L+/F + CL 집계 규칙
    ├── processGraph.json     # seed → canonical으로 복사된 edge 그래프
    └── guidelineRules.json   # Guideline per-process 참조

src/
├── harness.js                # 런타임 파이프라인 (evaluateProcess / evaluateProject)
├── model/                    # 타입 (JSDoc @typedef)
├── evaluators/               # BP / WP / PA / CL 평가기 + rule/llm/hybrid scorer + citation guard
├── crossProcess/             # traceGraph · traceability · consistency · coverage · changePropagation
├── llm/                      # Anthropic / OpenAI adapters + PAM-인용 강제 프롬프트
└── io/                       # 파일 reader · WPID 인덱서 · 리포터 · excerpt builder

legacy/                       # v0.1.0 (참고용, deprecated)
test/fixtures/project/        # 7-file BMS-Lite 프로젝트 fixture
```

## Rating Scale (6-point extended)

PAM §3.2.2의 ISO/IEC 33020 4-point scale을 intacs 관례에 따라 6단계로 분할한
확장 스케일. BP·GP·PA는 6단계로 표시하고, **CL 집계 시에만** 4단계로 축소하여
표준 규칙을 적용합니다.

| Rating | Range   | BP/GP/PA 표시 | CL 집계 |
|:------:|:-------:|:-------------:|:-------:|
| N      | 0–15%   | N             | N       |
| P-     | 16–32%  | P-            | P       |
| P+     | 33–50%  | P+            | P       |
| L-     | 51–67%  | L-            | L       |
| L+     | 68–85%  | L+            | L       |
| F      | 86–100% | F             | F       |

CL 규칙 (PAM §3.2.2 준용):
- **CL1** = PA 1.1 Fully
- **CL2** = PA 1.1 Fully + PA 2.1/2.2 Largely 이상
- **CL3** = PA 1.1/2.1/2.2 Fully + PA 3.1/3.2 Largely 이상

## Pipeline

```
artifacts → indexArtifacts ──────────────────────┐
                                                  │
                         ┌── evaluateBPs      ────┤
                         ├── evaluateWPs      ────┤
                 ruleScorer / llmScorer /         │
                 hybridScorer                     │
                         ├── evaluatePAs      ────┼─► computeCapabilityLevel
                         │                        │
  crossProcess/ ◄────────┤                        │
    ├─ traceGraph (V-model seed)                  │
    ├─ traceability (bidirectional, per edge)     ▼
    ├─ consistency (ID status drift, 13-51)  ProcessVerdict[]
    ├─ changePropagation (SUP.10 CR → impact)     ↓
    └─ coverage (req 17-* → test 08-6x/15-52)   ProjectVerdict ──► renderReport (md/json)
```

## Scorer 엔진

| 엔진 | 외부 호출 | 장점 | 단점 |
|------|-----------|------|------|
| `rule`   | 없음 | 결정론적, 빠름, 무료 | 정성 평가 없음, keyword overlap 기반 |
| `llm`    | Anthropic or OpenAI (per BP/WP/GP) | PAM 인용 강제, 정성 근거·부족점 서술 | 호출당 비용·지연 |
| `hybrid` | Anthropic/OpenAI | rule:0.4 + llm:0.6 가중 융합 + 양방향 abstention | 둘 다 필요 |

**인용 강제**: `src/evaluators/citationGuard.js`가 LLM 응답의 `pamCitation`을
`PAM §X.Y.Z` 정규식으로 검증. 인용 누락 시 응답 거부 → hybrid에선 rule score 사용.

**Prompt 캐싱**: Anthropic 어댑터는 `system` + `context`(프로세스 스펙 + 증적
발췌) 블록에 `cache_control: ephemeral`을 적용 → 같은 프로세스의 각 BP/GP 호출
사이에 prefix가 재사용됩니다.

## Cross-process 검증

- **traceGraph**: `spec/processGraph.seed.json`의 V-model edges를 canonical
  JSON으로 복사해 사용. 각 edge는 구체 WP ID를 지정.
- **traceability**: edge별로 source WP(예: 17-00)가 담고 있는 내부 ID
  (REQ-SYS-001)가 target 프로세스의 output 산출물에 인용되었는지 검증.
  Coverage%, orphan source/target 보고.
- **consistency**: 같은 ID가 여러 산출물에 등장할 때 상태 (`draft`/`review`/
  `approved`/`released`/`obsolete`)가 어긋나면 `status-drift` 경고.
- **coverage**: 17-* 요구사항 ID가 08-6x·15-52 산출물에 인용되는 비율.
- **changePropagation**: 13-16 산출물의 CR ID (`CR-042` 등)가 downstream
  설계·코드·테스트에 전파되었는지 추적. `propagated` / `verification-only` /
  `unresolved` 상태로 분류.

## 설치 및 사용

```bash
npm install
cp .env.example .env                 # (선택) API key 설정
npm run extract                      # PAM + Guideline + seed → canonical JSON
npm test                             # 스모크 테스트 (45 tests)
```

### CLI

```bash
# 프로세스 목록
node src/cli.js list

# 단일 프로세스 평가 (오프라인 rule scorer)
node src/cli.js evaluate -p SYS.2 -l 1 -e rule ./evidence/*.md

# 복수 프로세스 (콤마 구분, 자동으로 프로젝트 리포트)
node src/cli.js evaluate -p "SYS.1,SYS.2,SYS.3,SWE.1,SYS.5,SUP.10" -l 2 -e hybrid ./project/*

# 전체 프로세스 + hybrid
node src/cli.js evaluate -p all -l 1 -e hybrid -f markdown -o report.md ./project/*
```

### 프로젝트 리포트 예 (BMS-Lite fixture)

```
## Capability Summary
| Process | CL | PA 1.1 |
|---|:-:|:-:|
| SYS.2 | 0 | P+ |
| SYS.3 | 0 | L- |
| ...

### Traceability Matrix
| From → To | WP | Src IDs | Tgt IDs | Coverage | Orphans |
|---|---|:-:|:-:|:-:|:-:|
| SYS.1 → SYS.2 | 17-00 | 19 | 19 | 100% | 0 / 0 |
| SYS.2 → SYS.3 | 17-00 | 19 | 18 |  95% | 1 / 0 |
| SYS.3 → SYS.5 | 04-06 | 18 | 12 |  61% | 7 / 0 |

### Change Propagation (SUP.10)
- CR-042 [propagated] — touched 3 artifacts
```

## 개발 로드맵

| Phase | 상태 | 내용 |
|-------|------|------|
| 1 — 기반              | ✅ | 디렉토리 스켈레톤, 6-point rating scale, 32 canonical 프로세스 JSON, 스모크 테스트 |
| 2 — 평가기            | ✅ | rule/llm/hybrid scorer, LLM 인용 강제 post-check, Anthropic/OpenAI adapter (caching), CLI engine |
| 3 — Cross-process     | ✅ | V-model seed graph, per-edge traceability, consistency findings, 요구사항→테스트 coverage, SUP.10 CR 전파 분석, 프로젝트 리포트 |
| 4 — 고도화 (미정)      | — | Guideline rule 추출 강화, 증적 자동 인덱싱 개선, UI(`aspice-app`) 통합, 배치/캐시 최적화 |

## 라이선스

MIT
