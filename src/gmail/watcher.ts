import { parseGoogleFlights } from "../parser/googleFlights";
import { parseSkyscanner } from "../parser/skyscanner";
import { parseTrip } from "../parser/trip";
import { sendTelegramMessage } from "../telegram/sender";
import type { FlightAlert } from "../utils/formatter";

type ProviderParser = (email: GoogleAppsScript.Gmail.GmailMessage) => FlightAlert | null;

const PARSERS: Array<{ match: (from: string) => boolean; parse: ProviderParser }> = [
  { match: (from) => from.includes("google.com"), parse: parseGoogleFlights },
  { match: (from) => from.includes("trip.com"), parse: parseTrip },
  { match: (from) => from.includes("skyscanner"), parse: parseSkyscanner },
];

export function watchUnreadEmails(): void {
  const threads = GmailApp.search("is:unread", 0, 20);

  for (const thread of threads) {
    for (const message of thread.getMessages()) {
      if (!message.isUnread()) {
        continue;
      }

      const from = message.getFrom().toLowerCase();
      const parser = PARSERS.find((entry) => entry.match(from));
      if (!parser) {
        continue;
      }

      const alert = parser.parse(message);
      if (!alert) {
        continue;
      }

      sendTelegramMessage(alert);
      message.markRead();
    }
  }
}
