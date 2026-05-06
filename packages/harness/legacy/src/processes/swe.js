import { defineProcess } from "./_helpers.js";

export const SWE_1 = defineProcess({
  id: "SWE.1",
  name: "Software Requirements Analysis",
  category: "SWE",
  purpose: "Establish the requirements of the software elements of the system.",
  basePractices: [
    { id: "BP1", title: "Specify software requirements.", keywords: ["software requirement", "srs"] },
    { id: "BP2", title: "Structure software requirements.", keywords: ["structure", "category"] },
    { id: "BP3", title: "Analyze software requirements.", keywords: ["analysis"] },
    { id: "BP4", title: "Analyze the impact on the operating environment.",
      keywords: ["impact", "operating environment"] },
    { id: "BP5", title: "Develop verification criteria.", keywords: ["verification criteria"] },
    { id: "BP6", title: "Ensure consistency and bi-directional traceability.", keywords: ["traceability"] },
    { id: "BP7", title: "Communicate agreed software requirements.", keywords: ["approval", "communicate"] },
  ],
  outputWorkProducts: [
    { id: "17-11", aliases: ["software requirements", "swrs"], keywords: ["software requirement"] },
    { id: "17-08", aliases: ["interface requirement"], keywords: ["interface"] },
    { id: "13-22", aliases: ["traceability matrix"], keywords: ["traceability"] },
    { id: "13-19", aliases: ["review"], keywords: [] },
  ],
});

export const SWE_2 = defineProcess({
  id: "SWE.2",
  name: "Software Architectural Design",
  category: "SWE",
  purpose: "Establish a software architectural design and identify which software requirements are allocated to which elements of the software.",
  basePractices: [
    { id: "BP1", title: "Develop software architectural design.", keywords: ["architecture", "component"] },
    { id: "BP2", title: "Allocate software requirements.", keywords: ["allocation"] },
    { id: "BP3", title: "Define interfaces of software elements.", keywords: ["interface"] },
    { id: "BP4", title: "Describe dynamic behavior.", keywords: ["dynamic behavior", "sequence"] },
    { id: "BP5", title: "Define resource consumption objectives.", keywords: ["resource", "timing", "memory"] },
    { id: "BP6", title: "Evaluate alternative software architectures.", keywords: ["alternative", "trade-off"] },
    { id: "BP7", title: "Ensure consistency and bi-directional traceability.", keywords: ["traceability"] },
    { id: "BP8", title: "Communicate agreed software architectural design.", keywords: ["approval", "communicate"] },
  ],
  outputWorkProducts: [
    { id: "04-04", aliases: ["software architecture", "swad"], keywords: ["architecture"] },
    { id: "17-08", aliases: ["interface"], keywords: ["interface"] },
    { id: "13-22", aliases: ["traceability matrix"], keywords: ["traceability"] },
    { id: "13-19", aliases: ["review"], keywords: [] },
  ],
});

export const SWE_3 = defineProcess({
  id: "SWE.3",
  name: "Software Detailed Design and Unit Construction",
  category: "SWE",
  purpose: "Provide an evaluated detailed design for the software components and to specify and produce the software units.",
  basePractices: [
    { id: "BP1", title: "Develop software detailed design.", keywords: ["detailed design", "swdd"] },
    { id: "BP2", title: "Define interfaces of software units.", keywords: ["interface", "unit"] },
    { id: "BP3", title: "Describe dynamic behavior.", keywords: ["dynamic behavior"] },
    { id: "BP4", title: "Evaluate software detailed design.", keywords: ["review", "evaluation"] },
    { id: "BP5", title: "Ensure consistency and bi-directional traceability.", keywords: ["traceability"] },
    { id: "BP6", title: "Communicate agreed software detailed design.", keywords: ["approval", "communicate"] },
    { id: "BP7", title: "Develop software units.", keywords: ["source code", "implementation", "unit"] },
  ],
  outputWorkProducts: [
    { id: "04-05", aliases: ["detailed design", "swdd"], keywords: ["detailed design"] },
    { id: "11-05", aliases: ["software unit", "source"], keywords: ["source code"] },
    { id: "17-08", aliases: ["interface"], keywords: ["interface"] },
    { id: "13-22", aliases: ["traceability"], keywords: ["traceability"] },
  ],
});

