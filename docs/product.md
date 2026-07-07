# Product spec

## Goal

Build a lightweight system that receives flight price alerts from multiple services and forwards them to Telegram.

This is an MVP. No backend, database, or scraping for now.

## Architecture

```text
Google Flights / Trip.com / Skyscanner
        │
        ▼
Gmail account
        │
        ▼
Google Apps Script (polling every 5 min)
        │
        ▼
Telegram Bot API
        │
        ▼
Telegram
```

Event-driven via email. No custom polling infrastructure.

## Email sources

Current targets:

- Google Flights
- Trip.com
- Skyscanner

Aviasales is postponed — reliable email price alerts are uncertain.

## Gmail

Prefer a dedicated Gmail account (e.g. `flight-alerts@gmail.com`):

- Isolated from personal mail
- Apps Script can access the whole mailbox safely
- Least privilege vs filtering inside a main inbox
- No forwarding needed if subscriptions use this address directly

## Apps Script role

Keep Apps Script **thin** — an adapter only:

- Detect new unread alert emails
- Extract sender, subject, body
- Send a formatted Telegram message

Avoid in MVP: heavy parsing, history, price comparison, persistence, business logic.

Current implementation forwards raw email content; structured parsing is a later step. See [progress.md](progress.md).

## Telegram

Direct HTTP POST to:

```text
https://api.telegram.org/bot<TOKEN>/sendMessage
```

### Target message format (future)

Instead of raw email forwards:

```text
✈️ Google Flights

📍 Minsk → Beijing
📅 12 Sep

💰 $389

Price dropped

🔗 https://...
```

## Development

Do not use the Apps Script web editor for day-to-day coding. Develop locally with TypeScript, clasp, esbuild, Git.

Details: [dev.md](dev.md). Layout: [structure.md](structure.md).

## Future (post-MVP)

Replace direct Telegram calls with a backend pipeline:

```text
Apps Script → Webhook → FastAPI → Database → Rules → Telegram
```

Apps Script should need minimal changes when migrating.

## Design principles

- Keep the MVP extremely simple
- Avoid scraping for now
- Avoid Gmail API complexity beyond Apps Script built-ins
- Avoid a backend until necessary
- Event-driven architecture
- Thin Apps Script adapter
- Code structured for later backend migration
