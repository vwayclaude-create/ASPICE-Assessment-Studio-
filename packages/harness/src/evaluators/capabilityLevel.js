import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { collapsedGte } from "../model/rating.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const scale = JSON.parse(
  readFileSync(resolve(__dirname, "../../spec/canonical/ratingScale.json"), "utf8")
);

/**
 * Apply PAM §3.2 CL aggregation rules on the COLLAPSED 4-point scale.
 * 6-point display is retained in PAResult for reporting.
 *
 * @param {import("../model/verdict.js").PAResult[]} pas
 * @returns {{ level: 0|1|2|3, reason: string }}
 */
export function computeCapabilityLevel(pas) {
  const byPa = Object.fromEntries(pas.map((p) => [p.paId, p]));
  const order = ["CL3", "CL2", "CL1"];
  for (const clKey of order) {
    const spec = scale.capabilityLevels[clKey];
    const allMet = spec.required.every((req) => {
      const actual = byPa[req.pa]?.collapsed;
      return actual && collapsedGte(actual, req.minCollapsed);
    });
    if (allMet) {
      const level = Number(clKey.slice(2));
      return { level, reason: `All ${clKey} required PAs met` };
    }
  }
  return { level: 0, reason: "PA 1.1 did not reach Fully" };
}
