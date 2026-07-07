/** Sender addresses or domains for flight price alert emails only. */
const ALLOWED_SENDER_PATTERNS = [
  "noreply-travel@google.com",
  "googletravel-noreply@google.com",
  "sender.skyscanner.com",
  "noreply@trip.com",
  "no-reply@trip.com",
] as const;

const GMAIL_FROM_FILTERS = ALLOWED_SENDER_PATTERNS.map((pattern) => `from:${pattern}`);

export function isAllowedSender(from: string): boolean {
  const lower = from.toLowerCase();
  return ALLOWED_SENDER_PATTERNS.some((pattern) => lower.includes(pattern));
}

export function unreadFlightAlertQuery(): string {
  return `is:unread (${GMAIL_FROM_FILTERS.join(" OR ")})`;
}
