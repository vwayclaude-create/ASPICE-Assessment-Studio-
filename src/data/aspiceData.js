// Single source of truth: harness canonical bundle (spec/canonical/all.json).
// Shapes each process to the UI-expected interface so existing components
// (ProcessCard, VerdictCard, analysisPrompt for fallback) keep working.
//
// UI shape per process:
//   { id, name, category, purpose, outcomes: [string], bps: [{id,title,description}], guideline }

import { processes as HARNESS_PROCS } from "aspice-harness/spec/all";

const shape = (p) => ({
  id: p.id,
  name: p.name,
  category: p.category,
  purpose: p.purpose,
  pamSection: p.pamSection,
  outcomes: (p.outcomes || []).map((o) => o.text),
  bps: (p.basePractices || []).map((b) => ({
    id: b.id,
    title: b.title,
    description: b.description ?? "",
    pamCitation: b.pamCitation,
  })),
  outputWorkProducts: p.outputWorkProducts || [],
  inputWorkProducts: p.inputWorkProducts || [],
  traceBPs: p.traceBPs || [],
  // Guideline text is authored per-process in the harness prompt pipeline;
  // kept here as an empty string for legacy prompt-builder compatibility.
  guideline: "",
});

export const ASPICE_DATA = Object.fromEntries(
  HARNESS_PROCS.map((p) => [p.id, shape(p)])
);

export const PROCESS_IDS = HARNESS_PROCS.map((p) => p.id);

export const PROCESS_CATEGORIES = [
  ...new Set(HARNESS_PROCS.map((p) => p.category)),
];
