/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  // @ts-expect-error Object literal may only specify known properties, and 'test' does not exist in type 'UserConfigExport'.
  test: {
    globals: true,
  },
});
