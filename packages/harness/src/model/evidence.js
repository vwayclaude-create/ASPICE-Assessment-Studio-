/**
 * @typedef {Object} Artifact
 * @property {string} name         file name
 * @property {string} path         absolute or relative path
 * @property {string} mimeType
 * @property {string} text         extracted plain text
 * @property {number} sizeBytes
 * @property {string[]} [wpidCandidates]  inferred WP IDs (e.g. "17-00")
 * @property {string[]} [extractedIds]    internal IDs found inside (REQ-001, etc)
 *
 * @typedef {Object} ExtractedFact
 * @property {string} artifact
 * @property {string} kind          "requirement-id"|"trace-link"|"review-record"|...
 * @property {string} value
 * @property {string} [context]     surrounding text
 */

export {};
