import type { FlightAlert } from "../utils/formatter";

export function parseSkyscanner(
  email: GoogleAppsScript.Gmail.GmailMessage,
): FlightAlert | null {
  return {
    provider: "Skyscanner",
    route: "—",
    date: "—",
    price: "—",
    note: email.getSubject(),
    link: extractFirstUrl(email.getPlainBody()),
  };
}

function extractFirstUrl(body: string): string {
  const match = body.match(/https?:\/\/\S+/);
  return match?.[0] ?? "";
}
