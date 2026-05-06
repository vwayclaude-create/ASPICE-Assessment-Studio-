import { RuleEngine } from "./ruleEngine.js";
import { LlmEngine } from "./llmEngine.js";
import { HybridEngine } from "./hybridEngine.js";
import { AgentEngine } from "./agentEngine.js";

export function createEngine(name, opts = {}) {
  switch (name) {
    case "rule":
      return new RuleEngine(opts);
    case "llm":
      return new LlmEngine(opts);
    case "agent":
      return new AgentEngine(opts);
    case "hybrid":
      return new HybridEngine(opts);
    case "hybrid-agent":
      return new HybridEngine({ ...opts, partner: "agent" });
    default:
      throw new Error(`Unknown engine: ${name}. Expected 'rule' | 'llm' | 'agent' | 'hybrid' | 'hybrid-agent'.`);
  }
}

export { RuleEngine, LlmEngine, HybridEngine, AgentEngine };
