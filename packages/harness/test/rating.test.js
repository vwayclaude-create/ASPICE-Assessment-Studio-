import { test } from "node:test";
import assert from "node:assert/strict";
import {
  percentToRating,
  collapse,
  collapsedGte,
  RATING_CODES,
} from "../src/model/rating.js";
import { computeCapabilityLevel } from "../src/evaluators/capabilityLevel.js";

test("rating: percent → 6-point rating boundaries", () => {
  assert.equal(percentToRating(0), "N");
  assert.equal(percentToRating(15), "N");
  assert.equal(percentToRating(16), "P-");
  assert.equal(percentToRating(32), "P-");
  assert.equal(percentToRating(33), "P+");
  assert.equal(percentToRating(50), "P+");
  assert.equal(percentToRating(51), "L-");
  assert.equal(percentToRating(67), "L-");
  assert.equal(percentToRating(68), "L+");
  assert.equal(percentToRating(85), "L+");
  assert.equal(percentToRating(86), "F");
  assert.equal(percentToRating(100), "F");
});

test("rating: collapse to 4-point scale", () => {
  assert.equal(collapse("N"), "N");
  assert.equal(collapse("P-"), "P");
  assert.equal(collapse("P+"), "P");
  assert.equal(collapse("L-"), "L");
  assert.equal(collapse("L+"), "L");
  assert.equal(collapse("F"), "F");
});

test("rating: all 6 codes present", () => {
  assert.deepEqual(RATING_CODES, ["N", "P-", "P+", "L-", "L+", "F"]);
});

test("CL: PA 1.1=F → CL1", () => {
  const { level } = computeCapabilityLevel([
    { paId: "PA 1.1", level: 1, rating: "F", collapsed: "F", gps: [] },
  ]);
  assert.equal(level, 1);
});

test("CL: PA 1.1=F, PA 2.1=L+, PA 2.2=L- → CL2 (both collapse to L)", () => {
  const { level } = computeCapabilityLevel([
    { paId: "PA 1.1", level: 1, rating: "F", collapsed: "F", gps: [] },
    { paId: "PA 2.1", level: 2, rating: "L+", collapsed: "L", gps: [] },
    { paId: "PA 2.2", level: 2, rating: "L-", collapsed: "L", gps: [] },
  ]);
  assert.equal(level, 2);
});

test("CL: PA 2.2 at P+ → falls back to CL1", () => {
  const { level } = computeCapabilityLevel([
    { paId: "PA 1.1", level: 1, rating: "F", collapsed: "F", gps: [] },
    { paId: "PA 2.1", level: 2, rating: "L+", collapsed: "L", gps: [] },
    { paId: "PA 2.2", level: 2, rating: "P+", collapsed: "P", gps: [] },
  ]);
  assert.equal(level, 1);
});

test("CL3 requires PA 2.x at F and PA 3.x at L+", () => {
  const { level } = computeCapabilityLevel([
    { paId: "PA 1.1", level: 1, rating: "F", collapsed: "F", gps: [] },
    { paId: "PA 2.1", level: 2, rating: "F", collapsed: "F", gps: [] },
    { paId: "PA 2.2", level: 2, rating: "F", collapsed: "F", gps: [] },
    { paId: "PA 3.1", level: 3, rating: "L+", collapsed: "L", gps: [] },
    { paId: "PA 3.2", level: 3, rating: "L-", collapsed: "L", gps: [] },
  ]);
  assert.equal(level, 3);
});

test("collapsedGte respects 4-point ordinal", () => {
  assert.ok(collapsedGte("F", "L"));
  assert.ok(collapsedGte("L", "L"));
  assert.ok(!collapsedGte("P", "L"));
  assert.ok(collapsedGte("P", "N"));
});
