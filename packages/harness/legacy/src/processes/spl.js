import { defineProcess } from "./_helpers.js";

export const SPL_1 = defineProcess({
  id: "SPL.1",
  name: "Supplier Tendering",
  category: "SPL",
  purpose: "Prepare a response to a customer's tender.",
  basePractices: [
    { id: "BP1", title: "Establish customer communication.", keywords: ["customer", "rfq", "inquiry"] },
    { id: "BP2", title: "Perform customer needs review.", keywords: ["customer needs", "requirements review"] },
    { id: "BP3", title: "Propose response.", keywords: ["proposal", "quotation", "offer"] },
    { id: "BP4", title: "Confirm proposal.", keywords: ["confirmation", "contract review"] },
  ],
  outputWorkProducts: [
    { id: "13-04", aliases: ["communication"], keywords: ["customer communication"] },
    { id: "13-05", aliases: ["contract review"], keywords: ["review", "contract"] },
    { id: "02-00", aliases: ["agreement"], keywords: ["commitment"] },
  ],
});

export const SPL_2 = defineProcess({
  id: "SPL.2",
  name: "Product Release",
  category: "SPL",
  purpose: "Control the release of a product to the intended customer.",
  basePractices: [
    { id: "BP1", title: "Define the functional content of releases.", keywords: ["release content", "scope"] },
    { id: "BP2", title: "Define release products.", keywords: ["deliverable", "release package"] },
    { id: "BP3", title: "Establish a product release classification and numbering scheme.",
      keywords: ["version", "release id", "classification"] },
    { id: "BP4", title: "Define the build activities and build environment.",
      keywords: ["build", "build environment"] },
    { id: "BP5", title: "Build the release from configured items.", keywords: ["configured", "baseline", "build"] },
    { id: "BP6", title: "Determine release acceptance based on defined criteria.",
      keywords: ["acceptance criteria", "release criteria"] },
    { id: "BP7", title: "Determine release documentation.", keywords: ["release note", "documentation"] },
    { id: "BP8", title: "Provide a release delivery approval.", keywords: ["approval", "sign-off"] },
    { id: "BP9", title: "Ensure product release.", keywords: ["delivery", "release"] },
  ],
  outputWorkProducts: [
    { id: "11-03", aliases: ["release information", "release note"], keywords: ["release"] },
    { id: "11-04", aliases: ["release package"], keywords: ["package"] },
    { id: "13-06", aliases: ["delivery record"], keywords: ["delivery"] },
    { id: "18-06", aliases: ["release criteria"], keywords: ["release criteria"] },
    { id: "17-02", aliases: ["build list"], keywords: ["build list"] },
  ],
});

export default [SPL_1, SPL_2];
