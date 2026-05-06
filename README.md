# aspice-app

ASPICE v4.0 (CL1–CL3) 평가 도구. 증적 문서를 업로드하면 `aspice-harness` 평가 엔진이 BP/WP/PA 채점, Capability Level 산정, 다중 프로세스 cross-process 정합성/추적성 검사를 수행한다.

UI는 React + Vite. 백엔드 평가는 Vercel Serverless Functions(`/api/analyze`, `/api/project`)에서 실행되며, 로컬 개발 시에는 `vite.config.js`의 `harnessDevPlugin`이 같은 핸들러를 dev 서버 미들웨어로 연결한다.

## 아키텍처

```
Browser (React SPA)
   │ POST /api/analyze            POST /api/project
   ▼                              ▼
api/analyze.js  ─────┐    ┌────── api/project.js
                     ▼    ▼
              api/_harnessService.js   (오케스트레이션)
                     │
                     ├── _textExtractor.js    PDF/DOCX/text → cleaned text + page map
                     ├── _artifactBuilder.js  payload → harness artifact[]
                     ├── _evidencePages.js    BP evidence ↔ source page 매핑
                     └── _legacyAdapter.js    ProcessVerdict → 레거시 UI shape + 한국어화
                     │
                     ▼
              aspice-harness  (file:../../../project3 → C:/project3)
                Harness · evaluators · crossProcess · spec/canonical
```

레거시 UI shape는 `/api/analyze`에만 적용된다 (`VerdictCard`가 소비). `/api/project`는 harness가 반환하는 `ProcessVerdict[]` + `crossProcess` 그대로 응답한다.

## 환경 변수

서버 측 (Vercel · 로컬 dev — `.env`/`aspice.env`에 보관, 절대 커밋 금지):

| 변수 | 필수 | 용도 |
|---|---|---|
| `OPENAI_API_KEY` | engine=`llm`/`hybrid` 사용 시 필수 | `gpt-4o`로 LLM 채점 |
| `SUPABASE_JWT_SECRET` | 운영 권장 | `/api/*` Bearer JWT 검증. 미설정 시 인증 스킵(개발용) |
| `ANTHROPIC_API_KEY` | 선택 | 현재 사용처 없음 (legacy) |

브라우저로 노출되는 변수는 `VITE_` prefix만 — 위 키들에는 절대 붙이지 말 것.

## 로컬 개발

```bash
npm install                    # aspice-harness가 file:../../../project3 → 심볼릭 링크
npm run dev                    # http://localhost:5174 (strictPort)
npm run build                  # dist/ 산출
npm run lint
npm run preview                # http://localhost:4173
```

`aspice-harness`는 별도 리포(`C:/project3`)로 심볼릭 링크되어 있다. 평가 엔진을 수정하려면 그쪽 코드를 직접 편집한다 — 변경은 dev 서버에 즉시 반영된다.

## 배포 (Vercel)

- `vercel.json`이 `api/analyze.js`, `api/project.js`의 `maxDuration`을 60초로 설정. 다중 프로세스 평가가 이를 초과할 수 있어 Promise.all로 병렬화되어 있음 (`Harness.evaluateProject`).
- 환경 변수는 Vercel Project Settings → Environment Variables에 등록.
- `aspice-harness` 의존성은 `file:../../../project3` 로컬 경로라 **그대로는 Vercel 빌드 안 됨**. 배포 전에 npm registry 게시 또는 sub-path/monorepo 구성으로 바꿔야 한다.

## 디렉터리 구조

```
src/
  App.jsx                Auth 라우팅 (Landing/Login/Signup/Verify ↔ SolutionApp)
  SolutionApp.jsx        per-process · project 두 모드의 메인 컨테이너
  components/            UI 컴포넌트 (ModeToggle, ProcessCard, VerdictCard, …)
  hooks/                 useAnalysis · useProject · useHistory · useProjectHistory · useFontInjector
  auth/                  Supabase 기반 인증 (AuthContext, LoginPage, SignupPage, …)
  data/                  ASPICE 정적 데이터 (aspiceData, formats, detectRules, sampleReport, …)
  utils/                 fileReaders · exportReport · evidence · analysisPrompt
  theme.js               색상/폰트 토큰

api/
  analyze.js             Serverless: 단일 프로세스 평가 (JWT 검증 + handleEvaluate)
  project.js             Serverless: 프로젝트 평가 (JWT 검증 + handleProject)
  _harnessService.js     공통 오케스트레이션 (handleEvaluate · handleProject)
  _textExtractor.js      PDF/DOCX/text 추출 + 페이지 매핑
  _artifactBuilder.js    payload → harness artifact[]
  _evidencePages.js      BP 증거에 source page 번호 부여
  _legacyAdapter.js      ProcessVerdict → 레거시 UI shape + 한국어화

vite.config.js           dev 서버에 /api/* 미들웨어 부착 (harnessDevPlugin)
vercel.json              서버리스 함수 타임아웃 설정
```

## 디버깅 팁

- **PDF 텍스트가 깨짐 (예: `ÆŞÈ`)**: PDF가 ToUnicode CMap 없는 CID 폰트. `_textExtractor.js#cleanText`의 Latin Extended 클러스터 → `□` 치환이 적용되어 채점은 영향 안 받지만 evidence 인용이 사라진다. 원문 PDF를 다시 export하는 게 정공법.
- **BP 점수가 프로세스 모드 vs 프로젝트 모드에서 다름**: `_harnessService.js#filterArtifactsForProcess` 스코핑이 다르게 적용되었을 가능성. 두 모드 모두 같은 함수를 거친다 — 그래도 다르면 인덱싱 시점(`indexArtifacts`)을 확인.
- **`engine=hybrid` 호출이 401`engine=hybrid requires OPENAI_API_KEY`**: 서버 환경변수에 `OPENAI_API_KEY`가 없음. `engine=rule`은 키 없이도 동작.
- **`Unauthorized. Sign in required.`**: `SUPABASE_JWT_SECRET`이 설정되어 있는데 클라이언트가 Bearer 토큰을 보내지 않거나 만료. 로컬 검증만 할 거면 `.env`에서 변수 제거 → 인증 스킵 모드.
- **이력이 사라짐**: `useHistory`/`useProjectHistory`는 `localStorage` 기반. 도메인이 바뀌면 분리됨.

## 책임 분리 원칙

- **UI는 평가 로직을 모름**: `aspice-harness`의 ProcessVerdict shape는 `_legacyAdapter.js`에서만 변환. UI 변경이 평가 엔진에 새는 일 없음.
- **`api/_*.js`는 모두 서버 전용**: 브라우저 번들에 들어가면 안 됨. `pdf-parse`·`Buffer` 사용 때문.
- **Spec은 데이터, 코드 아님**: `C:/project3/spec/canonical/processes/*.json`을 수정하면 즉시 평가에 반영. PAM 업데이트는 spec 추출기로.
