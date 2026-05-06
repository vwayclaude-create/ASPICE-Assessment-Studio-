import { defineProcess } from "./_helpers.js";

export const REU_2 = defineProcess({
  id: "REU.2",
  name: "Reuse Program Management",
  category: "REU",
  purpose: "Plan, establish, manage, control, and monitor an organization's reuse program and systematically exploit reuse opportunities.",
  basePractices: [
    { id: "BP1", title: "Define the organizational reuse strategy.", keywords: ["reuse strategy"] },
    { id: "BP2", title: "Identify domains for potential reuse.", keywords: ["reuse domain"] },
    { id: "BP3", title: "Assess domains for potential reuse.", keywords: ["domain assessment"] },
    { id: "BP4", title: "Assess reuse proposals.", keywords: ["reuse proposal", "evaluation"] },
    { id: "BP5", title: "Implement the reuse program.", keywords: ["reuse program"] },
    { id: "BP6", title: "Monitor reuse.", keywords: ["monitor", "reuse metric"] },
  ],
  outputWorkProducts: [
    { id: "04-02", aliases: ["domain architecture"], keywords: ["domain"] },
    { id: "15-05", aliases: ["evaluation report"], keywords: ["evaluation"] },
    { id: "15-16", aliases: ["improvement opportunity"], keywords: ["improvement"] },
  ],
});

export default [REU_2];
