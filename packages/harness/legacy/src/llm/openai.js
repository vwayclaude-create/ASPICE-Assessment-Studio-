/**
 * OpenAI provider.
 *
 * Wraps the `openai` SDK chat.completions API. Canonical tool schemas (Anthropic-
 * shaped) are translated to OpenAI's `{ type: "function", function: {...} }` form.
 * The agent's tool_uses are normalized from OpenAI `tool_calls[]`.
 *
 * Message shapes differ from Anthropic: OpenAI expects separate `role: "tool"`
 * messages for each tool result and an assistant message carrying `tool_calls`.
 * Those details are encapsulated in `appendAssistant` / `appendToolResults`.
 */
export class OpenAIProvider {
  static async create({ apiKey, model, client, maxTokens, baseURL } = {}) {
    let c = client;
    if (!c) {
      const key = apiKey ?? process.env.OPENAI_API_KEY;
      if (!key) return null;
      try {
        const mod = await import("openai");
        const OpenAI = mod.default ?? mod.OpenAI;
        c = new OpenAI({ apiKey: key, ...(baseURL ? { baseURL } : {}) });
      } catch {
        return null;
      }
    }
    return new OpenAIProvider({ client: c, model, maxTokens });
  }

  constructor({ client, model, maxTokens }) {
    this.name = "openai";
    this.client = client;
    this.model = model ?? process.env.ASPICE_LLM_MODEL ?? "gpt-4o";
    this.maxTokens = maxTokens ?? 4000;
  }

  async complete({ system, user, maxTokens } = {}) {
    const resp = await this.client.chat.completions.create({
      model: this.model,
      max_tokens: maxTokens ?? this.maxTokens,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      response_format: { type: "json_object" },
    });
    const text = resp.choices?.[0]?.message?.content ?? "";
    return { text, raw: resp };
  }

  async runTools({ system, tools, messages, maxTokens } = {}) {
    const openaiTools = tools.map((t) => ({
      type: "function",
      function: {
        name: t.name,
        description: t.description,
        parameters: t.input_schema ?? { type: "object", properties: {}, required: [] },
      },
    }));

    const resp = await this.client.chat.completions.create({
      model: this.model,
      max_tokens: maxTokens ?? this.maxTokens,
      messages: [{ role: "system", content: system }, ...messages],
      tools: openaiTools,
      tool_choice: "auto",
    });

    const choice = resp.choices?.[0];
    const msg = choice?.message ?? {};
    const toolUses = (msg.tool_calls ?? []).map((tc) => ({
      id: tc.id,
      name: tc.function?.name,
      input: safeParseJson(tc.function?.arguments),
    }));
    return {
      text: msg.content ?? "",
      toolUses,
      stopReason: choice?.finish_reason,
      assistantPayload: msg,
      raw: resp,
    };
  }

  appendAssistant(messages, resp) {
    // Preserve the full assistant message (including tool_calls) verbatim.
    messages.push(resp.assistantPayload);
  }

  appendToolResults(messages, toolResults) {
    for (const r of toolResults) {
      messages.push({
        role: "tool",
        tool_call_id: r.id,
        content: r.content,
      });
    }
  }
}

function safeParseJson(s) {
  if (s == null) return {};
  if (typeof s === "object") return s;
  try { return JSON.parse(s); }
  catch { return {}; }
}
