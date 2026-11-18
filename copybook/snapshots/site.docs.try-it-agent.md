---
id: site.docs.try-it-agent
kind: prompt
title: "Try the model with a coding agent"
source: content/definitions/try-it.ts#tryItPrompt
placements:
  - site/docs/components
params:
  endpoint: https://br-fancy-king-a1b2c3d4.us-east-2.acme.dev
  model: claude-haiku-5-5
embeds: []
hash: sha256:bf01e832f230444a
---

Call claude-haiku-5-5 through Acme's AI Gateway in this project.
1. If the project already uses the Vercel AI SDK, add `@acme/ai-sdk-provider` and call `acme("claude-haiku-5-5")`.
2. Otherwise use the OpenAI SDK (Python or TypeScript) with base URL `https://br-fancy-king-a1b2c3d4.us-east-2.acme.dev/v1` and the `ACME_AI_GATEWAY_TOKEN` env var.
3. Send a simple chat message, then stream a response.
4. Report what you added and the model reply.
