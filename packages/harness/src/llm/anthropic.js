import Anthropic from "@anthropic-ai/sdk";

/**
 * Anthropic client adapter.
 *
 * Exposes a uniform `generateJson({ system, context, task })` surface that
 * the harness LlmScorer uses regardless of provider.
 *
 * Prompt caching: the `system` and `context` blocks are marked with
 * `cache_control: ephemeral` so that repeated per-BP / per-GP calls for the
 * same process reuse the prefix. The `task` block is dynamic and not cached.
 */
export function createAnthropicClient({ apiKey, model = "claude-opus-4-7", maxTokens = 8192, temperature = 0 } = {}) {
  if (!apiKey) throw new Error("Anthropic apiKey required");
  const client = new Anthropic({ apiKey });

  return {
    provider: "anthropic",
    model,

    async generateJson({ system, context, task }) {
      const systemParts = [];
      if (system) systemParts.push({ type: "text", text: system, cache_control: { type: "ephemeral" } });

      const userContent = [];
      if (context) userContent.push({ type: "text", text: context, cache_control: { type: "ephemeral" } });
      userContent.push({ type: "text", text: task || "" });

      // temperature=0 minimises sampling variance so the same artifact yields
      // a stable verdict on repeated evaluations.
      const res = await client.messages.create({
        model,
        max_tokens: maxTokens,
        temperature,
        system: systemParts.length ? systemParts : undefined,
        messages: [{ role: "user", content: userContent }],
      });

      const text = (res.content ?? [])
        .filter((b) => b.type === "text")
        .map((b) => b.text)
        .join("");
      return { parsed: parseJsonStrict(text), raw: text, usage: res.usage };
    },
  };
}

function parseJsonStrict(text) {
  // Accept raw JSON OR JSON wrapped in ```json ... ``` fences.
  const cleaned = text.trim().replace(/^```(?:json)?\s*/i, "").replace(/```$/, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start < 0 || end <= start) throw new Error("No JSON object found in model output");
  return JSON.parse(cleaned.slice(start, end + 1));
}
