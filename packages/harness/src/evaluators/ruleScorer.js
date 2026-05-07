import { extractKeywords } from "../io/excerpt.js";
import { classifyContextMatch } from "../io/projectContext.js";

/**
 * RuleScorer — offline, deterministic scorer.
 *
 * scoreBP: overlap between BP keywords and artifact text/filenames.
 * scoreWP: whether any artifact is tagged with the expected WPID, or the
 *          WP name appears in filenames/body.
 * scoreGP: keyword overlap on GP title + PA scope; for PA 1.1 the score is
 *          derived from prior BP results (since GP 1.1.1 is "achieve the
 *          intent of the base practices").
 *
 * Project-context: when a `projectFingerprint` is supplied, each artifact's
 * context-match score (0..1, or null = unknown) acts as a per-artifact weight
 * on the keyword hit it provides. A match coming only from off-context
 * artifacts cannot earn full credit; it also feeds the categorical
 * `contextConsistency` field returned alongside the score.
 *
 * This scorer never fabricates evidence and always produces JSON-safe output.
 * @type {import("./scorer.js").Scorer}
 */
export const ruleScorer = {
  async scoreBP({ bp, artifacts, projectFingerprint }) {
    const kws = extractKeywords(`${bp.title} ${bp.description ?? ""}`, 10);
    if (!kws.length) return empty("no keywords derivable from BP spec");
    const matchIndex = buildMatchIndex(artifacts, projectFingerprint);
    const { weighted, total, evidence, missing, perArtifactHits } = matchKeywords(kws, artifacts, matchIndex);
    const scorePercent = scoreFromWeighted(weighted, total);
    const gaps = missing.length
      ? [`No evidence found for keywords: ${missing.slice(0, 6).join(", ")}`]
      : [];
    const contextConsistency = aggregateContext(matchIndex, perArtifactHits);
    if (contextConsistency.status === "off-context") {
      gaps.push("프로젝트 컨텍스트 불일치: 매칭된 산출물이 다른 제품/프로젝트로 보임");
    } else if (contextConsistency.status === "partial") {
      gaps.push("프로젝트 컨텍스트 부분 일치: 일부 매칭 산출물이 다른 컨텍스트로 보임");
    }
    return { scorePercent, evidence, gaps, contextConsistency };
  },

  async scoreWP({ wp, artifacts, projectFingerprint }) {
    const matchIndex = buildMatchIndex(artifacts, projectFingerprint);
    const wpidHit = artifacts.find((a) => a.wpidCandidates?.includes(wp.id));
    if (wpidHit) {
      const ctx = artifactContext(matchIndex, wpidHit);
      const base = 90;
      const score = applyContextPenalty(base, ctx.score);
      const gaps = [];
      if (ctx.status === "off-context") gaps.push("프로젝트 컨텍스트 불일치: 해당 WP 태깅 산출물이 다른 제품/프로젝트로 보임");
      else if (ctx.status === "partial") gaps.push("프로젝트 컨텍스트 부분 일치: 해당 산출물이 다른 컨텍스트로 보임");
      return {
        scorePercent: score,
        evidence: [
          {
            artifactName: wpidHit.name,
            quote: `Artifact tagged as WP ${wp.id} ${wp.name}`,
            location: "wpidCandidates",
          },
        ],
        gaps,
        contextConsistency: { status: ctx.status, note: ctx.note },
      };
    }
    // Fallback: name/alias match in filename or body
    const needle = wp.name.toLowerCase();
    const nameHit = artifacts.find((a) =>
      (a.name + " " + (a.text ?? "")).toLowerCase().includes(needle)
    );
    if (nameHit) {
      const ctx = artifactContext(matchIndex, nameHit);
      const base = 60;
      const score = applyContextPenalty(base, ctx.score);
      const gaps = [`No explicit WP ID ${wp.id} tagging; matched on name.`];
      if (ctx.status === "off-context") gaps.push("프로젝트 컨텍스트 불일치: 매칭 산출물이 다른 제품/프로젝트로 보임");
      else if (ctx.status === "partial") gaps.push("프로젝트 컨텍스트 부분 일치: 매칭 산출물이 다른 컨텍스트로 보임");
      return {
        scorePercent: score,
        evidence: [
          {
            artifactName: nameHit.name,
            quote: snippet(nameHit.text ?? nameHit.name, needle, 400),
          },
        ],
        gaps,
        contextConsistency: { status: ctx.status, note: ctx.note },
      };
    }
    return {
      scorePercent: 0,
      evidence: [],
      gaps: [`No artifact satisfies WP ${wp.id} ${wp.name}`],
      contextConsistency: { status: "unknown", note: "" },
    };
  },

  async scoreGP({ paSpec, gp, bpResults, artifacts, projectFingerprint }) {
    // PA 1.1: GP 1.1.1 depends entirely on BP achievement.
    if (paSpec.id === "PA 1.1") {
      const bpAvg =
        (bpResults ?? []).reduce((s, r) => s + (r.scorePercent ?? 0), 0) /
        Math.max((bpResults ?? []).length, 1);
      return {
        scorePercent: Math.round(bpAvg),
        evidence: [],
        gaps: bpResults?.some((r) => r.scorePercent < 51)
          ? ["Some base practices below 'Largely' threshold"]
          : [],
        // PA 1.1 inherits the worst BP-level context concern so it surfaces
        // at the PA roll-up too.
        contextConsistency: rollupBpContext(bpResults),
      };
    }
    // CL2/CL3 GPs — heuristic keyword overlap
    const kws = extractKeywords(`${gp.title} ${gp.description ?? ""} ${paSpec.scope ?? ""}`, 8);
    const matchIndex = buildMatchIndex(artifacts, projectFingerprint);
    const { weighted, total, evidence, missing, perArtifactHits } = matchKeywords(kws, artifacts, matchIndex);
    const scorePercent = scoreFromWeighted(weighted, total || 1);
    const gaps = missing.length ? [`GP evidence missing: ${missing.slice(0, 5).join(", ")}`] : [];
    const contextConsistency = aggregateContext(matchIndex, perArtifactHits);
    if (contextConsistency.status === "off-context") gaps.push("프로젝트 컨텍스트 불일치: 매칭 산출물이 다른 제품/프로젝트로 보임");
    else if (contextConsistency.status === "partial") gaps.push("프로젝트 컨텍스트 부분 일치: 일부 매칭 산출물이 다른 컨텍스트로 보임");
    return { scorePercent, evidence, gaps, contextConsistency };
  },
};

