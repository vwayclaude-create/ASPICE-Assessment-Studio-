import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { Harness } from "../src/harness.js";
import { ruleScorer } from "../src/evaluators/ruleScorer.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function loadFixture(name) {
  const path = resolve(__dirname, "fixtures", name);
  const text = await readFile(path, "utf8");
  return {
    name,
    path,
    mimeType: "text/plain",
    sizeBytes: text.length,
    text,
  };
}

test("e2e: evaluate SYS.2 against fixture artifacts with ruleScorer", async () => {
  const artifacts = [
    await loadFixture("sys2_srs.md"),
    await loadFixture("sys2_trace_matrix.csv"),
  ];
  const harness = new Harness({ scorer: ruleScorer, targetLevel: 1 });
  const verdict = await harness.evaluateProcess({ processId: "SYS.2", artifacts });

  assert.equal(verdict.processId, "SYS.2");
  assert.equal(verdict.bps.length, 6, "SYS.2 has 6 base practices");
  assert.equal(verdict.pas.length, 1, "targetLevel=1 evaluates only PA 1.1");

  const bpScores = verdict.bps.map((b) => b.scorePercent);
  const avg = bpScores.reduce((a, b) => a + b, 0) / bpScores.length;
  assert.ok(avg > 0, `expected some non-zero BP scores, got ${JSON.stringify(bpScores)}`);

  const pa = verdict.pas[0];
  assert.equal(pa.paId, "PA 1.1");
  assert.ok(["N", "P-", "P+", "L-", "L+", "F"].includes(pa.rating));
  assert.ok(["N", "P", "L", "F"].includes(pa.collapsed));

  // BP5 (traceability) should score well given the fixture explicitly
  // mentions bidirectional traceability + consistency evidence.
  const bp5 = verdict.bps.find((b) => b.id === "BP5");
  assert.ok(bp5.scorePercent >= 51, `BP5 should reach L- on fixture, got ${bp5.scorePercent}`);
});

test("e2e: targetLevel=2 evaluates PA 1.1 + PA 2.1 + PA 2.2", async () => {
  const artifacts = [await loadFixture("sys2_srs.md")];
  const harness = new Harness({ scorer: ruleScorer, targetLevel: 2 });
  const verdict = await harness.evaluateProcess({ processId: "SYS.2", artifacts });

  const paIds = verdict.pas.map((p) => p.paId);
  assert.ok(paIds.includes("PA 1.1"));
  assert.ok(paIds.includes("PA 2.1"));
  assert.ok(paIds.includes("PA 2.2"));
  assert.ok(!paIds.includes("PA 3.1"));
});

test("e2e: capability level reported as 0-3 integer", async () => {
  const artifacts = [await loadFixture("sys2_srs.md")];
  const harness = new Harness({ scorer: ruleScorer, targetLevel: 1 });
  const verdict = await harness.evaluateProcess({ processId: "SYS.2", artifacts });
  assert.ok(Number.isInteger(verdict.capabilityLevel));
  assert.ok(verdict.capabilityLevel >= 0 && verdict.capabilityLevel <= 3);
});
