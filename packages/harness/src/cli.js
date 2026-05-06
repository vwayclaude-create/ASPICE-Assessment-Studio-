#!/usr/bin/env node
import { Command } from "commander";
import { loadProcesses } from "../spec/canonical/index.js";
import { readArtifacts } from "./io/fileReader.js";
import { renderReport } from "./io/reporter.js";
import { Harness } from "./harness.js";
import { ruleScorer } from "./evaluators/ruleScorer.js";
import { createLlmScorer } from "./evaluators/llmScorer.js";
import { createHybridScorer } from "./evaluators/hybridScorer.js";
import { createLlmClient } from "./llm/client.js";

const program = new Command();
program
  .name("aspice")
  .description("ASPICE v4.0 harness — CL1~CL3, cross-process traceability")
  .version("0.2.0");

program
  .command("list")
  .description("List canonical processes known to the harness")
  .action(() => {
    const procs = loadProcesses();
    if (!procs.length) {
      console.error("No canonical processes found. Run: npm run extract");
      process.exit(1);
    }
    for (const p of procs) console.log(`${p.id.padEnd(7)} ${p.category.padEnd(4)} ${p.name}`);
  });

program
  .command("evaluate")
  .description("Evaluate one or all processes against evidence artifacts")
  .requiredOption("-p, --process <id>", "process id or 'all'")
  .option("-l, --level <n>", "target capability level (1-3)", "1")
  .option("-e, --engine <kind>", "scorer: rule | llm | hybrid", "rule")
  .option("-f, --format <fmt>", "markdown | json", "markdown")
  .option("-o, --out <path>", "write report to file")
  .argument("<files...>", "evidence files")
  .action(async (files, opts) => {
    const artifacts = await readArtifacts(files);
    const scorer = await buildScorer(opts.engine);
    const harness = new Harness({ scorer, targetLevel: Number(opts.level) });

    let verdict;
    if (opts.process === "all") {
      verdict = await harness.evaluateProject({ artifacts });
    } else if (opts.process.includes(",")) {
      verdict = await harness.evaluateProject({
        artifacts,
        processIds: opts.process.split(",").map((s) => s.trim()),
      });
    } else {
      verdict = await harness.evaluateProcess({ processId: opts.process, artifacts });
    }

    const out = renderReport(verdict, opts.format);
    if (opts.out) {
      const { writeFile } = await import("node:fs/promises");
      await writeFile(opts.out, out);
    } else {
      console.log(out);
    }
  });

async function buildScorer(engine) {
  if (engine === "rule") return ruleScorer;
  if (engine === "llm") return createLlmScorer({ client: createLlmClient() });
  if (engine === "hybrid") {
    return createHybridScorer({
      rule: ruleScorer,
      llm: createLlmScorer({ client: createLlmClient() }),
    });
  }
  throw new Error(`Unknown --engine: ${engine} (rule | llm | hybrid)`);
}

program.parseAsync();
