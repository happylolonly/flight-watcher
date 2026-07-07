# Progress

Living checklist. Product goals and principles: [product.md](product.md).

## Done

- [x] Dev Container (Node.js 22, TypeScript, clasp, esbuild)
- [x] Local build → `clasp push` → Apps Script deploy
- [x] GitHub Actions deploy workflow (`.github/workflows/deploy.yml`)
- [x] Gmail watcher: unread flight-alert emails → Telegram (from + subject + body)
- [x] Sender allowlist (Google Flights, Skyscanner, Trip.com)
- [x] Time-based trigger helper (`setupTrigger`, every 5 minutes)
- [x] OAuth scopes: Gmail modify + external HTTP requests
- [x] Top-level Apps Script entry points via esbuild footer
- [x] Local email fixtures + preview/send scripts
- [x] `creds.json.example` for GCP OAuth / CI

## In progress / setup

- [ ] Create Telegram bot ([@BotFather](https://t.me/BotFather)), fill `.env`, run `./scripts/setup.sh`
- [ ] E2E test: unread alert email in Gmail → message in Telegram
- [ ] Subscribe to price alerts:
  - [Google Flights](https://www.google.com/travel/flights) — Track prices
  - [Trip.com](https://www.trip.com) — Price Alert
  - [Skyscanner](https://www.skyscanner.com) — Get Price Alerts
- [ ] Configure GitHub Secrets for CI: `CLASP_RC`, `CLASP_SCRIPT_ID` (and `CLASP_CREDENTIALS` if using custom GCP OAuth)

## Later

- [ ] Dedicated Gmail account for alerts only
- [ ] Provider-specific parsing (structured Telegram messages instead of raw forward)
- [ ] Parser modules (`src/parser/`) — not started; see [product.md](product.md)
