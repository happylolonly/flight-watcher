/** Exact sender addresses / domains for flight price alert emails only. */
const ALLOWED_SENDER_PATTERNS = [
  "noreply-travel@google.com",
  "googletravel-noreply@google.com",
  "no-reply@sender.skyscanner.com",
  "noreply@trip.com",
  "no-reply@trip.com",
];

const GMAIL_FROM_FILTERS = [
  "from:noreply-travel@google.com",
  "from:googletravel-noreply@google.com",
  "from:sender.skyscanner.com",
  "from:noreply@trip.com",
  "from:no-reply@trip.com",
];

export function isAllowedSender(from: string): boolean {
  const lower = from.toLowerCase();
  return ALLOWED_SENDER_PATTERNS.some((pattern) => lower.includes(pattern));
}

export function unreadFlightAlertQuery(): string {
  return `is:unread (${GMAIL_FROM_FILTERS.join(" OR ")})`;
}
