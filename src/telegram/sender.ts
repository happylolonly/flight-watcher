export function sendTelegramMessage(text: string): void {
  const token = PropertiesService.getScriptProperties().getProperty("TELEGRAM_BOT_TOKEN");
  const chatId = PropertiesService.getScriptProperties().getProperty("TELEGRAM_CHAT_ID");

  if (!token || !chatId) {
    throw new Error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID script property");
  }

  const payload = {
    chat_id: chatId,
    text,
    disable_web_page_preview: false,
  };

  const response = UrlFetchApp.fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify(payload),
      muteHttpExceptions: true,
    },
  );

  if (response.getResponseCode() >= 400) {
    throw new Error(`Telegram API error: ${response.getContentText()}`);
  }
}
