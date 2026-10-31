# Ask Aryan

Edit content/aryan.md for all personal knowledge. Heading format: Title | section number | comma-separated matching phrases.

Vite dev and preview servers expose POST /api/ask. Without credentials it streams matched notebook passages, explicitly labelled Notebook search. This fallback is not an LLM.

For AI answers set OPENAI_API_KEY and OPENAI_MODEL in the ignored .env file, then restart the server. Neither variable uses the VITE_ prefix or enters the browser bundle. Model selection is left to the account owner.

API implementation reference: https://developers.openai.com/api/docs/quickstart

The unchanged Sites static worker does not provide /api/ask. A server deployment is required for Ask Aryan in production; Vite preview is for local review only. The current local endpoint uses an in-memory 12 requests/minute/socket-IP limiter. A multi-instance deployment requires shared limiting and trusted proxy configuration.

Browser speech recognition is opt-in and hidden where unsupported. The microphone never starts automatically. Enter submits; Shift+Enter adds a line. Wispr Flow can dictate directly into the native textarea.
