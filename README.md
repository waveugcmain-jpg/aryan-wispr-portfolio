# Aryan × Wispr Flow

React + Vite portfolio with an animated notebook, room/train scenes, music, and Ask Aryan.

## Deploy on Netlify

Import https://github.com/sgulati-entrepot/aryan-wispr-portfolio and select `main`.
Leave the base directory empty. The checked-in `netlify.toml` supplies the build command (`pnpm run build:netlify`), publish directory (`dist/client`), function bundle and page-refresh fallback automatically. Node 22 and pnpm are pinned in the repository.

Ask Aryan works without an API key using grounded notebook matches. For LLM answers, set both `OPENAI_API_KEY` and `OPENAI_MODEL` in Netlify environment variables with Functions scope, then redeploy. Never use a `VITE_` prefix for secrets. Knowledge lives in `content/aryan.md`. The function returns NDJSON; Netlify buffers the response and the frontend reveals words progressively. Rate limiting is best-effort per warm function instance.

## Local development

Run `pnpm install`, then `pnpm dev --host 127.0.0.1 --port 4173`.
Run `pnpm run build:netlify` for the production frontend. `pnpm run build` also prepares the separate Sites hosting output.
Run `node --test tests/*.test.mjs` for endpoint, animation geometry and hosting checks.

Personal details not yet supplied remain marked as placeholders. Browser policies may require a click to start music; microphone dictation is shown only where supported.
