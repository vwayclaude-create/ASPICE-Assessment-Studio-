import { defineProcess } from "./_helpers.js";

export const SYS_1 = defineProcess({
  id: "SYS.1",
  name: "Requirements Elicitation",
  category: "SYS",
  purpose: "Gather, process, and track evolving stakeholder needs and requirements throughout the product lifecycle.",
  basePractices: [
    { id: "BP1", title: "Obtain stakeholder requirements and requests.", keywords: ["stakeholder", "elicitation"] },
    { id: "BP2", title: "Understand stakeholder expectations.", keywords: ["stakeholder expectation", "analysis"] },
    { id: "BP3", title: "Agree on requirements.", keywords: ["agreement", "approval"] },
    { id: "BP4", title: "Establish stakeholder requirements baseline.", keywords: ["baseline", "stakeholder requirements"] },
    { id: "BP5", title: "Manage stakeholder requirements changes.", keywords: ["change", "request"] },
    { id: "BP6", title: "Establish customer-supplier query communication mechanism.",
      keywords: ["communication", "query"] },
  ],
  outputWorkProducts: [
    { id: "13-04", aliases: ["communication"], keywords: [] },
    { id: "13-19", aliases: ["review"], keywords: [] },
    { id: "17-50", aliases: ["stakeholder requirements", "user requirements"], keywords: ["stakeholder"] },
    { id: "14-50", aliases: ["stakeholder list"], keywords: ["stakeholder"] },
  ],
});

export const SYS_2 = defineProcess({
  id: "SYS.2",
  name: "System Requirements Analysis",
  category: "SYS",
  purpose: "Transform stakeholder requirements into a set of verifiable system requirements.",
  basePractices: [
    { id: "BP1", title: "Specify system requirements.", keywords: ["system requirement", "srs"] },
    { id: "BP2", title: "Structure system requirements.", keywords: ["structure", "category"] },
    { id: "BP3", title: "Analyze system requirements.", keywords: ["analysis", "feasibility"] },
    { id: "BP4", title: "Analyze the impact on the operating environment.",
      keywords: ["impact", "operating environment"] },
    { id: "BP5", title: "Develop verification criteria.", keywords: ["verification criteria"] },
    { id: "BP6", title: "Ensure consistency and bi-directional traceability.",
      keywords: ["traceability", "consistency"] },
    { id: "BP7", title: "Communicate agreed system requirements.", keywords: ["communicate", "approval"] },
  ],
  outputWorkProducts: [
    { id: "17-03", aliases: ["system requirements", "srs"], keywords: ["system requirement"] },
    { id: "17-08", aliases: ["interface requirement"], keywords: ["interface"] },
    { id: "13-19", aliases: ["review"], keywords: [] },
    { id: "13-22", aliases: ["traceability matrix"], keywords: ["traceability"] },
  ],
});

export const SYS_3 = defineProcess({
  id: "SYS.3",
  name: "System Architectural Design",
  category: "SYS",
  purpose: "Establish an architectural design and identify which system requirements are allocated to which elements of the system.",
  basePractices: [
    { id: "BP1", title: "Develop system architectural design.", keywords: ["architecture", "element"] },
    { id: "BP2", title: "Allocate system requirements.", keywords: ["allocation"] },
    { id: "BP3", title: "Define interfaces of system elements.", keywords: ["interface", "element"] },
    { id: "BP4", title: "Describe dynamic behavior.", keywords: ["dynamic behavior", "sequence"] },
    { id: "BP5", title: "Evaluate alternative system architectures.", keywords: ["alternative", "trade-off"] },
    { id: "BP6", title: "Ensure consistency and bi-directional traceability.", keywords: ["traceability"] },
    { id: "BP7", title: "Communicate agreed system architectural design.", keywords: ["communicate", "approve"] },
  ],
  outputWorkProducts: [
    { id: "04-06", aliases: ["system architecture", "syad"], keywords: ["architecture"] },
    { id: "17-08", aliases: ["interface"], keywords: ["interface"] },
    { id: "13-22", aliases: ["traceability matrix"], keywords: ["traceability"] },
    { id: "13-19", aliases: ["review"], keywords: [] },
  ],
});

export const SYS_4 = defineProcess({
  id: "SYS.4",
  name: "System Integration and Integration Verification",
  category: "SYS",
  purpose: "Integrate the system items to produce an integrated system consistent with the system architectural design, and demonstrate that functional and non-functional system requirements are satisfied on the integrated system.",
  basePractices: [
    { id: "BP1", title: "Develop system integration strategy.", keywords: ["integration strategy"] },
    { id: "BP2", title: "Develop system integration verification strategy.", keywords: ["verification strategy"] },
    { id: "BP3", title: "Develop specification for system integration verification.",
      keywords: ["integration test", "test specification"] },
    { id: "BP4", title: "Integrate system items.", keywords: ["integration"] },
    { id: "BP5", title: "Select test cases.", keywords: ["test case", "selection"] },
    { id: "BP6", title: "Perform system integration verification.", keywords: ["integration test", "verification"] },
    { id: "BP7", title: "Ensure consistency and bi-directional traceability.", keywords: ["traceability"] },
    { id: "BP8", title: "Summarize and communicate results.", keywords: ["report", "results"] },
  ],
  outputWorkProducts: [
    { id: "08-50", aliases: ["integration test spec"], keywords: ["integration"] },
    { id: "19-10", aliases: ["integration test specification"], keywords: ["integration"] },
    { id: "13-25", aliases: ["verification results"], keywords: ["verification"] },
    { id: "13-22", aliases: ["traceability"], keywords: ["traceability"] },
  ],
});

export const SYS_5 = defineProcess({
  id: "SYS.5",
  name: "System Verification",
  category: "SYS",
  purpose: "Verify that the integrated system meets its specified system requirements.",
  basePractices: [
    { id: "BP1", title: "Develop system verification strategy.", keywords: ["verification strategy"] },
    { id: "BP2", title: "Develop specification for system verification.", keywords: ["test specification"] },
    { id: "BP3", title: "Select test cases.", keywords: ["test case"] },
    { id: "BP4", title: "Verify the integrated system.", keywords: ["system test"] },
    { id: "BP5", title: "Ensure consistency and bi-directional traceability.", keywords: ["traceability"] },
    { id: "BP6", title: "Summarize and communicate results.", keywords: ["report", "result"] },
  ],
  outputWorkProducts: [
    { id: "08-50", aliases: ["system test spec"], keywords: ["system test"] },
    { id: "19-11", aliases: ["system test specification"], keywords: ["system test"] },
    { id: "13-25", aliases: ["verification results"], keywords: ["verification"] },
    { id: "13-22", aliases: ["traceability"], keywords: ["traceability"] },
  ],
});

export default [SYS_1, SYS_2, SYS_3, SYS_4, SYS_5];
