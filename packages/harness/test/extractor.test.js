import { test } from "node:test";
import assert from "node:assert/strict";
import {
  loadProcesses,
  loadProcess,
  loadProcessAttributes,
  loadWorkProducts,
  ratingScale,
} from "../spec/canonical/index.js";

test("canonical: 32 processes extracted from PAM v4.0", () => {
  const procs = loadProcesses();
  assert.equal(procs.length, 32, `expected 32 processes, got ${procs.length}`);

  const ids = procs.map((p) => p.id).sort();
  const expected = [
    "ACQ.4", "SPL.2",
    "SYS.1", "SYS.2", "SYS.3", "SYS.4", "SYS.5",
    "SWE.1", "SWE.2", "SWE.3", "SWE.4", "SWE.5", "SWE.6",
    "MLE.1", "MLE.2", "MLE.3", "MLE.4",
    "HWE.1", "HWE.2", "HWE.3", "HWE.4",
    "VAL.1",
    "SUP.1", "SUP.8", "SUP.9", "SUP.10", "SUP.11",
    "MAN.3", "MAN.5", "MAN.6",
    "PIM.3", "REU.2",
  ].sort();
  assert.deepEqual(ids, expected);
});

test("canonical: SYS.2 BPs, outcomes, output WPs are correct", () => {
  const p = loadProcess("SYS.2");
  assert.ok(p, "SYS.2 should load");
  assert.equal(p.name, "System Requirements Analysis");
  assert.equal(p.category, "SYS");
  assert.equal(p.pamSection, "4.3.2");
  assert.match(p.purpose, /structured and analyzed set of system requirements/);
  assert.equal(p.outcomes.length, 6);
  assert.equal(p.basePractices.length, 6);
  assert.deepEqual(p.basePractices.map((b) => b.id), ["BP1", "BP2", "BP3", "BP4", "BP5", "BP6"]);
  const wpIds = p.outputWorkProducts.map((w) => w.id).sort();
  assert.deepEqual(wpIds, ["13-51", "13-52", "15-51", "17-00", "17-54"]);
  assert.ok(p.traceBPs.includes("BP5"), "BP5 (traceability) should be flagged");
});

test("canonical: SWE.3 structure", () => {
  const p = loadProcess("SWE.3");
  assert.ok(p);
  assert.equal(p.category, "SWE");
  assert.ok(p.basePractices.length >= 4);
  assert.ok(p.outputWorkProducts.length >= 3);
});

test("canonical: process attributes PA 1.1 ~ PA 3.2", () => {
  const pas = loadProcessAttributes();
  const ids = Object.keys(pas).sort();
  assert.deepEqual(ids, ["PA 1.1", "PA 2.1", "PA 2.2", "PA 3.1", "PA 3.2"]);
  assert.equal(pas["PA 1.1"].level, 1);
  assert.equal(pas["PA 2.1"].level, 2);
  assert.equal(pas["PA 3.2"].level, 3);
  assert.equal(pas["PA 1.1"].genericPractices.length, 1);
  assert.equal(pas["PA 2.1"].genericPractices.length, 6);
  assert.equal(pas["PA 2.2"].genericPractices.length, 4);
});

test("canonical: work product catalog populated", () => {
  const wps = loadWorkProducts();
  const count = Object.keys(wps).length;
  assert.ok(count >= 50, `expected 50+ WPs, got ${count}`);
  // Common WPs we reference in the harness logic
  assert.ok(wps["17-00"], "17-00 Requirement catalogued");
  assert.ok(wps["13-51"], "13-51 Consistency Evidence catalogued");
});

test("ratingScale: 6-point extended scale with CL aggregation", () => {
  assert.equal(ratingScale.scale, "extended-6-point");
  const codes = ratingScale.levels.map((l) => l.code);
  assert.deepEqual(codes, ["N", "P-", "P+", "L-", "L+", "F"]);

  const findByCode = (c) => ratingScale.levels.find((l) => l.code === c);
  assert.deepEqual(
    [findByCode("N").min, findByCode("N").max], [0, 15]
  );
  assert.deepEqual(
    [findByCode("P-").min, findByCode("P-").max], [16, 32]
  );
  assert.deepEqual(
    [findByCode("L+").min, findByCode("L+").max], [68, 85]
  );
  assert.deepEqual(
    [findByCode("F").min, findByCode("F").max], [86, 100]
  );

  assert.equal(findByCode("P-").collapseTo, "P");
  assert.equal(findByCode("L+").collapseTo, "L");

  assert.deepEqual(
    ratingScale.capabilityLevels.CL1.required.map((r) => r.pa),
    ["PA 1.1"]
  );
  assert.equal(ratingScale.capabilityLevels.CL3.required.length, 5);
});