// ── project-context helpers ──────────────────────────────────────────────

// Build a `name → {score, status}` map from the precomputed fingerprint so
// match-time lookups are O(1). When no fingerprint is supplied (e.g. unit
// tests, single-artifact runs), every artifact reads as "unknown" and the
// score behaves identically to the pre-upgrade rule scorer.
function buildMatchIndex(artifacts, fingerprint) {
  const map = new Map();
  const perArtifact = fingerprint?.perArtifact ?? [];
  const byName = new Map(perArtifact.map((p) => [p.name, p]));
  for (const a of artifacts ?? []) {
    const entry = byName.get(a.name);
    const score = entry?.contextMatch ?? null;
    map.set(a.name, { score, status: classifyContextMatch(score) });
  }
  return map;
}

function artifactContext(matchIndex, artifact) {
  const e = matchIndex.get(artifact.name) ?? { score: null, status: "unknown" };
  return { score: e.score, status: e.status, note: noteFor(e.status) };
}

function noteFor(status) {
  switch (status) {
    case "off-context": return "산출물이 배치의 주요 제품/프로젝트 식별자와 일치하지 않음";
    case "partial": return "산출물이 배치 식별자 일부만 공유함";
    case "consistent": return "산출물이 배치의 주요 식별자와 일치함";
    default: return "";
  }
}

// Per-keyword weighted scoring: each hit contributes its artifact's
// contextMatch (defaults to 1.0 when fingerprint is unknown). A keyword found
// only in an off-context artifact (matchScore ≈ 0) contributes near zero.
function scoreFromWeighted(weighted, total) {
  if (!total) return 0;
  return Math.max(0, Math.min(100, Math.round((weighted / total) * 100)));
}

function applyContextPenalty(score, contextMatch) {
  if (contextMatch == null) return score;
  // Linear floor at 0.5 for off-context, 1.0 for fully consistent.
  const factor = 0.5 + 0.5 * Math.max(0, Math.min(1, contextMatch));
  return Math.round(score * factor);
}

