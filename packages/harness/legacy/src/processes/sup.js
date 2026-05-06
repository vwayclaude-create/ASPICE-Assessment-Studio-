import { defineProcess } from "./_helpers.js";

export const SUP_1 = defineProcess({
  id: "SUP.1",
  name: "Quality Assurance",
  category: "SUP",
  purpose: "Provide independent and objective assurance that work products and processes comply with predefined provisions and plans and that non-conformances are resolved.",
  basePractices: [
    { id: "BP1", title: "Develop quality assurance strategy.", keywords: ["quality strategy", "qa"] },
    { id: "BP2", title: "Assure quality of work products.", keywords: ["work product review"] },
    { id: "BP3", title: "Assure quality of process activities.", keywords: ["process audit"] },
    { id: "BP4", title: "Assure quality of the application of process-related provisions.",
      keywords: ["process provision"] },
    { id: "BP5", title: "Summarize and communicate quality assurance activities and results.",
      keywords: ["quality report"] },
    { id: "BP6", title: "Ensure resolution of non-conformance.", keywords: ["non-conformance", "corrective"] },
    { id: "BP7", title: "Implement escalation mechanism.", keywords: ["escalation"] },
  ],
  outputWorkProducts: [
    { id: "01-03", aliases: ["quality plan"], keywords: ["quality"] },
    { id: "09-03", aliases: ["quality policy"], keywords: ["quality"] },
    { id: "13-18", aliases: ["quality record"], keywords: ["quality"] },
    { id: "14-02", aliases: ["corrective action"], keywords: ["corrective"] },
  ],
});

export const SUP_8 = defineProcess({
  id: "SUP.8",
  name: "Configuration Management",
  category: "SUP",
  purpose: "Establish and maintain the integrity of all work products of a process or project and make them available to concerned parties.",
  basePractices: [
    { id: "BP1", title: "Develop a configuration management strategy.", keywords: ["cm strategy", "configuration"] },
    { id: "BP2", title: "Establish a configuration management system.",
      keywords: ["configuration management system", "repository"] },
    { id: "BP3", title: "Establish configuration item identification scheme.", keywords: ["ci identification"] },
    { id: "BP4", title: "Maintain configuration item description.", keywords: ["configuration item"] },
    { id: "BP5", title: "Maintain history of configuration items.", keywords: ["history", "audit"] },
    { id: "BP6", title: "Establish baselines.", keywords: ["baseline"] },
    { id: "BP7", title: "Report configuration status.", keywords: ["configuration status", "status report"] },
    { id: "BP8", title: "Verify information about configured items.", keywords: ["verification", "audit"] },
    { id: "BP9", title: "Manage the storage of configuration items and baselines.",
      keywords: ["storage", "retention"] },
  ],
  outputWorkProducts: [
    { id: "08-61", aliases: ["cm plan", "configuration management plan"], keywords: ["configuration"] },
    { id: "13-08", aliases: ["baseline"], keywords: ["baseline"] },
    { id: "13-14", aliases: ["configuration status"], keywords: ["configuration"] },
    { id: "16-03", aliases: ["repository", "version control"], keywords: ["configuration"] },
  ],
});

export const SUP_9 = defineProcess({
  id: "SUP.9",
  name: "Problem Resolution Management",
  category: "SUP",
  purpose: "Ensure that problems are identified, analyzed, managed, and controlled to resolution.",
  basePractices: [
    { id: "BP1", title: "Develop a problem resolution management strategy.", keywords: ["problem strategy"] },
    { id: "BP2", title: "Identify and record the problem.", keywords: ["problem record", "issue"] },
    { id: "BP3", title: "Record the status of problems.", keywords: ["status"] },
    { id: "BP4", title: "Diagnose the cause and determine the impact of problems.",
      keywords: ["root cause", "impact"] },
    { id: "BP5", title: "Authorize urgent resolution action.", keywords: ["urgent", "workaround"] },
    { id: "BP6", title: "Raise alert notifications.", keywords: ["alert"] },
    { id: "BP7", title: "Initiate problem resolution.", keywords: ["resolution"] },
    { id: "BP8", title: "Track problems to closure.", keywords: ["closure", "tracking"] },
    { id: "BP9", title: "Analyze problem trends.", keywords: ["trend analysis"] },
  ],
  outputWorkProducts: [
    { id: "08-62", aliases: ["problem management plan"], keywords: ["problem"] },
    { id: "10-50", aliases: ["problem resolution process"], keywords: ["problem"] },
    { id: "13-07", aliases: ["problem record", "ticket"], keywords: ["problem"] },
    { id: "11-07", aliases: ["workaround"], keywords: ["workaround"] },
  ],
});

export const SUP_10 = defineProcess({
  id: "SUP.10",
  name: "Change Request Management",
  category: "SUP",
  purpose: "Ensure that change requests are managed, tracked, and implemented.",
  basePractices: [
    { id: "BP1", title: "Develop a change request management strategy.", keywords: ["change strategy"] },
    { id: "BP2", title: "Identify and record the change requests.", keywords: ["change request"] },
    { id: "BP3", title: "Record the status of change requests.", keywords: ["status"] },
    { id: "BP4", title: "Analyze and evaluate change requests.", keywords: ["impact analysis"] },
    { id: "BP5", title: "Approve change requests before implementation.", keywords: ["approval", "ccb"] },
    { id: "BP6", title: "Review the implementation of changes.", keywords: ["review", "implementation"] },
    { id: "BP7", title: "Track change requests to closure.", keywords: ["closure", "tracking"] },
  ],
  outputWorkProducts: [
    { id: "08-60", aliases: ["change management plan"], keywords: ["change"] },
    { id: "13-16", aliases: ["change request", "cr"], keywords: ["change request"] },
    { id: "13-21", aliases: ["change control record"], keywords: ["change"] },
  ],
});

export default [SUP_1, SUP_8, SUP_9, SUP_10];
