# Prototype Instructions

## Project decisions

- Adapt America.gov for Spain, with Spanish and English content and a clear independent-prototype notice.
- Repository: `apolmig/espanachat`. Prepare Netlify configuration for a later deployment to `www.espana.chat`. The current request authorizes uploading the project, not deploying or changing DNS.
- Current answers are prepared local guides. Never claim a live AI model or government integration is connected until implemented and verified.
- Use clear, concise language and no em dash in user-facing copy or communication.
- Keep a discreet footer credit, `Made with ♥ by apolmig`, linking to `https://github.com/apolmig`. Sharing metadata uses `https://www.espana.chat/` and the local branded social card.

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.
