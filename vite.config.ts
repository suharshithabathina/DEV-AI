import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  nitro: {
    preset: "vercel",
    output: {
      dir: ".vercel/output"
    }
  },
  vite: {
    server: {
      port: 8082,
      strictPort: true,
      host: true
    }
  }
});

