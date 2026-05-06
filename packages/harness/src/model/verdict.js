/**
 * @typedef {import("./rating.js").Rating} Rating
 * @typedef {import("./rating.js").CollapsedRating} CollapsedRating
 *
 * @typedef {Object} Evidence
 * @property {string} artifactName
 * @property {string} quote
 * @property {string} [location]
 *
 * @typedef {Object} BPResult
 * @property {string} id            e.g. "BP1"
 * @property {string} title
 * @property {Rating} rating
 * @property {number} scorePercent
 * @property {Evidence[]} evidence
 * @property {string[]} gaps
 * @property {string} pamCitation   PAM section ref
 *
 * @typedef {Object} GPResult
 * @property {string} id            e.g. "GP 2.1.1"
 * @property {string} title
 * @property {Rating} rating
 * @property {number} scorePercent
 * @property {Evidence[]} evidence
 * @property {string[]} gaps
 *
 * @typedef {Object} PAResult
 * @property {string} paId          e.g. "PA 1.1"
 * @property {number} level         1|2|3
 * @property {Rating} rating        6-point display
 * @property {CollapsedRating} collapsed  for CL aggregation
 * @property {GPResult[]} gps
 *
 * @typedef {Object} ProcessVerdict
 * @property {string} processId
 * @property {string} processName
 * @property {BPResult[]} bps
 * @property {PAResult[]} pas
 * @property {CollapsedRating} capabilityLevelAchieved  "N"=CL0, "F" at PA1.1 → CL1, etc
 * @property {0|1|2|3} capabilityLevel
 * @property {Object} meta
 */

export {};
