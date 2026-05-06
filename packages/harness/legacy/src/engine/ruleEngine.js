import { rateFromScore } from "../model/verdict.js";

/**
 * Rule-based evaluator.
 *
 * For each expected Output Work Product, search submitted artifacts for:
 *   - filename tokens that match the WP id or any plugin-supplied alias
 *   - content keywords declared by the plugin
 * For each Base Practice, search artifact text for declared BP keywords.
 *
 * Scores are bounded in [0, 1]. The engine never reaches out to the network.
 */
export class RuleEngine {
  async evaluate({ plugin, artifacts }) {
    const basePractices = plugin.basePractices.map((bp) => scoreBasePractice(bp, artifacts));
    const workProducts = plugin.outputWorkProducts.map((wp) => scoreWorkProduct(wp, artifacts));
    const notes = [
      `Rule engine evaluated ${artifacts.length} artifact(s) against ${plugin.id}.`,
    ];
    return { basePractices, workProducts, notes };
  }
}

function scoreBasePractice(bp, artifacts) {
  const keywords = bp.keywords ?? [];
  if (keywords.length === 0) {
    // No rule hints — abstain at 0.5 so LLM / reviewer can refine.
    return {
      id: bp.id,
      title: bp.title,
      score: 0.5,
      rating: rateFromScore(0.5),
      evidence: [],
      gaps: ["No rule-based keyword was declared for this BP; human review required."],
      note: "abstain",
    };
  }

  const hits = [];
  const missing = [];
  for (const kw of keywords) {
    const match = findKeywordIn(artifacts, kw);
    if (match) hits.push({ keyword: kw, source: match.name });
    else missing.push(kw);
  }
  const score = hits.length / keywords.length;
  return {
    id: bp.id,
    title: bp.title,
    score,
    rating: rateFromScore(score),
    evidence: hits.map((h) => `"${h.keyword}" found in ${h.source}`),
    gaps: missing.map((k) => `Missing evidence for keyword: "${k}"`),
  };
}

function scoreWorkProduct(wpSpec, artifacts) {
  // wpSpec can be a bare string ID or { id, aliases, keywords }
  const spec = typeof wpSpec === "string" ? { id: wpSpec } : wpSpec;
  const aliases = spec.aliases ?? [];
  const contentKeywords = spec.keywords ?? [];

  const nameMatch = artifacts.find((a) =>
    matchesName(a, spec.id) || aliases.some((alias) => matchesName(a, alias)),
  );

  let contentScore = 0;
  const contentHits = [];
  if (contentKeywords.length > 0) {
    for (const kw of contentKeywords) {
      const m = findKeywordIn(artifacts, kw);
      if (m) contentHits.push({ keyword: kw, source: m.name });
    }
    contentScore = contentHits.length / contentKeywords.length;
  }

  const nameScore = nameMatch ? 1 : 0;
  // If the plugin supplied content keywords, weigh content 60% / name 40%.
  // Otherwise rely on name match alone.
  const score = contentKeywords.length > 0
    ? nameScore * 0.4 + contentScore * 0.6
    : nameScore;

  const evidence = [];
  if (nameMatch) evidence.push(`Matched by name: ${nameMatch.name}`);
  evidence.push(...contentHits.map((h) => `"${h.keyword}" found in ${h.source}`));

  const gaps = [];
  if (!nameMatch) gaps.push(`No artifact filename matches WP ${spec.id} (${aliases.join(", ") || "no aliases"}).`);
  if (contentKeywords.length > 0 && contentHits.length < contentKeywords.length) {
    const missing = contentKeywords.filter((k) => !contentHits.find((h) => h.keyword === k));
    gaps.push(`Content keywords not found: ${missing.join(", ")}`);
  }

  return {
    id: spec.id,
    score,
    rating: rateFromScore(score),
    found: nameMatch != null || contentHits.length > 0,
    evidence,
    gaps,
  };
}

function matchesName(artifact, token) {
  if (!artifact?.name || !token) return false;
  const hay = artifact.name.toLowerCase();
  const needle = String(token).toLowerCase();
  return hay.includes(needle);
}

function findKeywordIn(artifacts, keyword) {
  const needle = String(keyword).toLowerCase();
  for (const a of artifacts) {
    const hay = (a.text ?? "").toLowerCase();
    if (hay.includes(needle)) return a;
    if ((a.name ?? "").toLowerCase().includes(needle)) return a;
  }
  return null;
}
