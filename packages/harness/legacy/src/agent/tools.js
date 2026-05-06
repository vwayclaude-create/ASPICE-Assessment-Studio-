// Tool definitions for the harness agent.
//
// The agent gets a small, composable toolset instead of a single giant prompt.
// Each tool returns compact JSON so Claude can chain inspection → search →
// scoring without blowing the context window on raw artifact dumps.

import { RuleEngine } from "../engine/ruleEngine.js";
import { lookupWorkProduct } from "../model/workProducts.js";

export const TOOL_SCHEMAS = [
  {
    name: "list_artifacts",
    description: "List every artifact submitted for this evaluation. Returns name, extension, byte size, and text length. Call this first to see what evidence is available.",
    input_schema: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "read_artifact",
    description: "Read a slice of one artifact's text content. Use to inspect a section referenced by an earlier search. Returns at most max_chars characters starting at offset.",
    input_schema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Artifact name as returned by list_artifacts." },
        offset: { type: "integer", minimum: 0, description: "Starting character offset. Default 0." },
        max_chars: { type: "integer", minimum: 1, maximum: 8000, description: "Max characters to return. Default 4000." },
      },
      required: ["name"],
    },
  },
  {
    name: "search_artifacts",
    description: "Case-insensitive substring search across artifact names and text. Returns per-artifact match counts plus short excerpts (±120 chars around each hit, capped at 5 hits per artifact). Prefer this over reading whole files.",
    input_schema: {
      type: "object",
      properties: {
        keyword: { type: "string", description: "Substring to find." },
        max_excerpts_per_artifact: { type: "integer", minimum: 1, maximum: 10, description: "Default 5." },
      },
      required: ["keyword"],
    },
  },
  {
    name: "get_process_spec",
    description: "Fetch the full spec of an ASPICE process: purpose, every BP, every expected Output Work Product with resolved names. Use to confirm the target process before scoring.",
    input_schema: {
      type: "object",
      properties: {
        process_id: { type: "string", description: "e.g. 'SWE.2', 'SYS.3'" },
      },
      required: ["process_id"],
    },
  },
  {
    name: "run_rule_score",
    description: "Run the offline rule engine against the current artifacts for a given process. Returns per-BP and per-WP scores as a baseline. Use this to anchor your own judgment — you may override any score with your final verdict.",
    input_schema: {
      type: "object",
      properties: {
        process_id: { type: "string" },
      },
      required: ["process_id"],
    },
  },
  {
    name: "submit_cl1_verdict",
    description: "Submit the FINAL Capability Level 1 verdict for the target process. Calling this tool ENDS the evaluation — do not call any other tool afterwards. Every BP declared in the process spec and every expected Output Work Product MUST appear in the submission.",
    input_schema: {
      type: "object",
      properties: {
        basePractices: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string" },
              score: { type: "number", minimum: 0, maximum: 1 },
              evidence: { type: "array", items: { type: "string" } },
              gaps: { type: "array", items: { type: "string" } },
            },
            required: ["id", "score"],
          },
        },
        workProducts: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string" },
              score: { type: "number", minimum: 0, maximum: 1 },
              found: { type: "boolean" },
              evidence: { type: "array", items: { type: "string" } },
              gaps: { type: "array", items: { type: "string" } },
            },
            required: ["id", "score"],
          },
        },
        notes: { type: "array", items: { type: "string" } },
      },
      required: ["basePractices", "workProducts"],
    },
  },
];

/**
 * Build the per-session handler map. Each handler closes over the artifacts +
 * harness context so tool calls are pure functions of the agent's input.
 */
export function buildToolHandlers({ artifacts, harness, processId }) {
  const artifactByName = new Map(artifacts.map((a) => [a.name, a]));
  const ruleEngine = new RuleEngine();

  return {
    list_artifacts: () => ({
      artifacts: artifacts.map((a) => ({
        name: a.name,
        ext: a.meta?.ext ?? null,
        byteSize: a.buffer?.length ?? 0,
        textLength: a.text?.length ?? 0,
      })),
    }),

    read_artifact: ({ name, offset = 0, max_chars = 4000 }) => {
      const art = artifactByName.get(name);
      if (!art) return { error: `No artifact named "${name}". Call list_artifacts first.` };
      const text = art.text ?? "";
      const slice = text.slice(offset, offset + max_chars);
      return {
        name,
        offset,
        returned_chars: slice.length,
        total_chars: text.length,
        truncated: offset + slice.length < text.length,
        content: slice,
      };
    },

    search_artifacts: ({ keyword, max_excerpts_per_artifact = 5 }) => {
      const needle = String(keyword).toLowerCase();
      if (!needle) return { error: "keyword is required" };
      const hits = [];
      for (const a of artifacts) {
        const excerpts = [];
        const hay = (a.text ?? "");
        const hayLc = hay.toLowerCase();
        let idx = 0;
        let count = 0;
        while ((idx = hayLc.indexOf(needle, idx)) !== -1) {
          count += 1;
          if (excerpts.length < max_excerpts_per_artifact) {
            const start = Math.max(0, idx - 120);
            const end = Math.min(hay.length, idx + needle.length + 120);
            excerpts.push({ at: idx, text: hay.slice(start, end) });
          }
          idx += needle.length;
        }
        const nameMatch = (a.name ?? "").toLowerCase().includes(needle);
        if (count > 0 || nameMatch) {
          hits.push({ name: a.name, name_match: nameMatch, content_match_count: count, excerpts });
        }
      }
      return { keyword, matched_artifacts: hits.length, hits };
    },

    get_process_spec: ({ process_id }) => {
      let plugin;
      try { plugin = harness.getProcess(process_id); }
      catch (e) { return { error: e.message }; }
      return {
        id: plugin.id,
        name: plugin.name,
        category: plugin.category,
        purpose: plugin.purpose,
        basePractices: plugin.basePractices.map((bp) => ({
          id: bp.id, title: bp.title, keywords: bp.keywords,
        })),
        outputWorkProducts: plugin.outputWorkProducts.map((wp) => {
          const meta = lookupWorkProduct(wp.id);
          return { id: wp.id, name: meta.name, category: meta.category, aliases: wp.aliases, keywords: wp.keywords };
        }),
      };
    },

    run_rule_score: async ({ process_id }) => {
      let plugin;
      try { plugin = harness.getProcess(process_id); }
      catch (e) { return { error: e.message }; }
      const res = await ruleEngine.evaluate({ plugin, artifacts });
      return res;
    },

    // submit_cl1_verdict is terminal — it is handled directly by the agent loop,
    // not by this map. Listed here for completeness / introspection.
    submit_cl1_verdict: (input) => ({ terminal: true, input }),
  };
}

export const TERMINAL_TOOL = "submit_cl1_verdict";
