import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["client/src/**/*.test.ts", "base-path.test.ts"],
  },
});
