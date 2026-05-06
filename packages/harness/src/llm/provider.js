/**
 * Provider-agnostic LLM client factory. Detection order:
 *   1. opts.provider explicitly set
 *   2. ASPICE_LLM_PROVIDER env
 *   3. API key prefix (sk-ant → anthropic, sk- → openai)
 *   4. Env presence (ANTHROPIC_API_KEY / OPENAI_API_KEY)
 *
 * @param {{provider?: "anthropic"|"openai", apiKey?: string, model?: string}} [opts]
 */
export function resolveProvider(opts = {}) {
  const explicit = opts.provider ?? process.env.ASPICE_LLM_PROVIDER;
  if (explicit) return { provider: explicit, apiKey: opts.apiKey ?? keyFromEnv(explicit), model: opts.model };
  const key = opts.apiKey;
  if (key?.startsWith("sk-ant-")) return { provider: "anthropic", apiKey: key, model: opts.model };
  if (key?.startsWith("sk-")) return { provider: "openai", apiKey: key, model: opts.model };
  if (process.env.ANTHROPIC_API_KEY) return { provider: "anthropic", apiKey: process.env.ANTHROPIC_API_KEY, model: opts.model };
  if (process.env.OPENAI_API_KEY) return { provider: "openai", apiKey: process.env.OPENAI_API_KEY, model: opts.model };
  throw new Error("No LLM provider configured. Set ANTHROPIC_API_KEY or OPENAI_API_KEY.");
}

function keyFromEnv(provider) {
  return provider === "anthropic" ? process.env.ANTHROPIC_API_KEY : process.env.OPENAI_API_KEY;
}
