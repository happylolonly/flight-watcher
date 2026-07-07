# Flight Price Alerts

Lightweight flight price alerts from email to Telegram.

MVP with no backend, database, or scraping — Gmail → Apps Script → Telegram.

## Architecture

```text
Google Flights / Trip.com / Skyscanner
        │
        ▼
Gmail account
        │
        ▼
Google Apps Script (every 5 min)
        │
        ▼
Telegram Bot API
        │
        ▼
Telegram
```

## Quick start

1. **Dev Containers: Reopen in Container**
2. `cp .clasp.json.example .clasp.json` — add your Script ID
3. `npx clasp login` → deploy: `npm run push`
4. `cp .env.example .env` — add Telegram token → `./scripts/setup.sh`

Full setup (clasp in devcontainer, Script Properties, CI): [docs/dev.md](docs/dev.md).

## Documentation

| Doc | Description |
|-----|-------------|
| [docs/structure.md](docs/structure.md) | Project layout and entry points |
| [docs/dev.md](docs/dev.md) | Development, clasp, CI secrets |
| [docs/progress.md](docs/progress.md) | Status and roadmap checklist |
| [docs/product.md](docs/product.md) | Goals, principles, future vision |
| [AGENTS.md](AGENTS.md) | Instructions for AI agents |

## npm scripts

| Command | Description |
|---------|-------------|
| `npm run build` | Bundle to `dist/Code.js` |
| `npm run push` | Build + `clasp push` |
| `npm run typecheck` | Typecheck without emit |
| `npm run preview:emails` | Preview fixture emails |
| `npm run send:telegram` | Send fixtures to Telegram |
