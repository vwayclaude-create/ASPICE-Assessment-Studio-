import OpenAI from "openai";

/**
 * OpenAI client adapter with JSON response mode.
 * The OpenAI API does not expose the same prompt-caching primitive as
 * Anthropic, so system+context+task are concatenated. Costs for repeated
 * per-BP calls are higher than via Anthropic caching — users who care
 * about cost-efficient bulk assessment should prefer the Anthropic provider.
 */
export function createOpenAIClient({ apiKey, model = "gpt-4o", maxTokens = 8192, temperature = 0, seed = 42 } = {}) {
  if (!apiKey) throw new Error("OpenAI apiKey required");
  const client = new OpenAI({ apiKey });

  return {
    provider: "openai",
    model,

    async generateJson({ system, context, task }) {
      const messages = [];
      if (system) messages.push({ role: "system", content: system });
      messages.push({ role: "user", content: [context, task].filter(Boolean).join("\n\n") });

      // temperature=0 + fixed seed → reproducible scoring across repeated runs.
      // Without these, gpt-4o defaults to temperature=1 and the verdict varies
      // significantly each time the same artifact is re-evaluated.
      const res = await client.chat.completions.create({
        model,
        max_tokens: maxTokens,
        temperature,
        seed,
        response_format: { type: "json_object" },
        messages,
      });

      const text = res.choices?.[0]?.message?.content ?? "";
      return { parsed: JSON.parse(text), raw: text, usage: res.usage };
    },
  };
}
