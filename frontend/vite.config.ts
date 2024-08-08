import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const API_URL = process.env.VITE_API_URL;
  const VITE_PORT = process.env.VITE_PORT;
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: VITE_PORT ? parseInt(VITE_PORT) : 3000,
      proxy: {
        "/api": {
          target: API_URL,
          changeOrigin: true,
          followRedirects: true,
          secure: false,
        },
      },
    },
  };
});
