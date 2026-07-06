import { formatFixtureMessage, listFixtureFiles, loadFixture } from "./lib/emailMessage.ts";
import { getTelegramConfig, loadEnv } from "./lib/env.ts";
import { sendTelegramMessage, sleep } from "./lib/telegram.ts";

loadEnv();

const filter = process.argv[2];
const files = listFixtureFiles(filter);
const { token, chatId } = getTelegramConfig();

console.log(`Sending ${files.length} message(s) to Telegram chat ${chatId}…`);
console.log();

for (const fileName of files) {
  const email = loadFixture(fileName);
  const text = formatFixtureMessage(email);

  await sendTelegramMessage(token, chatId, text);
  console.log(`✓ ${fileName} (${text.length} chars)`);

  if (files.length > 1) {
    await sleep(500);
  }
}

console.log();
console.log("Done.");
