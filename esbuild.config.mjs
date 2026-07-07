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
  footer: {
    js: `
// Top-level entry points for Apps Script UI and triggers.
function processFlightAlerts() {
  return globalThis.processFlightAlerts();
}
function setupTrigger() {
  return globalThis.setupTrigger();
}
function setTelegramConfig(token, chatId) {
  return globalThis.setTelegramConfig(token, chatId);
}
`,
  },
});

copyFileSync("src/appsscript.json", "dist/appsscript.json");
