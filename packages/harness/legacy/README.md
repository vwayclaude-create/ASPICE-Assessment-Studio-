# aspice-cl1-harness

산출물(Work Product) 기반 **ASPICE v4.0 Capability Level 1** 평가 하네스.
룰 기반 탐지와 LLM 분석을 결합한 하이브리드 엔진으로, 업로드된 문서(PDF/DOCX/XLSX/MD/TXT)에서
각 프로세스의 Base Practice(BP)와 Output Work Product(WP) 증적을 찾아 CL1 달성 여부를 판정합니다.

## 아키텍처 (Harness Structure)

```
src/
├── harness.js              # Core runtime: plugin loader + engine dispatch + verdict aggregation
├── index.js                # Public API surface
├── cli.js                  # CLI entry (aspice-cl1)
├── model/
│   ├── verdict.js          # PAM v4.0 rating scale (N/P/L/F), CL1 aggregator
│   ├── workProducts.js     # Common WP catalog (01-xx..19-xx)
│   └── artifact.js         # Artifact value object
├── engine/
│   ├── index.js            # createEngine('rule'|'llm'|'agent'|'hybrid'|'hybrid-agent')
│   ├── ruleEngine.js       # Offline keyword + filename matching
│   ├── llmEngine.js        # One-shot Claude evaluator (single message, JSON out)
│   ├── agentEngine.js      # Agentic Claude evaluator (tool-use loop)
│   └── hybridEngine.js     # Score fusion (rule ⊕ llm|agent)
├── agent/
│   ├── harnessAgent.js     # Provider-agnostic agent loop: inspect → search → score → submit
│   ├── tools.js            # Tool schemas + handlers (list/read/search/spec/rule/submit)
│   └── systemPrompt.js     # Assessor persona
├── llm/
│   ├── provider.js         # resolveProvider() + detection from key / env / client shape
│   ├── anthropic.js        # Anthropic SDK adapter
│   └── openai.js           # OpenAI SDK adapter (chat.completions + tool_calls)
├── processes/              # Plugin per ASPICE v4.0 process (grouped by category)
│   ├── acq.js  spl.js  sys.js  swe.js  hwe.js
│   ├── val.js  man.js  reu.js  sup.js
│   └── index.js            # Auto registry
└── io/
    ├── fileReader.js       # PDF/DOCX/XLSX/MD/TXT extractors
    └── reporter.js         # JSON / Markdown / text rendering
```

핵심 원칙: **하네스는 프로세스에 대해 중립**입니다. 모든 CL1 기준·BP·기대 산출물은 플러그인
(`src/processes/*.js`)에 선언되며, 새 프로세스를 추가하려면 `defineProcess(...)` 한 번 호출하고
레지스트리에 export 만 추가하면 됩니다.

## 지원 프로세스 (Full ASPICE v4.0)

| 카테고리 | 프로세스 |
|---|---|
| ACQ | ACQ.4 |
| SPL | SPL.1, SPL.2 |
| SYS | SYS.1, SYS.2, SYS.3, SYS.4, SYS.5 |
| SWE | SWE.1, SWE.2, SWE.3, SWE.4, SWE.5, SWE.6 |
| HWE | HWE.1, HWE.2, HWE.3, HWE.4 |
| VAL | VAL.1 |
| MAN | MAN.3, MAN.5, MAN.6 |
| REU | REU.2 |
| SUP | SUP.1, SUP.8, SUP.9, SUP.10 |

총 27개 프로세스.

## 설치

```bash
npm install
cp .env.example .env   # ANTHROPIC_API_KEY 또는 OPENAI_API_KEY 설정
```

## LLM Provider 선택 (Anthropic / OpenAI)

하네스는 두 프로바이더를 지원합니다. 자동 탐지 순서:

1. `llm.provider: "anthropic" | "openai"` 명시적 지정
2. 환경변수 `ASPICE_LLM_PROVIDER=anthropic|openai`
3. 주입된 client의 메서드 형태 (`messages.create` → Anthropic, `chat.completions.create` → OpenAI)
4. API key prefix (`sk-ant-` → Anthropic, `sk-` → OpenAI)
5. 환경변수 (`ANTHROPIC_API_KEY` 또는 `OPENAI_API_KEY`)

```js
// 명시적으로 OpenAI
const harness = new Harness({
  engine: "agent",
  llm: { provider: "openai", apiKey: process.env.OPENAI_API_KEY, model: "gpt-4o" },
});

// 명시적으로 Anthropic
const harness2 = new Harness({
  engine: "hybrid-agent",
  llm: { provider: "anthropic", apiKey: process.env.ANTHROPIC_API_KEY, model: "claude-opus-4-7" },
});

// 환경변수만 설정 — 자동 선택
const harness3 = new Harness({ engine: "agent" });
```

모델 기본값: Anthropic `claude-opus-4-7` / OpenAI `gpt-4o`. `ASPICE_LLM_MODEL` 환경변수 또는 `llm.model` 로 override 합니다. Anthropic tool schema → OpenAI function schema 변환은 프로바이더 내부에서 자동 처리됩니다.

## 사용법

### 라이브러리로

