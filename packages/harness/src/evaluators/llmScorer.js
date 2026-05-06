import { buildBpPrompt } from "../llm/prompts/bpPrompt.js";
import { buildWpPrompt } from "../llm/prompts/wpPrompt.js";
import { buildGpPrompt } from "../llm/prompts/gpPrompt.js";
import { buildExcerpt, extractKeywords } from "../io/excerpt.js";
import { fingerprintForPrompt } from "../io/projectContext.js";
import { validateLlmResult } from "./citationGuard.js";

// Safety-net multiplier applied AFTER the LLM's own verdict. The assessor is
// instructed to lower scorePercent itself when it flags partial/off-context
// evidence, but we also apply a conservative cap here so the numeric score
// can never silently drift back up if the LLM forgets to follow the rule.
const CONTEXT_MULTIPLIERS = {
  consistent: 1.0,
  unknown: 1.0,
  partial: 0.85,
  "off-context": 0.6,
};

/**
 * LlmScorer — single-shot assessor scorer that calls a provider-agnostic
 * LLM client and validates the response (JSON shape + PAM citation).
 * Malformed responses degrade gracefully: score=0, gap noted.
 *
 * @param {{client: import("../llm/client.js").LlmClient}} opts
 * @returns {import("./scorer.js").Scorer}
 */
export function createLlmScorer({ client }) {
  if (!client) throw new Error("LlmScorer requires an LLM client");

  async function call(buildFn, ctx, keywords) {
    const excerpt = buildExcerpt({
      artifacts: ctx.artifacts ?? [],
      keywords,
    });
    const projectFingerprint = fingerprintForPrompt(ctx.projectFingerprint);
    const prompt = buildFn({ ...ctx, artifactsExcerpt: excerpt, projectFingerprint });
    let raw;
    try {
      const { parsed } = await client.generateJson(prompt);
      raw = parsed;
    } catch (err) {
      return fallback(`LLM call failed: ${err.message}`);
    }
    const v = validateLlmResult(raw);
    if (!v.ok) return fallback(v.reason, raw);
    const { contextConsistency } = v.result;
    const multiplier = CONTEXT_MULTIPLIERS[contextConsistency.status] ?? 1.0;
    const adjustedScore = Math.round(v.result.scorePercent * multiplier);
    const gaps = [...v.result.gaps];
    if (contextConsistency.status === "off-context") {
      gaps.push(`프로젝트 컨텍스트 불일치: ${contextConsistency.note || "다른 제품/프로젝트의 자료로 판단됨"}`);
    } else if (contextConsistency.status === "partial") {
      gaps.push(`프로젝트 컨텍스트 부분 일치: ${contextConsistency.note || "일부 산출물이 다른 컨텍스트로 보임"}`);
    }
    return {
      scorePercent: adjustedScore,
      evidence: v.result.evidence,
      gaps,
      pamCitation: v.result.pamCitation,
      contextConsistency,
    };
  }

  return {
    async scoreBP(ctx) {
      const kws = extractKeywords(`${ctx.bp.title} ${ctx.bp.description ?? ""}`, 8);
      return call(buildBpPrompt, ctx, kws);
    },
    async scoreWP(ctx) {
      const kws = [ctx.wp.name.toLowerCase(), ctx.wp.id];
      return call(buildWpPrompt, ctx, kws);
    },
    async scoreGP(ctx) {
      const kws = extractKeywords(`${ctx.gp.title} ${ctx.gp.description ?? ""} ${ctx.paSpec.scope ?? ""}`, 8);
      return call(buildGpPrompt, ctx, kws);
    },
  };
}

function fallback(reason, raw) {
  return {
    scorePercent: 0,
    evidence: [],
    gaps: [`LLM verdict rejected: ${reason}`],
    contextConsistency: { status: "unknown", note: "" },
    ...(raw ? { rawLlmResponse: raw } : {}),
  };
}
