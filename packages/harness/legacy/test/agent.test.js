import { test } from "node:test";
import assert from "node:assert/strict";
import { Harness, makeArtifact, HarnessAgent } from "../src/index.js";
import { createEngine } from "../src/engine/index.js";

/**
 * Scripted Anthropic client.
 * Each `script` entry is either:
 *   - { toolUses: [{id,name,input}, ...], text?: string }  → a scripted response
 *   - a function that receives the in-progress `messages` array and returns the above
 */
function scriptedClient(script) {
  let i = 0;
  return {
    calls: [],
    messages: {
      create: async function ({ messages, ...rest }) {
        const step = typeof script[i] === "function" ? script[i]({ messages, rest }) : script[i];
        i += 1;
        if (!step) throw new Error("Mock client exhausted");
        const content = [];
        if (step.text) content.push({ type: "text", text: step.text });
        for (const tu of step.toolUses ?? []) {
          content.push({ type: "tool_use", id: tu.id, name: tu.name, input: tu.input });
        }
        this.calls = this.calls ?? [];
        return { content, stop_reason: step.toolUses?.length ? "tool_use" : "end_turn" };
      },
    },
  };
}

test("agent completes a full tool-use loop and produces a verdict", async () => {
  const artifacts = [
    makeArtifact({ name: "SWAD_v1.2.docx", text:
      "Software Architectural Design.\n" +
      "Architecture: component hierarchy.\n" +
      "Allocation of software requirements table.\n" +
      "Interface definitions between components.\n" +
      "Dynamic behavior sequence diagrams.\n" +
      "Timing and memory resource objectives.\n" +
      "Alternative architecture trade-off analysis.\n" +
      "Traceability matrix.\n" +
      "Review approval communicated."
    }),
    makeArtifact({ name: "SWE2_TraceabilityMatrix.xlsx", text: "traceability matrix" }),
  ];

  const client = scriptedClient([
    // Turn 0: inspect inventory + fetch spec
    { toolUses: [
      { id: "t1", name: "list_artifacts", input: {} },
      { id: "t2", name: "get_process_spec", input: { process_id: "SWE.2" } },
    ]},
    // Turn 1: quick rule baseline
    { toolUses: [{ id: "t3", name: "run_rule_score", input: { process_id: "SWE.2" } }] },
    // Turn 2: submit final verdict
    { toolUses: [{ id: "t4", name: "submit_cl1_verdict", input: {
      basePractices: [
        { id: "BP1", score: 0.9, evidence: ["SWAD §1 component hierarchy"], gaps: [] },
        { id: "BP2", score: 0.8, evidence: ["SWAD §2 allocation table"], gaps: [] },
        { id: "BP3", score: 0.85, evidence: ["SWAD §3 interface defs"], gaps: [] },
        { id: "BP4", score: 0.8, evidence: ["SWAD §4 sequence diagrams"], gaps: [] },
        { id: "BP5", score: 0.8, evidence: ["SWAD §5 timing/memory"], gaps: [] },
        { id: "BP6", score: 0.7, evidence: ["SWAD §6 alternatives"], gaps: [] },
        { id: "BP7", score: 0.9, evidence: ["SWAD §7 + traceability xlsx"], gaps: [] },
        { id: "BP8", score: 0.85, evidence: ["SWAD §8 review + approval"], gaps: [] },
      ],
      workProducts: [
        { id: "04-04", score: 1.0, found: true, evidence: ["SWAD_v1.2.docx"], gaps: [] },
        { id: "17-08", score: 0.85, found: true, evidence: ["Interface defs in SWAD §3"], gaps: [] },
        { id: "13-22", score: 1.0, found: true, evidence: ["Traceability xlsx"], gaps: [] },
        { id: "13-19", score: 0.8, found: true, evidence: ["SWAD §8 review"], gaps: [] },
      ],
      notes: ["All BPs have direct textual evidence."],
    }}]},
  ]);

  const harness = new Harness({ engine: "rule" });
  const agent = new HarnessAgent({ harness, client, model: "test-model" });
  const raw = await agent.evaluate({ plugin: harness.getProcess("SWE.2"), artifacts });

  assert.equal(raw.basePractices.length, 8, "all 8 BPs present");
  assert.equal(raw.workProducts.length, 4, "all 4 WPs present");
  assert.ok(raw.trace.length >= 3, "trace captures multi-turn activity");
  assert.ok(raw.trace.find((t) => t.tool === "submit_cl1_verdict"), "submit_cl1_verdict is in trace");
  assert.equal(raw.basePractices.every((bp) => bp.score > 0.5), true);
});

