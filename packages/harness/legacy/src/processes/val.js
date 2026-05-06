import { defineProcess } from "./_helpers.js";

export const VAL_1 = defineProcess({
  id: "VAL.1",
  name: "Validation",
  category: "VAL",
  purpose: "Provide evidence that the product satisfies stakeholder needs in its intended operating environment.",
  basePractices: [
    { id: "BP1", title: "Develop validation strategy.", keywords: ["validation strategy"] },
    { id: "BP2", title: "Define validation measures.", keywords: ["validation measure", "metric"] },
    { id: "BP3", title: "Develop validation plan.", keywords: ["validation plan"] },
    { id: "BP4", title: "Perform validation.", keywords: ["validation", "field test"] },
    { id: "BP5", title: "Ensure consistency and bi-directional traceability.", keywords: ["traceability"] },
    { id: "BP6", title: "Summarize and communicate validation results.", keywords: ["report", "validation result"] },
  ],
  outputWorkProducts: [
    { id: "19-03", aliases: ["validation plan"], keywords: ["validation"] },
    { id: "18-50", aliases: ["validation measures"], keywords: ["validation"] },
    { id: "13-50", aliases: ["validation results"], keywords: ["validation result"] },
    { id: "13-22", aliases: ["traceability"], keywords: ["traceability"] },
  ],
});

export default [VAL_1];
