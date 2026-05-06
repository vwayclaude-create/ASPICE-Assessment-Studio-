import { AnthropicProvider } from "./anthropic.js";
import { OpenAIProvider } from "./openai.js";

/**
 * Resolve an LLM provider from configuration.
 *
 * `llm` fields (all optional):
 *   provider: "anthropic" | "openai"      — explicit override
 *   apiKey:   string                      — falls back to provider-appropriate env
 *   model:    string                      — provider-specific model id
 *   client:   SDK instance                — already-constructed client (useful for tests)
 *
 * Resolution precedence:
 *   1. explicit llm.provider
 *   2. ASPICE_LLM_PROVIDER env var
 *   3. shape of the injected client (messages.create → anthropic, chat.completions.create → openai)
 *   4. apiKey prefix ("sk-ant-" → anthropic, "sk-" → openai)
 *   5. whichever env var is set (ANTHROPIC_API_KEY vs OPENAI_API_KEY)
 *
 * Returns `null` if no provider can be resolved — engines translate that into abstention.
 */
export async function resolveProvider(llm = {}) {
  const name = detectProviderName(llm);
  if (!name) return null;
  if (name === "anthropic") return AnthropicProvider.create(llm);
  if (name === "openai") return OpenAIProvider.create(llm);
  return null;
}

export function detectProviderName(llm = {}) {
  if (llm.provider === "anthropic" || llm.provider === "openai") return llm.provider;

  const envPick = (process.env.ASPICE_LLM_PROVIDER ?? "").toLowerCase();
  if (envPick === "anthropic" || envPick === "openai") return envPick;

  if (llm.client) {
    if (typeof llm.client?.messages?.create === "function") return "anthropic";
    if (typeof llm.client?.chat?.completions?.create === "function") return "openai";
  }

  const key = llm.apiKey;
  if (typeof key === "string") {
    if (key.startsWith("sk-ant-")) return "anthropic";
    if (key.startsWith("sk-")) return "openai";
  }

  if (process.env.ANTHROPIC_API_KEY) return "anthropic";
  if (process.env.OPENAI_API_KEY) return "openai";

  return null;
}

export { AnthropicProvider, OpenAIProvider };
