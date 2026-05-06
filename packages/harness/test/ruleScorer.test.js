import { test } from "node:test";
import assert from "node:assert/strict";
import { ruleScorer } from "../src/evaluators/ruleScorer.js";
import { loadProcess, loadProcessAttributes } from "../spec/canonical/index.js";

test("ruleScorer.scoreBP: high score when keywords are present", async () => {
  const sys2 = loadProcess("SYS.2");
  const bp5 = sys2.basePractices.find((b) => b.id === "BP5");
  const artifacts = [
    {
      name: "Traceability_Matrix.xlsx",
      text:
        "This matrix establishes bidirectional traceability between system requirements and stakeholder requirements for consistency verification.",
    },
  ];
  const r = await ruleScorer.scoreBP({ process: sys2, bp: bp5, artifacts });
  assert.ok(r.scorePercent >= 51, `expected Largely+, got ${r.scorePercent}%`);
  assert.ok(r.evidence.length > 0);
});

test("ruleScorer.scoreBP: zero when no artifacts match", async () => {
  const sys2 = loadProcess("SYS.2");
  const bp1 = sys2.basePractices.find((b) => b.id === "BP1");
  const r = await ruleScorer.scoreBP({
    process: sys2,
    bp: bp1,
    artifacts: [{ name: "unrelated.md", text: "hello world" }],
  });
  assert.equal(r.scorePercent, 0);
  assert.ok(r.gaps.length > 0);
});

test("ruleScorer.scoreWP: 90 when artifact tagged with matching WPID", async () => {
  const wp = { id: "17-00", name: "Requirement" };
  const r = await ruleScorer.scoreWP({
    wp,
    artifacts: [{ name: "srs.docx", wpidCandidates: ["17-00"], text: "" }],
  });
  assert.equal(r.scorePercent, 90);
  assert.ok(r.evidence[0].artifactName === "srs.docx");
});

test("ruleScorer.scoreWP: 60 when name matches but no WPID tagging", async () => {
  const wp = { id: "13-51", name: "Consistency Evidence" };
  const r = await ruleScorer.scoreWP({
    wp,
    artifacts: [{ name: "x.md", wpidCandidates: [], text: "This is a consistency evidence review record." }],
  });
  assert.equal(r.scorePercent, 60);
});

test("ruleScorer.scoreWP: 0 when nothing matches", async () => {
  const wp = { id: "17-54", name: "Requirement Attribute" };
  const r = await ruleScorer.scoreWP({
    wp,
    artifacts: [{ name: "unrelated.pdf", wpidCandidates: [], text: "completely off-topic" }],
  });
  assert.equal(r.scorePercent, 0);
});

test("ruleScorer.scoreGP PA 1.1: inherits average of BP scores", async () => {
  const pas = loadProcessAttributes();
  const paSpec = pas["PA 1.1"];
  const gp = paSpec.genericPractices[0];
  const r = await ruleScorer.scoreGP({
    paSpec,
    gp,
    bpResults: [
      { id: "BP1", scorePercent: 80 },
      { id: "BP2", scorePercent: 60 },
      { id: "BP3", scorePercent: 40 },
    ],
    artifacts: [],
  });
  assert.equal(r.scorePercent, 60);
});

test("ruleScorer.scoreBP: down-weights matches from off-context artifacts", async () => {
  const sys2 = loadProcess("SYS.2");
  const bp5 = sys2.basePractices.find((b) => b.id === "BP5");
  const onCtx = {
    name: "BMS-Trace.xlsx",
    text: "This matrix establishes bidirectional traceability between system requirements and stakeholder requirements for consistency verification.",
  };
  const offCtx = {
    name: "ADAS-Trace.xlsx",
    text: "This matrix establishes bidirectional traceability between system requirements and stakeholder requirements for consistency verification.",
  };
  // Fingerprint says only BMS-Trace is on-context. ADAS-Trace is severely off.
  const fingerprint = {
    dominant: ["BMS"],
    perArtifact: [
      { name: "BMS-Trace.xlsx", terms: ["BMS"], hits: ["BMS"], contextMatch: 1.0 },
      { name: "ADAS-Trace.xlsx", terms: ["ADAS"], hits: [], contextMatch: 0.0 },
    ],
  };
  const onScore = await ruleScorer.scoreBP({ process: sys2, bp: bp5, artifacts: [onCtx], projectFingerprint: fingerprint });
  const offScore = await ruleScorer.scoreBP({ process: sys2, bp: bp5, artifacts: [offCtx], projectFingerprint: fingerprint });
  assert.ok(offScore.scorePercent < onScore.scorePercent, `off-context score (${offScore.scorePercent}) should be < on-context (${onScore.scorePercent})`);
  assert.equal(offScore.contextConsistency.status, "off-context");
  assert.ok(offScore.gaps.some((g) => /컨텍스트 불일치/.test(g)));
});

test("ruleScorer.scoreWP: applies context penalty even when WPID matches", async () => {
  const wp = { id: "17-00", name: "Requirement" };
  const fingerprint = {
    dominant: ["BMS"],
    perArtifact: [
      { name: "ADAS-srs.docx", terms: ["ADAS"], hits: [], contextMatch: 0.0 },
    ],
  };
  const r = await ruleScorer.scoreWP({
    wp,
    artifacts: [{ name: "ADAS-srs.docx", wpidCandidates: ["17-00"], text: "" }],
    projectFingerprint: fingerprint,
  });
  // Pre-upgrade behaviour was scorePercent=90; with context penalty this must drop.
  assert.ok(r.scorePercent < 90, `expected penalty to lower score below 90, got ${r.scorePercent}`);
  assert.equal(r.contextConsistency.status, "off-context");
});

test("ruleScorer.scoreBP: no fingerprint preserves legacy scoring", async () => {
  const sys2 = loadProcess("SYS.2");
  const bp5 = sys2.basePractices.find((b) => b.id === "BP5");
  const r = await ruleScorer.scoreBP({
    process: sys2,
    bp: bp5,
    artifacts: [
      {
        name: "Trace.xlsx",
        text: "This matrix establishes bidirectional traceability between system requirements and stakeholder requirements for consistency verification.",
      },
    ],
    // no projectFingerprint passed
  });
  assert.ok(r.scorePercent >= 51, `legacy path should still pass Largely+, got ${r.scorePercent}%`);
  assert.equal(r.contextConsistency.status, "unknown");
});
