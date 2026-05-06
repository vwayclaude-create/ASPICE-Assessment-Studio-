/**
 * Anthropic provider.
 *
 * Wraps @anthropic-ai/sdk so the rest of the harness can stay provider-neutral.
 * Tool definitions are consumed in Anthropic's native shape (our canonical form).
 *
 * The provider owns its message buffer: `appendAssistant` pushes the raw content
 * block array, `appendToolResults` pushes a user turn containing tool_result blocks.
 */
export class AnthropicProvider {
  static async create({ apiKey, model, client, maxTokens } = {}) {
    let c = client;
    if (!c) {
      const key = apiKey ?? process.env.ANTHROPIC_API_KEY;
      if (!key) return null;
      try {
        const mod = await import("@anthropic-ai/sdk");
        const Anthropic = mod.default ?? mod.Anthropic;
        c = new Anthropic({ apiKey: key });
      } catch {
        return null;
      }
    }
    return new AnthropicProvider({ client: c, model, maxTokens });
  }

  constructor({ client, model, maxTokens }) {
    this.name = "anthropic";
    this.client = client;
    this.model = model ?? process.env.ASPICE_LLM_MODEL ?? "claude-opus-4-7";
    this.maxTokens = maxTokens ?? 4000;
  }

  async complete({ system, user, maxTokens } = {}) {
    const resp = await this.client.messages.create({
      model: this.model,
      max_tokens: maxTokens ?? this.maxTokens,
      system,
      messages: [{ role: "user", content: user }],
    });
    const text = (resp.content ?? [])
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("");
    return { text, raw: resp };
  }

  async runTools({ system, tools, messages, maxTokens } = {}) {
    const resp = await this.client.messages.create({
      model: this.model,
      max_tokens: maxTokens ?? this.maxTokens,
      system,
      tools,
      messages,
    });
    const toolUses = (resp.content ?? [])
      .filter((b) => b.type === "tool_use")
      .map((b) => ({ id: b.id, name: b.name, input: b.input }));
    const text = (resp.content ?? [])
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("");
    return {
      text,
      toolUses,
      stopReason: resp.stop_reason,
      assistantPayload: resp.content,
      raw: resp,
    };
  }

  appendAssistant(messages, resp) {
    messages.push({ role: "assistant", content: resp.assistantPayload });
  }

  appendToolResults(messages, toolResults) {
    messages.push({
      role: "user",
      content: toolResults.map((r) => ({
        type: "tool_result",
        tool_use_id: r.id,
        content: r.content,
      })),
    });
  }
}
