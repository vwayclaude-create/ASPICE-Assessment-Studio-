import { test } from "node:test";
import assert from "node:assert/strict";
import {
  extractProjectTerms,
  computeProjectFingerprint,
  classifyContextMatch,
  fingerprintForPrompt,
} from "../src/io/projectContext.js";

test("extractProjectTerms: pulls codename from filename", () => {
  const terms = extractProjectTerms({ name: "BMS-G3-SRS.docx", text: "" });
  assert.ok(terms.includes("BMS"), `expected BMS in ${JSON.stringify(terms)}`);
});

test("extractProjectTerms: skips ASPICE / generic vocabulary as noise", () => {
  const terms = extractProjectTerms({
    name: "SYS-REQUIREMENTS.docx",
    text: "REQUIREMENTS REQUIREMENTS REQUIREMENTS",
  });
  assert.ok(!terms.includes("REQUIREMENTS"), "REQUIREMENTS must be filtered as noise");
  assert.ok(!terms.includes("SYS"), "SYS must be filtered as noise");
});

test("extractProjectTerms: pulls mid-segment from internal IDs", () => {
  const terms = extractProjectTerms({
    name: "x.txt",
    text: "",
    extractedIds: ["REQ-BMS-001", "ARCH-BMS-002", "TC-BMS-005"],
  });
  assert.ok(terms.includes("BMS"), `expected BMS in ${JSON.stringify(terms)}`);
});

test("computeProjectFingerprint: dominant term shared across all artifacts", () => {
  const artifacts = [
    { name: "BMS-G3-SRS.docx", text: "BMS Battery Management System v1", extractedIds: ["REQ-BMS-001"] },
    { name: "BMS-G3-Arch.docx", text: "BMS architecture document", extractedIds: ["ARCH-BMS-001"] },
    { name: "BMS-G3-Tests.xlsx", text: "BMS test cases", extractedIds: ["TC-BMS-005"] },
  ];
  const fp = computeProjectFingerprint(artifacts);
  assert.ok(fp.dominant.includes("BMS"), `dominant should include BMS, got ${JSON.stringify(fp.dominant)}`);
  for (const p of fp.perArtifact) {
    assert.ok(p.contextMatch >= 0.5, `${p.name} should match context, got ${p.contextMatch}`);
  }
});

test("computeProjectFingerprint: flags off-context artifact", () => {
  const artifacts = [
    { name: "BMS-G3-SRS.docx", text: "BMS Battery Management System", extractedIds: ["REQ-BMS-001"] },
    { name: "BMS-G3-Arch.docx", text: "BMS architecture document", extractedIds: ["ARCH-BMS-002"] },
    { name: "BMS-G3-Plan.docx", text: "BMS plan document", extractedIds: ["PLAN-BMS-001"] },
    // Off-context: completely different program identifiers
    { name: "ADAS-X1-SRS.docx", text: "ADAS lane keeping requirements", extractedIds: ["REQ-ADAS-001"] },
  ];
  const fp = computeProjectFingerprint(artifacts);
  assert.ok(fp.dominant.includes("BMS"));
  const offCtx = fp.perArtifact.find((p) => p.name === "ADAS-X1-SRS.docx");
  assert.ok(offCtx, "ADAS artifact entry must exist");
  assert.ok(offCtx.contextMatch < 0.3, `ADAS artifact should be off-context, got ${offCtx.contextMatch}`);
  assert.equal(classifyContextMatch(offCtx.contextMatch), "off-context");
});

test("computeProjectFingerprint: single artifact yields empty fingerprint", () => {
  const fp = computeProjectFingerprint([
    { name: "BMS-G3-SRS.docx", text: "BMS doc", extractedIds: ["REQ-BMS-001"] },
  ]);
  assert.equal(fp.dominant.length, 0);
  assert.equal(fp.perArtifact[0].contextMatch, null);
  assert.equal(classifyContextMatch(fp.perArtifact[0].contextMatch), "unknown");
});

test("classifyContextMatch: thresholds", () => {
  assert.equal(classifyContextMatch(null), "unknown");
  assert.equal(classifyContextMatch(0.0), "off-context");
  assert.equal(classifyContextMatch(0.29), "off-context");
  assert.equal(classifyContextMatch(0.3), "partial");
  assert.equal(classifyContextMatch(0.59), "partial");
  assert.equal(classifyContextMatch(0.6), "consistent");
  assert.equal(classifyContextMatch(1.0), "consistent");
});

test("fingerprintForPrompt: friendly text for empty fingerprint", () => {
  const txt = fingerprintForPrompt({ dominant: [], perArtifact: [] });
  assert.match(txt, /unknown/);
});

test("fingerprintForPrompt: top dominant terms joined", () => {
  const txt = fingerprintForPrompt({ dominant: ["BMS", "G3", "Hyundai"], perArtifact: [] });
  assert.equal(txt, "BMS, G3, Hyundai");
});
