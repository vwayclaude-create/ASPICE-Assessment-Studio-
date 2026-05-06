/**
 * @typedef {Object} TraceLink
 * @property {string} fromId        internal id (e.g. REQ-001)
 * @property {string} toId
 * @property {string} fromProcess   process that owns the source WP
 * @property {string} toProcess
 * @property {string} fromWp        WP id e.g. "17-00"
 * @property {string} toWp
 * @property {"forward"|"backward"|"bidirectional"} direction
 *
 * @typedef {Object} TraceMatrix
 * @property {string} sourceProcess
 * @property {string} targetProcess
 * @property {string[]} sourceIds
 * @property {string[]} targetIds
 * @property {TraceLink[]} links
 * @property {number} coveragePercent
 * @property {string[]} orphansSource  source ids with no outgoing link
 * @property {string[]} orphansTarget  target ids with no incoming link
 *
 * @typedef {Object} ConsistencyFinding
 * @property {"id-mismatch"|"status-drift"|"term-divergence"|"missing-approval"} kind
 * @property {string} description
 * @property {string[]} relatedArtifacts
 * @property {"info"|"warning"|"error"} severity
 */

export {};
