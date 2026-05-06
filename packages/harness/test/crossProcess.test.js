import { test } from "node:test";
import assert from "node:assert/strict";
import { buildProcessGraph } from "../src/crossProcess/traceGraph.js";
import { checkConsistency } from "../src/crossProcess/consistency.js";
import { computeCoverage } from "../src/crossProcess/coverage.js";

test("traceGraph: inferred edges from output/input WP overlap", () => {
  const procs = [
    {
      id: "SYS.2",
      name: "System Requirements Analysis",
      category: "SYS",
      outputWorkProducts: [{ id: "17-00", name: "Requirement" }],
      inputWorkProducts: [],
    },
    {
      id: "SWE.1",
      name: "Software Requirements Analysis",
      category: "SWE",
      outputWorkProducts: [{ id: "17-11", name: "Software Requirement" }],
      inputWorkProducts: [{ id: "17-00", name: "Requirement" }],
    },
  ];
  const g = buildProcessGraph(procs);
  assert.equal(g.nodes.length, 2);
  const edge = g.edges.find((e) => e.from === "SYS.2" && e.to === "SWE.1");
  assert.ok(edge, "SYS.2 → SWE.1 edge via 17-00");
  assert.deepEqual(edge.via, ["17-00"]);
});

test("consistency: detect status drift across artifacts", () => {
  const artifacts = [
    {
      name: "srs.docx",
      text: "REQ-001 is approved per the review meeting minutes.",
      extractedIds: ["REQ-001"],
    },
    {
      name: "working.md",
      text: "REQ-001 is currently in draft, needs rework.",
      extractedIds: ["REQ-001"],
    },
  ];
  const findings = checkConsistency(artifacts);
  const drift = findings.find((f) => f.kind === "status-drift");
  assert.ok(drift, "status drift on REQ-001 should be flagged");
});

test("coverage: requirement → test linking", () => {
  const artifacts = [
    {
      name: "reqs.xlsx",
      wpidCandidates: ["17-00"],
      extractedIds: ["REQ-001", "REQ-002"],
      text: "",
    },
    {
      name: "tests.xlsx",
      wpidCandidates: ["08-60"],
      extractedIds: ["TC-001"],
      text: "TC-001 verifies REQ-001",
    },
  ];
  const result = computeCoverage(artifacts);
  assert.equal(result.totalRequirements, 2);
  assert.equal(result.coveredCount, 1);
  assert.equal(result.coveragePercent, 50);
  assert.deepEqual(result.uncovered, ["REQ-002"]);
});
