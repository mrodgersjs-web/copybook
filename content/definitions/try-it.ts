import { definePrompt, p } from "@copybook/core";

const MODELS = ["claude-haiku-5-5", "claude-sonnet-5-5", "gpt-5-mini"] as const;

/** Agent prompt shown next to the AI Gateway "Try it out" snippets. */
export const tryItPrompt = definePrompt({
  id: "site.docs.try-it-agent",
  params: {
    endpoint: p
      .url()
      .example("https://br-fancy-king-a1b2c3d4.us-east-2.acme.dev"),
    model: p.enum(MODELS).example("claude-haiku-5-5"),
  },
  placements: ["site/docs/components"],
  template: (t, { endpoint, model }) => t`
    Call ${model} through Acme's AI Gateway in this project.
    1. If the project already uses the Vercel AI SDK, add \`@acme/ai-sdk-provider\` and call \`acme("${model}")\`.
    2. Otherwise use the OpenAI SDK (Python or TypeScript) with base URL \`${endpoint}/v1\` and the \`ACME_AI_GATEWAY_TOKEN\` env var.
    3. Send a simple chat message, then stream a response.
    4. Report what you added and the model reply.
  `,
  title: "Try the model with a coding agent",
});
