# Email fixtures for local preview

Copy real alert emails here to preview the Telegram message format.

```bash
npm run preview:emails              # print to terminal
npm run send:telegram               # send all fixtures to Telegram
npm run send:telegram -- skyscanner   # files matching "skyscanner" in the name
```

Requires `.env` with `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`.

## `.email.txt` format (simplest)

Create a file, e.g. `google-flights.email.txt`:

```text
From: Google Flights <alerts@google.com>
Subject: Your flight price dropped

Paste the email body here (plain text or HTML)
```

## `.eml` format

Save an email from Gmail as `.eml` and drop it in this folder.

## Notes

- Real emails are not committed (folder is mostly in `.gitignore`)
- Example file: `example.email.txt`
