import { test } from "node:test";
import assert from "node:assert/strict";
import { buildExcerpt, extractKeywords } from "../src/io/excerpt.js";

test("extractKeywords: drops stopwords and short tokens", () => {
  const kws = extractKeywords(
    "Specify and document the functional and non-functional requirements for the system"
  );
  assert.ok(kws.includes("requirements"));
  assert.ok(kws.includes("functional"));
  assert.ok(!kws.includes("the"));
  assert.ok(!kws.includes("and"));
});

test("buildExcerpt: keyword-targeted windows", () => {
  const text = "A".repeat(500) + " TRACEABILITY matters here " + "B".repeat(500);
  const artifacts = [{ name: "doc.md", text, wpidCandidates: ["13-51"] }];
  const out = buildExcerpt({ artifacts, keywords: ["traceability"], window: 80, perArtifactChars: 200 });
  assert.match(out, /TRACEABILITY matters here/);
  assert.match(out, /doc\.md/);
  assert.match(out, /13-51/);
});

test("buildExcerpt: falls back to head when no keyword hits", () => {
  const artifacts = [{ name: "x.md", text: "hello world".repeat(300) }];
  const out = buildExcerpt({ artifacts, keywords: ["missing-keyword"], perArtifactChars: 80 });
  assert.match(out, /hello world/);
  assert.match(out, /truncated/);
});

test("buildExcerpt: per-artifact truncation caps total size", () => {
  const big = "z".repeat(50000);
  const artifacts = [{ name: "a.md", text: big }, { name: "b.md", text: big }];
  const out = buildExcerpt({ artifacts, keywords: [], maxChars: 5000, perArtifactChars: 2000 });
  assert.ok(out.length <= 5200, `length was ${out.length}`);
});