export const SWE_4 = defineProcess({
  id: "SWE.4",
  name: "Software Unit Verification",
  category: "SWE",
  purpose: "Verify software units to provide evidence of compliance to the software detailed design and non-functional requirements.",
  basePractices: [
    { id: "BP1", title: "Develop software unit verification strategy.", keywords: ["unit verification strategy"] },
    { id: "BP2", title: "Develop criteria for unit verification.", keywords: ["unit criteria", "coverage"] },
    { id: "BP3", title: "Perform static verification of software units.", keywords: ["static analysis", "review"] },
    { id: "BP4", title: "Test software units.", keywords: ["unit test"] },
    { id: "BP5", title: "Ensure consistency and bi-directional traceability.", keywords: ["traceability"] },
    { id: "BP6", title: "Summarize and communicate results.", keywords: ["report", "results"] },
  ],
  outputWorkProducts: [
    { id: "19-12", aliases: ["unit test spec"], keywords: ["unit test"] },
    { id: "13-25", aliases: ["verification results"], keywords: ["verification"] },
    { id: "13-19", aliases: ["review"], keywords: [] },
    { id: "13-22", aliases: ["traceability"], keywords: ["traceability"] },
  ],
});

export const SWE_5 = defineProcess({
  id: "SWE.5",
  name: "Software Component Verification and Integration Verification",
  category: "SWE",
  purpose: "Verify software components and their integration to provide evidence that integrated software components are consistent with the software architectural design and detailed design.",
  basePractices: [
    { id: "BP1", title: "Develop software integration verification strategy.", keywords: ["integration strategy"] },
    { id: "BP2", title: "Develop specification for software integration verification.",
      keywords: ["integration test", "test specification"] },
    { id: "BP3", title: "Integrate software units and components.", keywords: ["integration"] },
    { id: "BP4", title: "Select test cases.", keywords: ["test case"] },
    { id: "BP5", title: "Perform software integration verification.", keywords: ["integration test"] },
    { id: "BP6", title: "Ensure consistency and bi-directional traceability.", keywords: ["traceability"] },
    { id: "BP7", title: "Summarize and communicate results.", keywords: ["report", "results"] },
  ],
  outputWorkProducts: [
    { id: "19-10", aliases: ["integration test"], keywords: ["integration"] },
    { id: "13-25", aliases: ["verification results"], keywords: ["verification"] },
    { id: "13-22", aliases: ["traceability"], keywords: ["traceability"] },
  ],
});

export const SWE_6 = defineProcess({
  id: "SWE.6",
  name: "Software Verification",
  category: "SWE",
  purpose: "Verify that the integrated software meets the software requirements.",
  basePractices: [
    { id: "BP1", title: "Develop software verification strategy.", keywords: ["verification strategy"] },
    { id: "BP2", title: "Develop specification for software verification.", keywords: ["test specification"] },
    { id: "BP3", title: "Select test cases.", keywords: ["test case"] },
    { id: "BP4", title: "Verify the integrated software.", keywords: ["software test"] },
    { id: "BP5", title: "Ensure consistency and bi-directional traceability.", keywords: ["traceability"] },
    { id: "BP6", title: "Summarize and communicate results.", keywords: ["report", "results"] },
  ],
  outputWorkProducts: [
    { id: "19-00", aliases: ["test specification"], keywords: ["test"] },
    { id: "13-25", aliases: ["verification results"], keywords: ["verification"] },
    { id: "13-22", aliases: ["traceability"], keywords: ["traceability"] },
  ],
});

export default [SWE_1, SWE_2, SWE_3, SWE_4, SWE_5, SWE_6];
