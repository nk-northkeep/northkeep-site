import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { defineConfig, loadEnv, type Plugin } from "vite";
import { normalizeBase } from "./base-path";

const root = import.meta.dirname;
const outDir = path.resolve(root, "dist");

function spaFallback(): Plugin {
  return {
    name: "github-pages-spa-fallback",
    apply: "build",
    writeBundle() {
      const index = path.join(outDir, "index.html");
      fs.copyFileSync(index, path.join(outDir, "404.html"));
      fs.copyFileSync(index, path.join(outDir, "privacidade.html"));
    },
  };
}

export default defineConfig(({ mode }) => {
  const fileEnv = loadEnv(mode, root, "");
  const base = normalizeBase(
    process.env.VITE_BASE_PATH ?? fileEnv.VITE_BASE_PATH
  );

  return {
    base,
    plugins: [react(), tailwindcss(), spaFallback()],
    resolve: {
      alias: {
        "@": path.resolve(root, "client", "src"),
      },
    },
    envDir: root,
    root: path.resolve(root, "client"),
    publicDir: path.resolve(root, "client", "public"),
    build: {
      outDir,
      emptyOutDir: true,
    },
    server: {
      host: true,
      port: 5173,
      fs: { allow: [root] },
    },
  };
});
