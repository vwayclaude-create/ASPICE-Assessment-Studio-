#!/usr/bin/env node
import { Command } from "commander";
import { writeFileSync } from "node:fs";
import { Harness } from "./harness.js";
import { loadArtifactsFromPaths } from "./io/fileReader.js";
import { renderReport } from "./io/reporter.js";
import { listProcessIds, listProcessesByCategory } from "./processes/index.js";

const program = new Command();

program
  .name("aspice-cl1")
  .description("ASPICE v4.0 Capability Level 1 evaluator harness")
  .version("0.1.0");

program
  .command("list")
  .description("List registered processes")
  .action(() => {
    const byCat = listProcessesByCategory();
    for (const [cat, items] of Object.entries(byCat)) {
      console.log(`\n[${cat}]`);
      for (const p of items) console.log(`  ${p.id.padEnd(8)} ${p.name}`);
    }
  });

program
  .command("evaluate")
  .description("Evaluate one or more processes against supplied artifacts")
  .requiredOption("-p, --process <id>", `Process id or 'all'. One of: ${listProcessIds().join(", ")} or 'all'`)
  .option("-e, --engine <name>", "rule | llm | agent | hybrid | hybrid-agent", "hybrid")
  .option("-f, --format <fmt>", "json | markdown | text", "markdown")
  .option("-o, --out <file>", "Write output to file instead of stdout")
  .argument("<artifacts...>", "Artifact file paths (PDF/DOCX/XLSX/MD/TXT)")
  .action(async (artifactPaths, opts) => {
    const artifacts = await loadArtifactsFromPaths(artifactPaths);
    const harness = new Harness({ engine: opts.engine });

    const result = opts.process === "all"
      ? await harness.evaluateAll({ artifacts })
      : await harness.evaluate({ processId: opts.process, artifacts });

    const rendered = renderReport(result, opts.format);
    if (opts.out) writeFileSync(opts.out, rendered, "utf8");
    else process.stdout.write(rendered + "\n");
  });

program.parseAsync(process.argv).catch((err) => {
  console.error(err.message);
  process.exit(1);
});
