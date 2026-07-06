import { watchUnreadEmails } from "./gmail/watcher";

function processFlightAlerts(): void {
  watchUnreadEmails();
}

function setupTrigger(): void {
  const handler = "processFlightAlerts";
  const existing = ScriptApp.getProjectTriggers().some(
    (trigger) => trigger.getHandlerFunction() === handler,
  );

  if (existing) {
    return;
  }

  ScriptApp.newTrigger(handler).timeBased().everyMinutes(5).create();
}

function setTelegramConfig(token: string, chatId: string): void {
  PropertiesService.getScriptProperties().setProperties({
    TELEGRAM_BOT_TOKEN: token,
    TELEGRAM_CHAT_ID: chatId,
  });
}

const globals = globalThis as Record<string, unknown>;
globals.processFlightAlerts = processFlightAlerts;
globals.setupTrigger = setupTrigger;
globals.setTelegramConfig = setTelegramConfig;
