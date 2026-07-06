import { sendTelegramMessage } from "../telegram/sender";
import { extractPlainBody } from "../utils/emailBody";
import { formatEmailForward } from "../utils/formatter";

export function watchUnreadEmails(): void {
  const threads = GmailApp.search("is:unread", 0, 20);

  for (const thread of threads) {
    for (const message of thread.getMessages()) {
      if (!message.isUnread()) {
        continue;
      }

      const text = formatEmailForward(
        message.getFrom(),
        message.getSubject(),
        extractPlainBody(message.getPlainBody(), message.getBody()),
      );

      sendTelegramMessage(text);
      message.markRead();
    }
  }
}
