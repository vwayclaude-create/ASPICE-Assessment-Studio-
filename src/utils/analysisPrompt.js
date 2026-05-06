export const SYSTEM_PROMPT = `You are a certified Automotive SPICE 4.0 Lead Assessor (intacs). Rate Base Practices strictly per the NPLF scale defined in ISO/IEC 33020 and the VDA Automotive SPICE Guidelines (2024-03-12). Be evidence-based and objective. Output only JSON. Respond in Korean for rationale fields.`;

const GUIDELINE_MAX_LEN = 5500;

export const buildAnalysisPrompt = ({ proc, fileName }) => {
  const bpList = proc.bps.map((b) => `- ${b.id} (${b.title}): ${b.description}`).join("\n");
  const outcomes = proc.outcomes.map((o, i) => `${i + 1}) ${o}`).join(" ");
  const guidelineTrim = proc.guideline.slice(0, GUIDELINE_MAX_LEN);
  const bpCount = proc.bps.length;

  return `[대상 프로세스]
${proc.id} — ${proc.name}
Purpose: ${proc.purpose}
Outcomes: ${outcomes}

[평가할 Base Practices]
${bpList}

[ASPICE Guidelines (VDA 2024-03-12) 해석/평가 기준 발췌]
${guidelineTrim}

[작업]
첨부된 증적 문서(프로젝트 산출물 / 프로세스 증적, 형식: ${fileName})를 분석하여, 위 각 BP가 얼마나 수행/증명되었는지를 NPLF 등급으로 평가하세요.
- F  (Fully,       86-100%): 모든 측면이 완전히 달성됨
- L+ (Largely+,   71-85%):  거의 완전히 달성, 경미한 결함만 존재
- L- (Largely-,   51-70%):  대부분 달성되었으나 일부 항목 미흡
- P+ (Partially+, 31-50%):  절반 이상 달성, 주요 항목 일부 미흡
- P- (Partially-, 16-30%):  부분적으로 달성, 대부분 미흡
- N  (Not,          0-15%): 달성 증거 없음

CL1 합격 기준: 모든 BP가 L 또는 F 이어야 함.

[출력 형식 — 순수 JSON만, 마크다운 금지]
{"ratings":[{"bp":"BP1","rating":"F|L+|L-|P+|P-|N","rationale":"근거 요약(한국어, 40단어 이내)","evidence":[{"quote":"문서에서 직접 인용하거나 핵심을 압축한 한국어 설명(60단어 이내, 평가에 결정적인 문장이나 표·그림의 의미를 구체적으로 기술). 단순히 '있음/없음'이라고만 쓰지 말 것.","location":"위치 식별자 + 페이지 번호. 예: \\"§3.1 Component Diagram, p.14\\", \\"Table 2 — Interface List, pp.20-22\\", \\"Figure 4, p.31\\". 페이지 번호를 추정할 수 없으면 섹션·헤딩만이라도 명시. 정말 위치를 특정할 수 없을 때만 \\"위치 식별 불가\\"."}]}],"summary":"전체 CL1 적합성 판단(한국어, 30단어 이내)","strengths":"강점(한국어, 20단어)","gaps":"주요 결함(한국어, 30단어)"}

요구사항:
- 반드시 ${bpCount}개의 BP를 모두 포함. BP 키는 "BP1"..."BP${bpCount}" 형식.
- evidence는 최소 1개, 최대 3개 항목의 배열. 등급이 N(증거 없음)이라도 "어디를 봤는데 무엇이 없었는지"를 1개 이상 항목으로 기록하고 location을 명시할 것.
- quote는 가능하면 문서의 원문 표현을 큰따옴표 없이 그대로 옮기고, 너무 길면 핵심만 압축. 평가자가 PDF에서 즉시 찾아갈 수 있을 정도의 식별 정보를 location에 담을 것.`;
};

export const parseAnalysisResponse = (data) => {
  const combined = (data.content || [])
    .filter((c) => c.type === "text")
    .map((c) => c.text)
    .join("\n")
    .replace(/```json|```/g, "")
    .trim();

  const match = combined.match(/\{[\s\S]*\}/);
  if (!match) {
    throw new Error("응답에서 JSON을 찾을 수 없습니다. 원문: " + combined.slice(0, 200));
  }
  const parsed = JSON.parse(match[0]);
  if (!parsed.ratings || !Array.isArray(parsed.ratings)) {
    throw new Error("ratings 필드 누락");
  }
  return parsed;
};
