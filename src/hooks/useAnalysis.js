import { useState } from "react";
import { DEFAULT_ENGINE } from "../data/engineDefaults";

const ANALYZE_ENDPOINT = "/api/analyze";

export const useAnalysis = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [phase, setPhase] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  /**
   * Run a per-process evaluation via the harness serverless endpoint.
   * Accepts either a single legacy artifact ({fileB64|fileText, fileName}) or
   * a multi-file payload ({artifacts: [...]}). The latter is what makes
   * per-process results reproducible against project-mode runs.
   * @param {{
   *   proc: object,
   *   artifacts?: Array<{name,text?:string,base64?:string,mimeType?:string,sizeBytes?:number}>,
   *   fileB64?: string,
   *   fileText?: string,
   *   fileName?: string,
   *   engine?: "rule"|"llm"|"hybrid",
   *   targetLevel?: 1|2|3,
   * }} ctx
   */
  const runAnalysis = async ({ proc, artifacts, fileB64, fileText, fileName, engine = DEFAULT_ENGINE, targetLevel = 1 }) => {
    const arts = Array.isArray(artifacts) && artifacts.length
      ? artifacts
      : (fileB64 || fileText)
        ? [fileB64
            ? { name: fileName, base64: fileB64, mimeType: "application/pdf" }
            : { name: fileName, text: fileText }]
        : [];
    if (!arts.length) {
      setError("먼저 증적 문서를 업로드하세요.");
      return null;
    }
    setAnalyzing(true);
    setError("");
    setResults(null);

    try {
      setPhase("하네스 · 프로세스 스펙 로드");
      await new Promise((r) => setTimeout(r, 150));

      setPhase(`${proc.id} · ${engine === "rule" ? "룰 엔진" : engine === "llm" ? "LLM" : "하이브리드"} 평가 중`);
      const response = await fetch(ANALYZE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          processId: proc.id,
          artifacts: arts,
          targetLevel,
          engine,
        }),
      });

      if (!response.ok) {
        const txt = await response.text();
        throw new Error(`API ${response.status}: ${txt.slice(0, 200)}`);
      }

      const data = await response.json();
      // Response is {ratings, summary, strengths, gaps, _verdict}.
      // `_verdict` carries the full harness ProcessVerdict for PA/CL rendering.
      const parsed = {
        ratings: data.ratings || [],
        summary: data.summary || "",
        strengths: data.strengths || "",
        gaps: data.gaps || "",
        _verdict: data._verdict || null,
      };

      setPhase("결과 집계 중");
      await new Promise((r) => setTimeout(r, 150));
      setResults(parsed);
      setPhase("");
      return parsed;
    } catch (e) {
      const isNetwork = e instanceof TypeError && /failed to fetch/i.test(e.message);
      setError(
        isNetwork
          ? "분석 실패 — 서버 연결 끊김 (Failed to fetch). 개발 서버 재시작 후 페이지를 새로고침하거나, 큰 파일을 한 번에 한 개씩 업로드해 보세요."
          : `분석 실패 — ${e.message}`
      );
      setPhase("");
      return null;
    } finally {
      setAnalyzing(false);
    }
  };

  const clear = () => {
    setResults(null);
    setError("");
    setPhase("");
  };

  return { analyzing, phase, results, error, setResults, setError, runAnalysis, clear };
};
