const TELEGRAM_MAX_LENGTH = 4096;

export function formatEmailForward(
  from: string,
  subject: string,
  body: string,
): string {
  const header = `📧 ${from}\n\n${subject}\n\n`;
  const maxBodyLength = TELEGRAM_MAX_LENGTH - header.length - 20;

  let trimmedBody = body.trim();
  if (trimmedBody.length > maxBodyLength) {
    trimmedBody = `${trimmedBody.slice(0, maxBodyLength)}\n\n… (обрезано)`;
  }

  return `${header}${trimmedBody}`;
}
