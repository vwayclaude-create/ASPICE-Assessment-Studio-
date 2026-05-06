import { HarnessAgent } from "../agent/harnessAgent.js";
import { resolveProvider } from "../llm/provider.js";

/**
 * Engine-interface wrapper around the HarnessAgent.
 *
 * Resolves an LLM provider (Anthropic or OpenAI) via `resolveProvider` and hands
 * it to the agent's tool-use loop. The opts shape mirrors the other engines:
 *
 *   llm: {
 *     provider: "anthropic" | "openai"   // optional, auto-detected
 *     apiKey:   string
 *     model:    string
 *     client:   pre-built SDK client     // useful in tests
 *   }
 */
export class AgentEngine {
  constructor({ llm, maxTurns, maxTokens } = {}) {
    this.llm = llm ?? null;
    this.maxTurns = maxTurns;
    this.maxTokens = maxTokens;
  }

  async evaluate(context) {
    const { plugin, artifacts, harness } = context;
    const provider = await resolveProvider({
      ...(this.llm ?? {}),
      maxTokens: this.maxTokens,
    });
    const agent = new HarnessAgent({
      harness,
      provider,
      maxTurns: this.maxTurns,
      maxTokens: this.maxTokens,
    });
    return agent.evaluate({ plugin, artifacts });
  }
}
