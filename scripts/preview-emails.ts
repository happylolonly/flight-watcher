import { formatFixtureMessage, listFixtureFiles, loadFixture } from "./lib/emailMessage.ts";

const filter = process.argv[2];
const files = listFixtureFiles(filter);

if (files.length === 0) {
  console.error("No fixtures found in fixtures/emails/");
  console.error("Add *.email.txt or *.eml files — see fixtures/emails/README.md");
  process.exit(1);
}

for (const fileName of files) {
  const email = loadFixture(fileName);
  const message = formatFixtureMessage(email);
  const separator = "=".repeat(72);

  console.log(separator);
  console.log(`FILE: ${fileName}`);
  console.log(`LENGTH: ${message.length} chars`);
  console.log(separator);
  console.log(message);
  console.log();
}
