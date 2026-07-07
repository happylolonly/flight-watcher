# Project structure

Two runtimes:

| Runtime | Location | Deployed? |
|---------|----------|-----------|
| Google Apps Script | `src/` → `dist/` | Yes (`clasp push`) |
| Local Node.js tools | `scripts/` | No |

## Directory tree

```text
flight-alerts/
├── src/                      # Apps Script source (TypeScript)
│   ├── main.ts               # Entry: triggers, Telegram config helper
│   ├── appsscript.json       # GAS manifest (scopes, timezone, V8)
│   ├── gmail/
│   │   └── watcher.ts        # Search unread alerts, forward to Telegram
│   ├── telegram/
│   │   └── sender.ts         # Telegram Bot API sendMessage
│   └── utils/
│       ├── emailBody.ts      # Plain-text extraction from email body
│       ├── formatter.ts      # Telegram message format (from + subject + body)
│       └── senderFilter.ts   # Allowed senders + Gmail search query
│
├── dist/                     # Build output for clasp (gitignored)
│   ├── Code.js               # Bundled IIFE from esbuild
│   └── appsscript.json
│
├── scripts/                  # Local dev utilities (Node, not deployed)
│   ├── setup.sh              # Push code + print Apps Script setup steps
│   ├── preview-emails.ts     # Preview fixture emails as Telegram messages
│   ├── send-telegram.ts      # Send fixture messages to Telegram
│   ├── fetch-telegram.ts     # Inspect bot getUpdates (debug)
│   └── lib/                    # Shared helpers for scripts/
│
├── fixtures/emails/          # Sample emails for local preview (mostly gitignored)
│
├── .devcontainer/            # Dev Container (Node 22)
├── .github/workflows/        # CI: build + clasp push on main
│
├── esbuild.config.mjs        # Bundle src/main.ts → dist/Code.js
├── package.json
├── tsconfig.json
├── .clasp.json.example       # clasp project config template
└── creds.json.example        # GCP OAuth client template for clasp --creds
```

## Apps Script entry points

esbuild bundles `src/main.ts` and emits top-level wrappers in `dist/Code.js` so these appear in the Apps Script UI and triggers:

| Function | Purpose |
|----------|---------|
| `processFlightAlerts` | Poll Gmail and forward new alert emails |
| `setupTrigger` | Create a 5-minute time-based trigger (idempotent) |
| `setTelegramConfig` | Set `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` in Script Properties |

## Email sources (filtered)

Only unread messages from known flight-alert senders are processed. See `src/utils/senderFilter.ts`:

- Google Flights (`noreply-travel@google.com`, `googletravel-noreply@google.com`)
- Skyscanner (`sender.skyscanner.com`)
- Trip.com (`noreply@trip.com`, `no-reply@trip.com`)

## Config files (not committed)

| File | Purpose |
|------|---------|
| `.clasp.json` | Apps Script `scriptId`, `rootDir: dist` |
| `.clasprc.json` | clasp OAuth tokens (user home or CI secret) |
| `creds.json` | GCP OAuth client for `clasp login --creds` |
| `.env` | Local `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` |

## npm scripts

| Command | Description |
|---------|-------------|
| `npm run build` | Bundle to `dist/Code.js` |
| `npm run push` | `build` + `clasp push` |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run preview:emails` | Print Telegram preview from fixtures |
| `npm run send:telegram` | Send fixture messages to Telegram |
