# Prototype Instructions

## Project decisions

- Adapt America.gov for Spain, with Spanish and English content and a clear independent-prototype notice.
- Repository: `apolmig/espanachat`. The user authorized review, improvements and production deployment on 2 October 2026. Deploy to the existing Netlify project `espana-chat`, site ID `b8e12f31-147d-4b85-a10a-c5b96588c189`, at `https://espana.chat/`. Preserve its domain configuration.
- Current answers are prepared local guides. Never claim a live AI model or government integration is connected until implemented and verified.
- Use clear, concise language and no em dash in user-facing copy or communication.
- Keep a discreet footer credit, `Made with ♥ by apolmig`, linking to `https://github.com/apolmig`.
- Prioritize responsive improvements for phones and tablets while keeping the closest possible visual resemblance to America.gov: typography, central greeting, photographic question field, carousel and spacious sections.
- Use representative Spanish everyday scenes in the photography. Keep prepared guides for useful everyday consultations. On 2 October 2026 the user authorized the planned expansion to ten topics (padrón, regional health card and FNMT personal certificate), improved query matching and territorial context, followed by publication. See `docs/plan-version-10-guias.md`. AI integration and collecting feedback remain a later phase.
- Territorial context is local and attached to each answer. Ask only for municipality or autonomous community/city; keep general guidance available and distinguish verified local links from the official directory fallback. Never invent personalized requirements or government integrations.
- Production uses self-hosted Inter and Libre Caslon Display under SIL OFL, plus Phosphor icons under MIT. Keep license notices and exclude archived reference assets from the deployed directory. Preserve the reference's composition with these publishable assets.
- The live site redirects www to `https://espana.chat/`; sharing metadata follows that canonical domain. The social card uses a warm photographic view of Spain with the wordmark inside the central square crop, no tiny text, and a versioned JPEG URL. Keep that composition legible at 90 × 90 px for WhatsApp thumbnails.

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.
