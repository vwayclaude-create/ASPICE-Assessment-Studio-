import { test } from "node:test";
import assert from "node:assert/strict";
import { hasPamCitation, validateLlmResult } from "../src/evaluators/citationGuard.js";

test("hasPamCitation: accepts valid shapes", () => {
  assert.ok(hasPamCitation("PAM §4.3.2"));
  assert.ok(hasPamCitation("PAM §4.3.2 BP5"));
  assert.ok(hasPamCitation("PAM §5.3.1 GP 2.1.1"));
  assert.ok(hasPamCitation("PAM § 3.2.2"));
});

test("hasPamCitation: rejects malformed / missing citations", () => {
  assert.ok(!hasPamCitation(""));
  assert.ok(!hasPamCitation(undefined));
  assert.ok(!hasPamCitation("see the PAM"));
  assert.ok(!hasPamCitation("§4.3.2"));
  assert.ok(!hasPamCitation("PAM section 4"));
});

test("validateLlmResult: accepts well-formed LLM verdict", () => {
  const v = validateLlmResult({
    scorePercent: 72,
    evidence: [{ artifactName: "srs.docx", quote: "..." }],
    gaps: [],
    pamCitation: "PAM §4.3.2 BP5",
  });
  assert.ok(v.ok);
  assert.equal(v.result.scorePercent, 72);
  assert.equal(v.result.contextConsistency.status, "unknown");
});

test("validateLlmResult: keeps contextConsistency when supplied", () => {
  const v = validateLlmResult({
    scorePercent: 50,
    evidence: [],
    gaps: [],
    pamCitation: "PAM §4.3.2 BP5",
    contextConsistency: { status: "off-context", note: "다른 프로젝트 자료로 보임" },
  });
  assert.ok(v.ok);
  assert.equal(v.result.contextConsistency.status, "off-context");
  assert.match(v.result.contextConsistency.note, /다른 프로젝트/);
});

test("validateLlmResult: normalizes invalid contextConsistency to unknown", () => {
  const v = validateLlmResult({
    scorePercent: 50,
    evidence: [],
    gaps: [],
    pamCitation: "PAM §4.3.2",
    contextConsistency: { status: "totally-broken", note: 123 },
  });
  assert.ok(v.ok);
  assert.equal(v.result.contextConsistency.status, "unknown");
  assert.equal(v.result.contextConsistency.note, "");
});

test("validateLlmResult: rejects missing citation", () => {
  const v = validateLlmResult({ scorePercent: 60, evidence: [], gaps: [] });
  assert.ok(!v.ok);
  assert.match(v.reason, /citation/);
});

test("validateLlmResult: rejects out-of-range score", () => {
  const v = validateLlmResult({
    scorePercent: 150,
    pamCitation: "PAM §4.3.2",
    evidence: [],
    gaps: [],
  });
  assert.ok(!v.ok);
  assert.match(v.reason, /out of range/);
});
