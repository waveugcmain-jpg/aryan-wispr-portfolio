# Aryan — The Passenger's Journal

Home-screen visual prototype. React + Vite, local fonts, real HTML/CSS notebook, layered train imagery and a draggable photo placeholder. Navigation is intentionally non-functional. No AI, backend or other pages.

## Run

Install Node.js, then `corepack pnpm install` and `corepack pnpm dev --host 127.0.0.1 --port 4173`.

Build: `corepack pnpm build`.

## Files

- `src/App.jsx`: scene, notebook, folder navigation, movable photo card.
- `src/styles.css`: tokens, materials, responsive layout, states.
- `public/assets/`: source train image, generated cloth scene and paper texture.
- `qa/`: review screenshots (earlier captures may show earlier iterations).

Personal copy and portrait remain clearly marked placeholders. Both cards support pointer dragging and arrow-key movement across the viewport. Current background is the clear train and bare wooden table; draped fabric was removed at the user's request. The landscape remains independently layered for later motion.
