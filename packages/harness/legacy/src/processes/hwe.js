import { defineProcess } from "./_helpers.js";

export const HWE_1 = defineProcess({
  id: "HWE.1",
  name: "Hardware Requirements Analysis",
  category: "HWE",
  purpose: "Establish the requirements of the hardware elements of the system.",
  basePractices: [
    { id: "BP1", title: "Specify hardware requirements.", keywords: ["hardware requirement", "hwrs"] },
    { id: "BP2", title: "Structure hardware requirements.", keywords: ["structure", "category"] },
    { id: "BP3", title: "Analyze hardware requirements.", keywords: ["analysis"] },
    { id: "BP4", title: "Analyze the impact on the operating environment.",
      keywords: ["impact", "operating environment"] },
    { id: "BP5", title: "Develop verification criteria.", keywords: ["verification criteria"] },
    { id: "BP6", title: "Ensure consistency and bi-directional traceability.", keywords: ["traceability"] },
    { id: "BP7", title: "Communicate agreed hardware requirements.", keywords: ["communicate", "approval"] },
  ],
  outputWorkProducts: [
    { id: "17-12", aliases: ["hardware requirements", "hwrs"], keywords: ["hardware"] },
    { id: "17-08", aliases: ["interface"], keywords: ["interface"] },
    { id: "13-22", aliases: ["traceability"], keywords: ["traceability"] },
    { id: "13-19", aliases: ["review"], keywords: [] },
  ],
});

export const HWE_2 = defineProcess({
  id: "HWE.2",
  name: "Hardware Design",
  category: "HWE",
  purpose: "Establish a hardware design and identify which hardware requirements are allocated to which elements of the hardware.",
  basePractices: [
    { id: "BP1", title: "Develop hardware design.", keywords: ["hardware design", "schematic"] },
    { id: "BP2", title: "Allocate hardware requirements.", keywords: ["allocation"] },
    { id: "BP3", title: "Define interfaces of hardware elements.", keywords: ["interface"] },
    { id: "BP4", title: "Describe dynamic behavior.", keywords: ["dynamic behavior", "timing"] },
    { id: "BP5", title: "Define resource consumption objectives.", keywords: ["power", "thermal", "resource"] },
    { id: "BP6", title: "Evaluate alternative hardware designs.", keywords: ["alternative", "trade-off"] },
    { id: "BP7", title: "Ensure consistency and bi-directional traceability.", keywords: ["traceability"] },
    { id: "BP8", title: "Communicate agreed hardware design.", keywords: ["communicate", "approval"] },
  ],
  outputWorkProducts: [
    { id: "04-07", aliases: ["hardware design", "schematic", "pcb"], keywords: ["hardware design"] },
    { id: "17-00", aliases: ["hardware architecture"], keywords: ["architecture"] },
    { id: "17-08", aliases: ["interface"], keywords: ["interface"] },
    { id: "13-22", aliases: ["traceability"], keywords: ["traceability"] },
  ],
});

export const HWE_3 = defineProcess({
  id: "HWE.3",
  name: "Verification against Hardware Design",
  category: "HWE",
  purpose: "Verify that the integrated hardware is consistent with the hardware design.",
  basePractices: [
    { id: "BP1", title: "Develop verification strategy against hardware design.",
      keywords: ["verification strategy", "design verification"] },
    { id: "BP2", title: "Develop specification for hardware design verification.",
      keywords: ["test specification"] },
    { id: "BP3", title: "Select test cases.", keywords: ["test case"] },
    { id: "BP4", title: "Perform verification against hardware design.", keywords: ["verification"] },
    { id: "BP5", title: "Ensure consistency and bi-directional traceability.", keywords: ["traceability"] },
    { id: "BP6", title: "Summarize and communicate results.", keywords: ["report", "result"] },
  ],
  outputWorkProducts: [
    { id: "08-50", aliases: ["test spec"], keywords: ["hardware", "test"] },
    { id: "13-25", aliases: ["verification results"], keywords: ["verification"] },
    { id: "13-22", aliases: ["traceability"], keywords: ["traceability"] },
  ],
});

export const HWE_4 = defineProcess({
  id: "HWE.4",
  name: "Verification against Hardware Requirements",
  category: "HWE",
  purpose: "Verify that the hardware meets the hardware requirements.",
  basePractices: [
    { id: "BP1", title: "Develop verification strategy against hardware requirements.",
      keywords: ["verification strategy"] },
    { id: "BP2", title: "Develop specification for hardware verification.", keywords: ["test specification"] },
    { id: "BP3", title: "Select test cases.", keywords: ["test case"] },
    { id: "BP4", title: "Verify hardware against requirements.", keywords: ["verification"] },
    { id: "BP5", title: "Ensure consistency and bi-directional traceability.", keywords: ["traceability"] },
    { id: "BP6", title: "Summarize and communicate results.", keywords: ["report", "result"] },
  ],
  outputWorkProducts: [
    { id: "08-50", aliases: ["hardware test spec"], keywords: ["hardware", "test"] },
    { id: "13-25", aliases: ["verification results"], keywords: ["verification"] },
    { id: "13-22", aliases: ["traceability"], keywords: ["traceability"] },
  ],
});

export default [HWE_1, HWE_2, HWE_3, HWE_4];
