import { defineConfig } from "tsup";

export default defineConfig(({ watch }) => ({
  entry: ["index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: !watch,
  outDir: "dist",
  sourcemap: true,
  outExtension({ format }) {
    return {
      js: format === "cjs" ? ".cjs" : ".js",
    };
  },
}));
