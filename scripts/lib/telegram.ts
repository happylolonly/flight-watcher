export async function sendTelegramMessage(
  token: string,
  chatId: string,
  text: string,
): Promise<void> {
  const response = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        disable_web_page_preview: false,
      }),
    },
  );

  const data = (await response.json()) as { ok: boolean; description?: string };
  if (!response.ok || !data.ok) {
    throw new Error(data.description ?? `Telegram API error (${response.status})`);
  }
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
