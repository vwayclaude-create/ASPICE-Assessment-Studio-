import { test } from "node:test";
import assert from "node:assert/strict";
import { Harness, makeArtifact, listProcessIds } from "../src/index.js";

test("harness registers all v4.0 processes", () => {
  const h = new Harness({ engine: "rule" });
  const ids = h.listProcesses().map((p) => p.id).sort();
  const expected = [
    "ACQ.4",
    "SPL.1", "SPL.2",
    "SYS.1", "SYS.2", "SYS.3", "SYS.4", "SYS.5",
    "SWE.1", "SWE.2", "SWE.3", "SWE.4", "SWE.5", "SWE.6",
    "HWE.1", "HWE.2", "HWE.3", "HWE.4",
    "VAL.1",
    "MAN.3", "MAN.5", "MAN.6",
    "REU.2",
    "SUP.1", "SUP.8", "SUP.9", "SUP.10",
  ].sort();
  assert.deepEqual(ids, expected);
  assert.equal(listProcessIds().length, 27);
});

test("rule engine scores N when no artifacts provided", async () => {
  const h = new Harness({ engine: "rule" });
  const r = await h.evaluate({ processId: "SWE.2", artifacts: [] });
  assert.equal(r.processId, "SWE.2");
  assert.equal(r.rating, "N");
  assert.equal(r.achieved, false);
  assert.ok(r.gaps.length > 0, "expected gaps when nothing is submitted");
});

test("rule engine rates L or higher when all BP keywords and WPs match", async () => {
  // Build a synthetic artifact that satisfies SWE.2 keywords and names the WPs.
  const fatText = [
    "This is the Software Architectural Design (SWAD).",
    "Section 1 architecture component hierarchy.",
    "Section 2 allocation of software requirements.",
    "Section 3 interface definitions between components.",
    "Section 4 dynamic behavior (sequence diagrams).",
    "Section 5 timing and memory resource objectives.",
    "Section 6 alternative architecture trade-off analysis.",
    "Section 7 traceability to software requirements.",
    "Section 8 review approval and communicate to team.",
  ].join("\n");

  const artifacts = [
    makeArtifact({ name: "SWAD_v1.2.docx", text: fatText }),
    makeArtifact({ name: "SWE2_TraceabilityMatrix.xlsx", text: "traceability matrix for software architecture" }),
    makeArtifact({ name: "SWE2_ReviewRecord.md", text: "review record for architecture approval" }),
    makeArtifact({ name: "SWE2_Interface.md", text: "interface definitions" }),
  ];

  const h = new Harness({ engine: "rule" });
  const r = await h.evaluate({ processId: "SWE.2", artifacts });
  assert.ok(["L", "F"].includes(r.rating), `expected L or F, got ${r.rating} (score ${r.score})`);
  assert.equal(r.achieved, true);
});

test("evaluateAll returns one report per registered process", async () => {
  const h = new Harness({ engine: "rule" });
  const bundle = await h.evaluateAll({ artifacts: [] });
  assert.equal(bundle.processCount, 27);
  assert.equal(bundle.reports.length, 27);
  for (const r of bundle.reports) {
    assert.ok(r.processId);
    assert.ok(["N", "P", "L", "F"].includes(r.rating));
  }
});

test("hybrid engine falls back to rules when LLM is unavailable", async () => {
  // No ANTHROPIC_API_KEY in env → LLM engine abstains, hybrid should trust rules.
  const savedKey = process.env.ANTHROPIC_API_KEY;
  delete process.env.ANTHROPIC_API_KEY;
  try {
    const h = new Harness({ engine: "hybrid" });
    const artifacts = [makeArtifact({ name: "nothing.md", text: "hello" })];
    const r = await h.evaluate({ processId: "SYS.2", artifacts });
    assert.ok(["N", "P"].includes(r.rating), `expected low rating, got ${r.rating}`);
  } finally {
    if (savedKey) process.env.ANTHROPIC_API_KEY = savedKey;
  }
});

test("unknown process id throws", async () => {
  const h = new Harness({ engine: "rule" });
  await assert.rejects(
    () => h.evaluate({ processId: "BOGUS.9", artifacts: [] }),
    /Unknown process/,
  );
});
