import { defineProcess } from "./_helpers.js";

export const MAN_3 = defineProcess({
  id: "MAN.3",
  name: "Project Management",
  category: "MAN",
  purpose: "Identify, establish, and control the activities and resources necessary to produce a product that meets the project requirements.",
  basePractices: [
    { id: "BP1", title: "Define the scope of work.", keywords: ["scope", "work package"] },
    { id: "BP2", title: "Define project lifecycle.", keywords: ["lifecycle", "phase"] },
    { id: "BP3", title: "Evaluate feasibility of the project.", keywords: ["feasibility"] },
    { id: "BP4", title: "Define, monitor, and adjust project activities.", keywords: ["schedule", "activity"] },
    { id: "BP5", title: "Define, monitor, and adjust project estimates and resources.",
      keywords: ["estimate", "resource", "effort"] },
    { id: "BP6", title: "Ensure required skills, knowledge, and experience.", keywords: ["skill", "competency"] },
    { id: "BP7", title: "Identify, monitor, and adjust against project interfaces and agreed commitments.",
      keywords: ["interface", "commitment"] },
    { id: "BP8", title: "Monitor against plans, and take corrective action.", keywords: ["status", "corrective"] },
    { id: "BP9", title: "Review and report progress of the project.", keywords: ["progress", "report"] },
  ],
  outputWorkProducts: [
    { id: "01-50", aliases: ["project plan", "management plan"], keywords: ["project plan"] },
    { id: "15-03", aliases: ["status report"], keywords: ["status"] },
    { id: "02-01", aliases: ["minutes"], keywords: ["minutes"] },
    { id: "14-02", aliases: ["corrective action"], keywords: ["corrective"] },
  ],
});

export const MAN_5 = defineProcess({
  id: "MAN.5",
  name: "Risk Management",
  category: "MAN",
  purpose: "Identify, analyze, treat, and monitor the risks continuously.",
  basePractices: [
    { id: "BP1", title: "Establish risk management scope.", keywords: ["risk scope", "risk management"] },
    { id: "BP2", title: "Define risk management strategies.", keywords: ["risk strategy"] },
    { id: "BP3", title: "Identify risks.", keywords: ["risk identification", "risk register"] },
    { id: "BP4", title: "Analyze risks.", keywords: ["risk analysis", "likelihood", "impact"] },
    { id: "BP5", title: "Define risk treatment actions.", keywords: ["mitigation", "treatment"] },
    { id: "BP6", title: "Monitor risks.", keywords: ["monitor", "risk review"] },
    { id: "BP7", title: "Take corrective action.", keywords: ["corrective"] },
  ],
  outputWorkProducts: [
    { id: "08-60", aliases: ["risk plan"], keywords: ["risk"] },
    { id: "14-52", aliases: ["risk analysis", "risk register"], keywords: ["risk"] },
    { id: "14-02", aliases: ["corrective action"], keywords: ["corrective"] },
    { id: "15-01", aliases: ["analysis report"], keywords: ["risk"] },
  ],
});

export const MAN_6 = defineProcess({
  id: "MAN.6",
  name: "Measurement",
  category: "MAN",
  purpose: "Collect and analyze data relating to the products and processes to support effective management and to objectively demonstrate quality.",
  basePractices: [
    { id: "BP1", title: "Identify information needs.", keywords: ["information need"] },
    { id: "BP2", title: "Specify measures.", keywords: ["measure", "metric"] },
    { id: "BP3", title: "Specify data collection and analysis procedures.", keywords: ["data collection", "procedure"] },
    { id: "BP4", title: "Collect measurement data.", keywords: ["measurement", "data"] },
    { id: "BP5", title: "Analyze measures.", keywords: ["analysis"] },
    { id: "BP6", title: "Communicate measurement results.", keywords: ["report", "communicate"] },
  ],
  outputWorkProducts: [
    { id: "03-06", aliases: ["measurement report"], keywords: ["measurement"] },
    { id: "15-07", aliases: ["metrics"], keywords: ["metric"] },
    { id: "15-08", aliases: ["performance"], keywords: ["performance"] },
  ],
});

export default [MAN_3, MAN_5, MAN_6];
