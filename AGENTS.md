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

Five scroll-linked chapters now authorized and implemented. Keep existing letter; new content remains bracketed placeholders. No alpine or coffee illustrations. Sticky tabs and Previous/Next navigate chapters; Wispr creative data lives in src/content/creatives.js.

Use the final user letter beginning everything on this page, i said out loud. Preserve its wording. Highlight selected phrases in lavender and sage green. The top brown strip was margin collapse; .home display:flow-root keeps the scene at y=0.

Letter density: compact 620px desktop spread, 18px reading type, distinct pivot line and creator proof group; preserve supplied copy.

Section 03 is Building Wave: user-supplied founder story and Linkrunner case study. Preserve pending team size, sales learning, views, reel count and link as placeholders; do not invent results.

Section 04 is Past experiences: Zyra and Nebula, concise strengths and lessons. Wispr work is now 05 and contact 06. Nebula facts and personal lessons await user input; keep explicit placeholders.

Nebula facts supplied: founded digital workspace for remote startup teams; selected, mentored, granted funding by IIT Bombay E-Cell; failed venture; learned selling, product building, team management, speed and the difference between okay work and winning work.

Final section 04 title: Before Wave. Use supplied Zyra growth & creative strategy / 1 year and Nebula founder copy; Zyra lesson remains explicitly pending.

Latest motion direction supersedes stacked chapters: one book deck with two-sided right-to-left turns, backward navigation, arrow keys and touch swipes. Wheel turns only at reading boundaries. Short skippable train intro precedes cover opening. Red material has a fine dot texture. Reduced motion skips physical transitions.

Ask Aryan is now functional via server/ask.mjs and content/aryan.md. Native textarea, speech fallback, suggested questions, streamed notebook matches and optional server-only OpenAI connection. Never label deterministic matches as AI. Latest explicit motion request: 2.8-second visible hinge, settle on animationend; motion enabled initially with user-controlled session-persistent off toggle.
