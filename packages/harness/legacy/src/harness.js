import { aggregateCL1 } from "./model/verdict.js";
import { lookupWorkProduct } from "./model/workProducts.js";
import { createEngine } from "./engine/index.js";
import { PROCESS_REGISTRY } from "./processes/index.js";

/**
 * ASPICE CL1 evaluator harness.
 *
 * The harness itself is process-agnostic. Each ASPICE process is a plugin
 * (see src/processes/*.js) that exposes base practices, expected output work
 * products, and optional rule hints. The active engine consumes the plugin
 * plus submitted artifacts and returns per-BP / per-WP evidence scores.
 */
export class Harness {
  constructor({ engine = "hybrid", llm, processes } = {}) {
    this.engineName = engine;
    this.llm = llm ?? null;
    this.processes = new Map();
    const initial = processes ?? Object.values(PROCESS_REGISTRY);
    for (const p of initial) this.registerProcess(p);
    this.engine = createEngine(engine, { llm });
  }

  registerProcess(plugin) {
    if (!plugin?.id) throw new Error("Process plugin must have an `id`.");
    this.processes.set(plugin.id, plugin);
    return this;
  }

  listProcesses() {
    return Array.from(this.processes.values()).map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category,
    }));
  }

  getProcess(id) {
    const plugin = this.processes.get(id);
    if (!plugin) throw new Error(`Unknown process: ${id}`);
    return plugin;
  }

  /**
   * Evaluate a single process against the supplied artifacts.
   * @returns A CL1 report: { processId, rating, achieved, basePractices[], workProducts[], gaps[], notes }
   */
  async evaluate({ processId, artifacts = [], options = {} }) {
    const plugin = this.getProcess(processId);
    const context = { plugin, artifacts, options, harness: this };

    const raw = await this.engine.evaluate(context);
    return this.#finalize(plugin, raw);
  }

  /**
   * Evaluate every registered process. Useful for a full VDA-scope audit
   * when the caller has submitted a folder of mixed evidence.
   */
  async evaluateAll({ artifacts = [], options = {} } = {}) {
    const reports = [];
    for (const plugin of this.processes.values()) {
      const raw = await this.engine.evaluate({ plugin, artifacts, options, harness: this });
      reports.push(this.#finalize(plugin, raw));
    }
    return {
      engine: this.engineName,
      processCount: reports.length,
      achieved: reports.filter((r) => r.achieved).length,
      reports,
    };
  }

  #finalize(plugin, raw) {
    const basePractices = (raw.basePractices ?? []).map((bp) => ({
      id: bp.id,
      title: bp.title,
      score: clamp01(bp.score ?? 0),
      rating: bp.rating,
      evidence: bp.evidence ?? [],
      gaps: bp.gaps ?? [],
      note: bp.note ?? "",
    }));

    const workProducts = (raw.workProducts ?? []).map((wp) => ({
      ...lookupWorkProduct(wp.id),
      score: clamp01(wp.score ?? 0),
      rating: wp.rating,
      found: wp.found ?? wp.score > 0,
      evidence: wp.evidence ?? [],
      gaps: wp.gaps ?? [],
    }));

    const verdict = aggregateCL1({ basePractices, workProducts });

    const gaps = [
      ...basePractices.flatMap((bp) => bp.gaps.map((g) => `[${bp.id}] ${g}`)),
      ...workProducts.flatMap((wp) => wp.gaps.map((g) => `[WP ${wp.id}] ${g}`)),
    ];

    return {
      processId: plugin.id,
      processName: plugin.name,
      category: plugin.category,
      engine: this.engineName,
      evaluatedAt: new Date().toISOString(),
      rating: verdict.rating,
      score: verdict.score,
      achieved: verdict.achieved,
      basePractices,
      workProducts,
      gaps,
      notes: raw.notes ?? [],
      trace: raw.trace ?? null,
    };
  }
}

function clamp01(n) {
  if (Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(1, n));
}
