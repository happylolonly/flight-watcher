import type { FlightAlert } from "../utils/formatter";

export function parseGoogleFlights(
  email: GoogleAppsScript.Gmail.GmailMessage,
): FlightAlert | null {
  return {
    provider: "Google Flights",
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
