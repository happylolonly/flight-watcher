export function extractPlainBody(plain: string, html: string): string {
  if (plain.trim()) {
    return plain;
  }

  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
