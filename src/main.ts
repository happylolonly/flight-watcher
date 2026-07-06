import { watchUnreadEmails } from "./gmail/watcher";

function processFlightAlerts(): void {
  watchUnreadEmails();
}

// Apps Script triggers call global functions by name.
(globalThis as Record<string, unknown>).processFlightAlerts =
  processFlightAlerts;
