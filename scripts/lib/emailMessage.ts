import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { extractPlainBody } from "../../src/utils/emailBody.ts";
import { formatEmailForward } from "../../src/utils/formatter.ts";
import { FIXTURES_DIR, parseFixture, type ParsedEmail } from "./fixtures.ts";

export function listFixtureFiles(filter?: string): string[] {
  const files = readdirSync(FIXTURES_DIR)
    .filter((name) => name.endsWith(".eml") || name.endsWith(".email.txt"))
    .sort();

  if (!filter) {
    return files;
  }

  const match = files.filter((name) => name.includes(filter));
  if (match.length === 0) {
    throw new Error(`No fixture matching "${filter}"`);
  }
  return match;
}

export function loadFixture(fileName: string): ParsedEmail {
  const path = join(FIXTURES_DIR, fileName);
  if (!existsSync(path)) {
    throw new Error(`Fixture not found: ${fileName}`);
  }

  const email = parseFixture(path, readFileSync(path, "utf8"));
  if (!email.from || !email.subject) {
    throw new Error(`${fileName}: missing From or Subject`);
  }

  return email;
}

export function formatFixtureMessage(email: ParsedEmail): string {
  const body = extractPlainBody(email.plain, email.html);
  return formatEmailForward(email.from, email.subject, body);
}