function aggregateContext(matchIndex, perArtifactHits) {
  // Look only at artifacts that actually contributed evidence.
  const contributing = [...perArtifactHits.keys()];
  if (!contributing.length) return { status: "unknown", note: "" };
  const statuses = contributing.map((n) => matchIndex.get(n)?.status ?? "unknown");
  if (statuses.every((s) => s === "off-context")) {
    return { status: "off-context", note: noteFor("off-context") };
  }
  if (statuses.some((s) => s === "off-context") || statuses.some((s) => s === "partial")) {
    return { status: "partial", note: noteFor("partial") };
  }
  if (statuses.every((s) => s === "consistent")) {
    return { status: "consistent", note: noteFor("consistent") };
  }
  return { status: "unknown", note: "" };
}

function rollupBpContext(bpResults) {
  const order = { "off-context": 3, partial: 2, consistent: 1, unknown: 0 };
  let worst = { status: "unknown", note: "" };
  for (const r of bpResults ?? []) {
    const cc = r.contextConsistency ?? { status: "unknown", note: "" };
    if ((order[cc.status] ?? 0) > (order[worst.status] ?? 0)) worst = cc;
  }
  return worst;
}

// ── matchers ─────────────────────────────────────────────────────────────

function matchKeywords(keywords, artifacts, matchIndex) {
  const evidence = [];
  const missing = [];
  const perArtifactHits = new Map();
  let weighted = 0;
  for (const kw of keywords) {
    let matched = false;
    for (const a of artifacts) {
      const hay = (a.name + " " + (a.text ?? "")).toLowerCase();
      const idx = hay.indexOf(kw);
      if (idx >= 0) {
        const ctx = matchIndex.get(a.name) ?? { score: null };
        // Unknown context (null) => weight 1.0 to preserve legacy behaviour
        // when no fingerprint is available.
        const w = ctx.score == null ? 1.0 : Math.max(0, Math.min(1, ctx.score));
        weighted += w;
        evidence.push({
          artifactName: a.name,
          quote: snippet(a.text ?? "", kw, 400) || kw,
        });
        perArtifactHits.set(a.name, (perArtifactHits.get(a.name) ?? 0) + 1);
        matched = true;
        break;
      }
    }
    if (!matched) missing.push(kw);
  }
  return { weighted, total: keywords.length, evidence, missing, perArtifactHits };
}

function snippet(text, needle, radius = 400) {
  if (!text || !needle) return "";
  const i = text.toLowerCase().indexOf(needle.toLowerCase());
  if (i < 0) return "";
  // Find a clean window: extend the raw [i-radius, i+needle+radius] outward to
  // the nearest sentence/paragraph boundary so the snippet doesn't begin or
  // end mid-word. Falls back to the raw window if no boundary is found within
  // a reasonable extension budget.
  const rawStart = Math.max(0, i - radius);
  const rawEnd = Math.min(text.length, i + needle.length + radius);
  const start = expandBackToBoundary(text, rawStart, Math.max(0, rawStart - 200));
  const end = expandForwardToBoundary(text, rawEnd, Math.min(text.length, rawEnd + 200));
  return text.slice(start, end).replace(/\s+/g, " ").trim();
}

// A "real" sentence terminator: . ! ? (incl. CJK fullwidth) or newline.
// Decimal points like "0.5" are excluded by requiring whitespace / end-of-text
// AFTER the terminator (so "0.5" does not split, "끝났다. " does).
const SENTENCE_TERMINATOR = /[.!?。！？]/;

function isSentenceEndAt(text, p) {
  const ch = text[p];
  if (ch === "\n") return true;
  if (!SENTENCE_TERMINATOR.test(ch)) return false;
  const next = text[p + 1];
  return next === undefined || /\s/.test(next);
}

function expandBackToBoundary(text, from, floor) {
  for (let p = from; p > floor; p--) {
    if (isSentenceEndAt(text, p - 1)) return p;
  }
  // No boundary in budget — at least don't start mid-word.
  for (let p = from; p > floor; p--) {
    if (/\s/.test(text[p - 1])) return p;
  }
  return from;
}

function expandForwardToBoundary(text, from, ceil) {
  for (let p = from; p < ceil; p++) {
    if (isSentenceEndAt(text, p)) return p + 1;
  }
  for (let p = from; p < ceil; p++) {
    if (/\s/.test(text[p])) return p;
  }
  return from;
}


function empty(reason) {
  return {
    scorePercent: 0,
    evidence: [],
    gaps: [reason],
    contextConsistency: { status: "unknown", note: "" },
  };
}
