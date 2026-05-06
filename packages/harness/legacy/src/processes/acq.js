import { defineProcess } from "./_helpers.js";

export const ACQ_4 = defineProcess({
  id: "ACQ.4",
  name: "Supplier Monitoring",
  category: "ACQ",
  purpose: "Track supplier performance against agreed requirements and take corrective action when deviations occur.",
  basePractices: [
    { id: "BP1", title: "Agree on and maintain joint processes, joint interfaces and information to be exchanged.",
      keywords: ["joint process", "interface agreement", "communication channel"] },
    { id: "BP2", title: "Exchange all agreed information between the customer and supplier.",
      keywords: ["information exchange", "status report", "escalation"] },
    { id: "BP3", title: "Review technical development with the supplier.",
      keywords: ["technical review", "progress review", "supplier review"] },
    { id: "BP4", title: "Review progress of the supplier.",
      keywords: ["milestone", "schedule adherence", "progress"] },
    { id: "BP5", title: "Act to correct deviations from agreed targets.",
      keywords: ["corrective action", "deviation", "mitigation"] },
  ],
  outputWorkProducts: [
    { id: "02-01", aliases: ["minutes", "mom"], keywords: ["supplier", "review"] },
    { id: "13-04", aliases: ["communication"], keywords: ["supplier communication"] },
    { id: "13-19", aliases: ["review record"], keywords: ["supplier", "review"] },
    { id: "14-02", aliases: ["corrective action"], keywords: ["corrective"] },
    { id: "15-06", aliases: ["supplier evaluation"], keywords: ["supplier performance"] },
  ],
});

export default [ACQ_4];
