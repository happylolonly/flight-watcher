import { copyFileSync, mkdirSync } from "node:fs";
import * as esbuild from "esbuild";

mkdirSync("dist", { recursive: true });

await esbuild.build({
  entryPoints: ["src/main.ts"],
  bundle: true,
  outfile: "dist/Code.js",
  platform: "neutral",
  target: "es2019",
  format: "iife",
  logLevel: "info",
});

copyFileSync("src/appsscript.json", "dist/appsscript.json");
