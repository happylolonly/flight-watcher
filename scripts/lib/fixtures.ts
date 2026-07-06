import { readFileSync } from "node:fs";
import { join } from "node:path";

export type ParsedEmail = {
  from: string;
  subject: string;
  plain: string;
  html: string;
};

export const FIXTURES_DIR = join(import.meta.dirname, "../../fixtures/emails");

export function parseTextFixture(content: string): ParsedEmail {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  let from = "";
  let subject = "";
  let bodyStart = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith("From:")) {
      from = line.slice("From:".length).trim();
      continue;
    }
    if (line.startsWith("Subject:")) {
      subject = line.slice("Subject:".length).trim();
      continue;
    }
    if (from && subject && line.trim() === "") {
      bodyStart = i + 1;
      break;
    }
  }

  const body = lines.slice(bodyStart).join("\n");
  const isHtml = /<html|<body|<div|<table/i.test(body);

  return {
    from,
    subject,
    plain: isHtml ? "" : body,
    html: isHtml ? body : "",
  };
}

function decodeQuotedPrintable(value: string): string {
  return value
    .replace(/=\r?\n/g, "")
    .replace(/=([0-9A-F]{2})/gi, (_, hex: string) =>
      String.fromCharCode(parseInt(hex, 16)),
    );
}

export function parseEmlFixture(content: string): ParsedEmail {
  const normalized = content.replace(/\r\n/g, "\n");
  const splitAt = normalized.indexOf("\n\n");
  const headers = splitAt === -1 ? normalized : normalized.slice(0, splitAt);
  const body = splitAt === -1 ? "" : normalized.slice(splitAt + 2);

  const from =
    headers.match(/^From:\s*(.+)$/im)?.[1]?.trim() ??
    headers.match(/^from:\s*(.+)$/im)?.[1]?.trim() ??
    "";
  const subject =
    headers.match(/^Subject:\s*(.+)$/im)?.[1]?.trim() ??
    headers.match(/^subject:\s*(.+)$/im)?.[1]?.trim() ??
    "";

  const plainPart =
    body.match(
      /Content-Type:\s*text\/plain[^\n]*\n(?:[^\n]*\n)*?\n([\s\S]*?)(?:\n--[^\n]+|$)/i,
    )?.[1] ?? "";
  const htmlPart =
    body.match(
      /Content-Type:\s*text\/html[^\n]*\n(?:[^\n]*\n)*?\n([\s\S]*?)(?:\n--[^\n]+|$)/i,
    )?.[1] ?? "";

  if (plainPart || htmlPart) {
    return {
      from,
      subject,
      plain: decodeQuotedPrintable(plainPart).trim(),
      html: decodeQuotedPrintable(htmlPart).trim(),
    };
  }

  const isHtml = /<html|<body|<div|<table/i.test(body);
  const decoded = decodeQuotedPrintable(body).trim();

  return {
    from,
    subject,
    plain: isHtml ? "" : decoded,
    html: isHtml ? decoded : "",
  };
}

export function parseFixture(path: string, content: string): ParsedEmail {
  if (path.endsWith(".eml")) {
    return parseEmlFixture(content);
  }
  return parseTextFixture(content);
}
