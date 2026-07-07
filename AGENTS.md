# Agent instructions

**Language:** Respond to the user in **Russian**. Project documentation is in **English**.

## Project

Flight price alerts: Gmail → Google Apps Script → Telegram. MVP, no backend.

Read first:

- [docs/structure.md](docs/structure.md) — layout, runtimes, entry points
- [docs/product.md](docs/product.md) — goals and constraints
- [docs/progress.md](docs/progress.md) — current status and checklist
- [docs/dev.md](docs/dev.md) — devcontainer, clasp, CI

## Rules

- Develop only in the **Dev Container**; do not assume host `npm` works.
- **Never commit:** `.env`, `.clasp.json`, `.clasprc.json`, `creds.json`, real email fixtures.
- `src/` deploys to Apps Script via `npm run push`; `scripts/` is local Node only.
- Keep Apps Script code thin — no heavy business logic in `src/`.
- Run `npm run build` before push; prefer `npm run push` over manual clasp.
- Minimize diff scope; match existing TypeScript and file layout conventions.
- Do not add tests or docs unless asked.

## Code map

| Area | Path |
|------|------|
| GAS entry + triggers | `src/main.ts` |
| Gmail polling | `src/gmail/watcher.ts` |
| Sender allowlist | `src/utils/senderFilter.ts` |
| Telegram send | `src/telegram/sender.ts` |
| Bundle config | `esbuild.config.mjs` |
| First-time setup | `scripts/setup.sh` |
| CI deploy | `.github/workflows/deploy.yml` |

## clasp notes

- Use `npx clasp`, not global `clasp`.
- `--no-localhost` is broken on clasp 2.x; use normal `login` + curl workaround in devcontainer (see [docs/dev.md](docs/dev.md)).