test("agent backfills omitted BPs and WPs with zero scores", async () => {
  const artifacts = [makeArtifact({ name: "thin.md", text: "thin content" })];
  const client = scriptedClient([
    { toolUses: [{ id: "t1", name: "submit_cl1_verdict", input: {
      // Only submit 2 of 7 BPs and 1 of 4 WPs for SWE.1 — agent must backfill the rest.
      basePractices: [
        { id: "BP1", score: 0.4, evidence: [], gaps: ["weak evidence"] },
        { id: "BP7", score: 0.3, evidence: [], gaps: [] },
      ],
      workProducts: [
        { id: "17-11", score: 0.4, found: true, evidence: [], gaps: [] },
      ],
    }}]},
  ]);

  const harness = new Harness({ engine: "rule" });
  const agent = new HarnessAgent({ harness, client });
  const raw = await agent.evaluate({ plugin: harness.getProcess("SWE.1"), artifacts });

  assert.equal(raw.basePractices.length, 7, "all SWE.1 BPs represented");
  assert.equal(raw.workProducts.length, 4, "all SWE.1 WPs represented");
  const omittedBp = raw.basePractices.find((bp) => bp.id === "BP3");
  assert.equal(omittedBp.score, 0);
  assert.ok(omittedBp.gaps[0].includes("did not submit"));
});

test("agent abstains when no LLM provider is resolvable", async () => {
  const savedA = process.env.ANTHROPIC_API_KEY;
  const savedO = process.env.OPENAI_API_KEY;
  const savedP = process.env.ASPICE_LLM_PROVIDER;
  delete process.env.ANTHROPIC_API_KEY;
  delete process.env.OPENAI_API_KEY;
  delete process.env.ASPICE_LLM_PROVIDER;
  try {
    const harness = new Harness({ engine: "rule" });
    const engine = createEngine("agent");
    const raw = await engine.evaluate({
      plugin: harness.getProcess("SYS.2"),
      artifacts: [],
      harness,
    });
    assert.ok(raw.notes[0].includes("no LLM provider") || raw.notes[0].includes("unavailable"));
    for (const bp of raw.basePractices) assert.equal(bp.note, "abstain");
  } finally {
    if (savedA) process.env.ANTHROPIC_API_KEY = savedA;
    if (savedO) process.env.OPENAI_API_KEY = savedO;
    if (savedP) process.env.ASPICE_LLM_PROVIDER = savedP;
  }
});

test("agent hits max turns when it never submits", async () => {
  const artifacts = [makeArtifact({ name: "x.md", text: "" })];
  // Script always calls list_artifacts; never submits. Must terminate by maxTurns.
  const client = scriptedClient(
    Array.from({ length: 10 }, (_, k) => ({
      toolUses: [{ id: `t${k}`, name: "list_artifacts", input: {} }],
    })),
  );

  const harness = new Harness({ engine: "rule" });
  const agent = new HarnessAgent({ harness, client, maxTurns: 3 });
  const raw = await agent.evaluate({ plugin: harness.getProcess("VAL.1"), artifacts });
  assert.ok(raw.notes[0].includes("exceeded max turns"));
});

test("hybrid-agent fuses rule + agent scores", async () => {
  const artifacts = [
    makeArtifact({ name: "RiskRegister.xlsx", text:
      "Risk management strategy. Risk identification. Risk analysis likelihood and impact.\n" +
      "Mitigation plans. Risk review monitoring. Corrective actions log."
    }),
  ];

  const client = scriptedClient([
    { toolUses: [{ id: "t1", name: "submit_cl1_verdict", input: {
      basePractices: [
        { id: "BP1", score: 0.8, evidence: ["Risk strategy"], gaps: [] },
        { id: "BP2", score: 0.8, evidence: ["strategy"], gaps: [] },
        { id: "BP3", score: 0.9, evidence: ["Risk register"], gaps: [] },
        { id: "BP4", score: 0.8, evidence: ["likelihood/impact"], gaps: [] },
        { id: "BP5", score: 0.7, evidence: ["mitigation"], gaps: [] },
        { id: "BP6", score: 0.7, evidence: ["review"], gaps: [] },
        { id: "BP7", score: 0.7, evidence: ["corrective log"], gaps: [] },
      ],
      workProducts: [
        { id: "08-60", score: 0.7, found: true, evidence: [], gaps: [] },
        { id: "14-52", score: 1.0, found: true, evidence: ["RiskRegister.xlsx"], gaps: [] },
        { id: "14-02", score: 0.8, found: true, evidence: [], gaps: [] },
        { id: "15-01", score: 0.6, found: true, evidence: [], gaps: [] },
      ],
    }}]},
  ]);

  const harness = new Harness({ engine: "rule" });
  const hybridAgent = createEngine("hybrid-agent", { llm: { client } });
  const raw = await hybridAgent.evaluate({
    plugin: harness.getProcess("MAN.5"),
    artifacts,
    harness,
  });

  assert.equal(raw.basePractices.length, 7);
  assert.equal(raw.workProducts.length, 4);
  // Ensure some evidence/gaps were merged from both sides.
  const anyEvidence = raw.basePractices.some((bp) => bp.evidence.length > 0);
  assert.equal(anyEvidence, true);
});
