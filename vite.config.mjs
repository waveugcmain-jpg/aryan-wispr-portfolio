import { askMiddleware } from './server/ask.mjs';
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

const localEnv = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), 'OPENAI_');
for (const key of ['OPENAI_API_KEY', 'OPENAI_MODEL']) if (!process.env[key] && localEnv[key]) process.env[key] = localEnv[key];

export default defineConfig({
  build: {
    outDir: "dist/client",
  },
  optimizeDeps: {
    include: ["react", "react-dom/client"],
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: ["terminal.local"],
    warmup: {
      clientFiles: ["./src/main.jsx"],
    },
  },
  plugins: [react(), { name: "ask-aryan", configureServer(server) { server.middlewares.use(askMiddleware); }, configurePreviewServer(server) { server.middlewares.use(askMiddleware); } }],
});
