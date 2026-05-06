import { test } from "node:test";
import assert from "node:assert/strict";
import { createHybridScorer } from "../src/evaluators/hybridScorer.js";

const mkScorer = (score, opts = {}) => ({
  async scoreBP() { return { scorePercent: score, evidence: opts.evidence ?? [], gaps: opts.gaps ?? [] }; },
  async scoreWP() { return { scorePercent: score, evidence: opts.evidence ?? [], gaps: opts.gaps ?? [] }; },
  async scoreGP() { return { scorePercent: score, evidence: opts.evidence ?? [], gaps: opts.gaps ?? [] }; },
});

test("hybrid: 40/60 weighted fusion of rule and llm scores", async () => {
  const hybrid = createHybridScorer({ rule: mkScorer(40), llm: mkScorer(80) });
  const r = await hybrid.scoreBP({});
  // 40*0.4 + 80*0.6 = 16 + 48 = 64
  assert.equal(r.scorePercent, 64);
});

test("hybrid: llm rejected → rule only", async () => {
  const hybrid = createHybridScorer({
    rule: mkScorer(70),
    llm: mkScorer(0, { gaps: ["rejected: invalid citation"] }),
  });
  const r = await hybrid.scoreBP({});
  assert.equal(r.scorePercent, 70);
  assert.ok(r.gaps.some((g) => /\[llm\].*rejected/.test(g)));
});

test("hybrid: rule threw → llm only", async () => {
  const ruleThatThrows = {
    async scoreBP() { throw new Error("rule boom"); },
    async scoreWP() { throw new Error("rule boom"); },
    async scoreGP() { throw new Error("rule boom"); },
  };
  const hybrid = createHybridScorer({ rule: ruleThatThrows, llm: mkScorer(55) });
  const r = await hybrid.scoreBP({});
  assert.equal(r.scorePercent, 55);
});

test("hybrid: both abstained → 0 with both gaps", async () => {
  const hybrid = createHybridScorer({
    rule: mkScorer(0, { gaps: ["rejected: empty input"] }),
    llm: mkScorer(0, { gaps: ["failed: network"] }),
  });
  const r = await hybrid.scoreBP({});
  assert.equal(r.scorePercent, 0);
  assert.equal(r.gaps.length, 2);
});

test("hybrid: reconciles contextConsistency to the more decisive verdict", async () => {
  const ruleScorer = {
    async scoreBP() { return { scorePercent: 70, evidence: [], gaps: [], contextConsistency: { status: "consistent", note: "" } }; },
    async scoreWP() { return { scorePercent: 70, evidence: [], gaps: [], contextConsistency: { status: "consistent", note: "" } }; },
    async scoreGP() { return { scorePercent: 70, evidence: [], gaps: [], contextConsistency: { status: "consistent", note: "" } }; },
  };
  const llmScorer = {
    async scoreBP() { return { scorePercent: 70, evidence: [], gaps: [], contextConsistency: { status: "off-context", note: "다른 프로젝트" } }; },
    async scoreWP() { return { scorePercent: 70, evidence: [], gaps: [], contextConsistency: { status: "off-context", note: "다른 프로젝트" } }; },
    async scoreGP() { return { scorePercent: 70, evidence: [], gaps: [], contextConsistency: { status: "off-context", note: "다른 프로젝트" } }; },
  };
  const hybrid = createHybridScorer({ rule: ruleScorer, llm: llmScorer });
  const r = await hybrid.scoreBP({});
  assert.equal(r.contextConsistency.status, "off-context");
  assert.match(r.contextConsistency.note, /다른 프로젝트/);
});
