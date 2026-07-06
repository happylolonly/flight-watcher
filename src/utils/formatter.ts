export type FlightAlert = {
  provider: string;
  route: string;
  date: string;
  price: string;
  note: string;
  link: string;
};

export function formatFlightAlert(alert: FlightAlert): string {
  const lines = [
    `✈️ ${alert.provider}`,
    "",
    `📍 ${alert.route}`,
    `📅 ${alert.date}`,
    "",
    `💰 ${alert.price}`,
    "",
    alert.note,
  ];

  if (alert.link) {
    lines.push("", `🔗 ${alert.link}`);
  }

  return lines.join("\n");
}
