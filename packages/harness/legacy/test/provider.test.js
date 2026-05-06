import { test } from "node:test";
import assert from "node:assert/strict";
import { Harness, makeArtifact, HarnessAgent } from "../src/index.js";
import { detectProviderName, resolveProvider } from "../src/llm/provider.js";

/**
 * Mock OpenAI-shaped client. Scripts a sequence of responses where each step is
 *   { toolCalls: [{id, name, arguments}], content?: string, finish?: string }
 * matching OpenAI's chat.completions response shape.
 */
function scriptedOpenAIClient(script) {
  let i = 0;
  return {
    chat: {
      completions: {
        create: async function ({ messages, tools }) {
          const step = script[i++];
          if (!step) throw new Error("Mock OpenAI client exhausted");
          const tool_calls = (step.toolCalls ?? []).map((tc) => ({
            id: tc.id,
            type: "function",
            function: { name: tc.name, arguments: JSON.stringify(tc.input ?? {}) },
          }));
          return {
            choices: [{
              finish_reason: step.finish ?? (tool_calls.length ? "tool_calls" : "stop"),
              message: {
                role: "assistant",
                content: step.content ?? null,
                tool_calls: tool_calls.length ? tool_calls : undefined,
              },
            }],
            usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
          };
        },
      },
    },
  };
}

test("detectProviderName picks anthropic from sk-ant- key", () => {
  assert.equal(detectProviderName({ apiKey: "sk-ant-abc" }), "anthropic");
});

test("detectProviderName picks openai from sk- key", () => {
  assert.equal(detectProviderName({ apiKey: "sk-proj-xyz" }), "openai");
});

test("detectProviderName honors ASPICE_LLM_PROVIDER env", () => {
  const saved = process.env.ASPICE_LLM_PROVIDER;
  process.env.ASPICE_LLM_PROVIDER = "openai";
  try {
    assert.equal(detectProviderName({}), "openai");
  } finally {
    if (saved) process.env.ASPICE_LLM_PROVIDER = saved;
    else delete process.env.ASPICE_LLM_PROVIDER;
  }
});

test("detectProviderName picks anthropic from messages.create client shape", () => {
  const client = { messages: { create: async () => ({}) } };
  assert.equal(detectProviderName({ client }), "anthropic");
});

test("detectProviderName picks openai from chat.completions.create client shape", () => {
  const client = { chat: { completions: { create: async () => ({}) } } };
  assert.equal(detectProviderName({ client }), "openai");
});

test("resolveProvider returns OpenAIProvider for an openai-shaped client", async () => {
  const client = scriptedOpenAIClient([]);
  const p = await resolveProvider({ client });
  assert.equal(p.name, "openai");
});

test("agent loop completes against an OpenAI-shaped client", async () => {
  const artifacts = [
    makeArtifact({ name: "SWAD.docx", text: "Software Architectural Design. Components and interfaces." }),
  ];

  const client = scriptedOpenAIClient([
    {
      toolCalls: [
        { id: "call_1", name: "list_artifacts", input: {} },
        { id: "call_2", name: "get_process_spec", input: { process_id: "SWE.2" } },
      ],
    },
    {
      toolCalls: [{ id: "call_3", name: "submit_cl1_verdict", input: {
        basePractices: [
          { id: "BP1", score: 0.9, evidence: ["SWAD components"], gaps: [] },
          { id: "BP2", score: 0.8, evidence: [], gaps: [] },
          { id: "BP3", score: 0.85, evidence: ["SWAD interfaces"], gaps: [] },
          { id: "BP4", score: 0.7, evidence: [], gaps: [] },
          { id: "BP5", score: 0.7, evidence: [], gaps: [] },
          { id: "BP6", score: 0.7, evidence: [], gaps: [] },
          { id: "BP7", score: 0.8, evidence: [], gaps: [] },
          { id: "BP8", score: 0.85, evidence: [], gaps: [] },
        ],
        workProducts: [
          { id: "04-04", score: 1.0, found: true, evidence: ["SWAD.docx"], gaps: [] },
          { id: "17-08", score: 0.8, found: true, evidence: [], gaps: [] },
          { id: "13-22", score: 0.6, found: true, evidence: [], gaps: [] },
          { id: "13-19", score: 0.6, found: true, evidence: [], gaps: [] },
        ],
        notes: ["Evaluated via OpenAI provider"],
      }}],
    },
  ]);

  const harness = new Harness({ engine: "rule" });
  const agent = new HarnessAgent({ harness, provider: await resolveProvider({ client }) });
  const raw = await agent.evaluate({ plugin: harness.getProcess("SWE.2"), artifacts });

  assert.equal(raw.basePractices.length, 8);
  assert.equal(raw.workProducts.length, 4);
  assert.ok(raw.trace.find((t) => t.tool === "submit_cl1_verdict"));
  assert.equal(raw.notes[0], "Evaluated via OpenAI provider");
});

test("agent abstains when openai-shaped client's call throws", async () => {
  const client = {
    chat: { completions: {
      create: async () => { throw new Error("rate limited"); },
    }},
  };
  const harness = new Harness({ engine: "rule" });
  const agent = new HarnessAgent({ harness, provider: await resolveProvider({ client }) });
  const raw = await agent.evaluate({ plugin: harness.getProcess("SWE.1"), artifacts: [] });
  assert.ok(raw.notes[0].includes("rate limited"));
  for (const bp of raw.basePractices) assert.equal(bp.note, "abstain");
});

test("explicit provider override wins over client shape", () => {
  const client = { chat: { completions: { create: async () => ({}) } } }; // looks like openai
  // But caller explicitly asks for anthropic resolution — should honor it.
  assert.equal(detectProviderName({ client, provider: "anthropic" }), "anthropic");
});
