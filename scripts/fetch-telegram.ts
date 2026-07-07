import { loadEnv, getTelegramConfig } from "./lib/env.ts";

loadEnv();

const { token } = getTelegramConfig();
const url = `https://api.telegram.org/bot${token}/getUpdates?limit=50&offset=-50`;

const response = await fetch(url);
const data = (await response.json()) as {
  ok: boolean;
  result: Array<{
    update_id: number;
    message?: {
      message_id: number;
      date: number;
      chat: { id: number; title?: string; type: string };
      from?: { id: number; first_name?: string; username?: string };
      text?: string;
    };
  }>;
};

if (!data.ok) {
  console.error("Telegram API error");
  process.exit(1);
}

console.log(`Updates for bot (incoming only, not bot's own sends): ${data.result.length}\n`);

for (const update of data.result) {
  const msg = update.message;
  if (!msg?.text) {
    continue;
  }

  const when = new Date(msg.date * 1000).toISOString();
  const chat = msg.chat.title ?? msg.chat.id;
  const from = msg.from?.username ?? msg.from?.first_name ?? "?";

  console.log("=".repeat(72));
  console.log(`update_id: ${update.update_id} | ${when} | chat: ${chat} | from: ${from}`);
  console.log("=".repeat(72));
  console.log(msg.text);
  console.log();
}

console.log(
  "Note: messages sent BY the bot to the group are not returned by getUpdates.",
);
