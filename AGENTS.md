# Prototype Instructions

Latest user direction: remove all draped white fabric. Keep the enlarged notebook precisely centered with equal margins. Use clear train-and-bare-table imagery without magnifying the low-resolution reference. Personal cards must move across the visible screen, with only viewport-edge bounds. Do not restore the old asymmetric book position or +/-180px drag limits.

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

Keep navigation as dossier tabs above the red notebook. The complete user-provided letter spans both pages with restrained alpine and coffee illustrations. Ask Aryan is a visual-only preview until explicitly authorized to implement functionality.

Ask bar sits above tabs. On load the red cover opens over 1.8 seconds; reduced-motion opens immediately.

Opening timing: automatic one-second closed hold, followed by a slow 2.8-second opening. No click or scroll trigger.

User explicitly requests the physical right-to-left hinge in this preview, replacing the reduced-motion fade. Keep the one-second hold and slow cover rotation.

Refinement: remove floating placeholder cards; use quieter ivory paper and consistent rust tabs. Cover reads aryan X wisprflow. Letter and illustrations appear only after the 3.8-second opening sequence finishes.
