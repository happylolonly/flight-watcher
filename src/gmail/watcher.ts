import { sendTelegramMessage } from "../telegram/sender";
import { extractPlainBody } from "../utils/emailBody";
import { formatEmailForward } from "../utils/formatter";
import { isAllowedSender, unreadFlightAlertQuery } from "../utils/senderFilter";

export function watchUnreadEmails(): void {
  const threads = GmailApp.search(unreadFlightAlertQuery(), 0, 20);

  for (const thread of threads) {
    for (const message of thread.getMessages()) {
      if (!message.isUnread()) {
        continue;
      }

      if (!isAllowedSender(message.getFrom())) {
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