```js
import { Harness, loadArtifactsFromPaths, renderReport } from "aspice-cl1-harness";

const harness = new Harness({ engine: "hybrid" });
const artifacts = await loadArtifactsFromPaths([
  "./evidence/SWAD_v1.2.docx",
  "./evidence/SWE2_Traceability.xlsx",
]);

const report = await harness.evaluate({ processId: "SWE.2", artifacts });
console.log(renderReport(report, "markdown"));
console.log(`Rating: ${report.rating} — CL1 ${report.achieved ? "ACHIEVED" : "NOT ACHIEVED"}`);
```

### 전체 프로세스 일괄 평가

```js
const bundle = await harness.evaluateAll({ artifacts });
// { engine, processCount, achieved, reports: [...] }
```

### CLI

```bash
# 목록 확인
node src/cli.js list

# 단일 프로세스 평가 (하이브리드, 마크다운 출력)
node src/cli.js evaluate -p SWE.2 -e hybrid ./evidence/*.docx

# 룰 엔진만 (오프라인, 빠름)
node src/cli.js evaluate -p SYS.2 -e rule ./evidence/*.pdf

# 전체 프로세스 일괄 평가 → 파일 저장
node src/cli.js evaluate -p all -e hybrid -f markdown -o report.md ./evidence/*
```

## 엔진 설명

| 엔진 | 외부 호출 | 장점 | 단점 |
|---|---|---|---|
| `rule` | 없음 | 결정론적, 빠름, 무료 | 정성 평가 불가 |
| `llm` | Anthropic API (1회) | BP별 근거/부족점 서술 가능 | 큰 문서 시 잘림, 고정된 1-shot |
| `agent` | Anthropic API (N-turn) | Claude가 툴로 필요한 부분만 찾아 읽음 → 큰 산출물에도 강함, 근거 품질↑ | 턴당 호출, 지연·비용↑ |
| `hybrid` (기본) | Anthropic API | 룰로 gating, LLM 1-shot으로 뉘앙스 보강 | 둘 다 필요 |
| `hybrid-agent` | Anthropic API | 룰 + 에이전트 융합. 가장 엄격 | 가장 느림/비쌈 |

하이브리드는 두 점수를 `rule:0.4 / llm:0.6` 가중평균합니다. 한쪽이 abstain 하면 나머지만 사용합니다.

### Agent 엔진이 쓰는 툴

| 툴 | 역할 |
|---|---|
| `list_artifacts` | 제출된 증적 목록 조회 (이름·확장자·크기) |
| `read_artifact(name, offset?, max_chars?)` | 특정 산출물의 일부 본문 읽기 |
| `search_artifacts(keyword)` | 전체 산출물에서 부분문자열 검색 + 주변 120자 발췌 |
| `get_process_spec(process_id)` | 대상 프로세스의 BP·기대 WP 스펙 조회 |
| `run_rule_score(process_id)` | 오프라인 룰 엔진 점수 baseline 확인 |
| `submit_cl1_verdict(...)` | **종료 툴** — 최종 판정 제출 (모든 BP·WP 포함 필수) |

에이전트는 `list_artifacts → get_process_spec → search_artifacts → (선택) read_artifact → (선택) run_rule_score → submit_cl1_verdict` 의 전형적 루프를 스스로 결정합니다. 제출 시 누락된 BP/WP는 하네스가 score=0 으로 자동 보완합니다.

리포트 객체에는 `trace: [{turn, tool, input, result}]` 가 포함되어 어떤 툴을 어떤 순서로 호출했는지 감사·디버깅할 수 있습니다.

## 평가 로직

1. **룰 엔진**: 각 BP의 keyword / WP 이름·별칭을 파일명과 본문에서 검색 → 매칭 비율 기반 점수.
2. **LLM 엔진 (1-shot)**: 프로세스 정의 + 산출물 발췌(최대 24,000자)를 Claude Opus 4.7에 전달,
   BP·WP 각각에 score/evidence/gaps JSON 반환.
3. **Agent 엔진**: Claude에 도구 셋을 주고 multi-turn tool-use 루프를 돌림. Claude가 직접 산출물을
   탐색·검색·샘플링한 뒤 `submit_cl1_verdict` 로 최종 판정을 제출. 기본 최대 12턴.
4. **하네스 집계**: BP·WP 점수를 `avg*0.6 + min*0.4` 로 결합 → PAM v4.0 등급(N/P/L/F)으로 변환.
5. **CL1 판정**: Rating이 `L` 또는 `F` 이면 Level 1 달성.

## 플러그인 추가 예시

```js
// src/processes/custom.js
import { defineProcess } from "./_helpers.js";

export const MY_PROC = defineProcess({
  id: "MY.1",
  name: "Custom Process",
  category: "CUSTOM",
  purpose: "...",
  basePractices: [
    { id: "BP1", title: "...", keywords: ["..."] },
  ],
  outputWorkProducts: [
    { id: "13-19", aliases: ["review"], keywords: ["review"] },
  ],
});

export default [MY_PROC];
```

그리고 `src/processes/index.js` 의 imports에 추가하면 자동 등록됩니다.

## 테스트

```bash
npm test
```

## 라이선스

MIT
