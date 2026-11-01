import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      // Spring Boot
      "/api": {
        target: "http://localhost:8081",
        changeOrigin: true,
      },

      // Go REST API
      "/products": {
        target: "http://localhost:8084",
        changeOrigin: true,
      },

      // Node.js Express API
      "/node-api": {
        target: "http://localhost:9090",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/node-api/, ""),
      },
    },
  },
});
