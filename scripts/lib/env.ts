import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

export function loadEnv(): void {
  const path = join(import.meta.dirname, "../../.env");
  if (!existsSync(path)) {
    return;
  }

  for (const line of readFileSync(path, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }
    const eq = trimmed.indexOf("=");
    if (eq === -1) {
      continue;
    }
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

export function getTelegramConfig(): { token: string; chatId: string } {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

  if (!token || !chatId) {
    throw new Error(
      "Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID in .env — see .env.example",
    );
  }

  return { token, chatId };
}
