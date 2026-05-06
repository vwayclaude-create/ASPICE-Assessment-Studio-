import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const scale = JSON.parse(
  readFileSync(resolve(__dirname, "../../spec/canonical/ratingScale.json"), "utf8")
);

/**
 * @typedef {"N"|"P-"|"P+"|"L-"|"L+"|"F"} Rating
 * @typedef {"N"|"P"|"L"|"F"} CollapsedRating
 */

const byCode = Object.fromEntries(scale.levels.map((l) => [l.code, l]));

export const RATING_CODES = scale.levels.map((l) => l.code);

/** @param {number} percent @returns {Rating} */
export function percentToRating(percent) {
  const p = Math.max(0, Math.min(100, Math.round(percent)));
  for (const lvl of scale.levels) {
    if (p >= lvl.min && p <= lvl.max) return /** @type {Rating} */ (lvl.code);
  }
  return "N";
}

/** @param {Rating} r @returns {CollapsedRating} */
export function collapse(r) {
  return /** @type {CollapsedRating} */ (byCode[r].collapseTo);
}

/** @param {Rating} r */
export function ordinal(r) {
  return byCode[r].ordinal;
}

/** @param {CollapsedRating} a @param {CollapsedRating} b Returns true if a >= b on 4-point ordinal */
export function collapsedGte(a, b) {
  return scale.collapsedScale[a].ordinal >= scale.collapsedScale[b].ordinal;
}

export { scale as ratingScale };
