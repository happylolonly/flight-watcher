# Development guide

Develop **inside the Dev Container** only. Do not run `npm` on the host.

Stack: TypeScript, clasp, esbuild, Node.js 22.

On first open, `.devcontainer/post-create.sh` runs `npm install` and `npm run build`.

## Quick start

1. Command Palette → **Dev Containers: Reopen in Container**
2. Wait for `post-create` to finish
3. Configure clasp:
   ```bash
   cp .clasp.json.example .clasp.json
   ```
   Add your Apps Script **Script ID** to `.clasp.json`.
4. Log in and deploy:
   ```bash
   npx clasp login
   npm run push
   ```

## clasp login in Dev Container

`npx clasp login --no-localhost` no longer works (Google deprecated OOB OAuth).

**Recommended flow:**

```bash
npx clasp login
```

1. Open the printed URL in a browser on your **host** machine.
2. Sign in and grant access.
3. The browser redirects to `http://localhost:PORT/?code=...` and fails to connect — expected.
4. Copy the **full URL** from the address bar.
5. In a **new** container terminal:
   ```bash
   curl 'http://localhost:PORT/?code=...'
   ```
6. Verify:
   ```bash
   npx clasp login --status
   ```

Credentials are saved to `~/.clasprc.json` (never commit).

### Custom GCP OAuth client (optional)

For CI or org policies that block clasp's built-in client:

1. Create a **Desktop app** OAuth client in [Google Cloud Console](https://console.cloud.google.com/apis/credentials).
2. Download JSON as `creds.json` (see `creds.json.example`).
3. Log in:
   ```bash
   npx clasp login --creds ./creds.json
   ```
   Use the same curl workaround as above if needed.

Enable [Apps Script API](https://console.cloud.google.com/apis/library/script.googleapis.com) and turn it on at https://script.google.com/home/usersettings.

## First-time Apps Script setup

1. Create a bot in [@BotFather](https://t.me/BotFather) and send it a message.
2. Copy local env:
   ```bash
   cp .env.example .env
   ```
3. Set `TELEGRAM_BOT_TOKEN` in `.env` (gitignored).
4. Run:
   ```bash
   ./scripts/setup.sh
   ```
5. In the Apps Script UI (link printed by the script):
   - **Script Properties:** `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`
   - **Run** → `processFlightAlerts` (authorize Gmail)
   - **Run** → `setupTrigger` (once)

Prefer UI setup over `clasp run` — it requires a linked GCP project and often hangs in devcontainer.

## Script Properties (Apps Script runtime)

| Key | Description |
|-----|-------------|
| `TELEGRAM_BOT_TOKEN` | Telegram bot token |
| `TELEGRAM_CHAT_ID` | Target chat ID for notifications |

## Local email preview

See [fixtures/emails/README.md](../fixtures/emails/README.md).

```bash
npm run preview:emails
npm run send:telegram
node --experimental-strip-types scripts/fetch-telegram.ts   # debug incoming updates
```

## Workflow

```text
edit in devcontainer
        ↓
npm run build
        ↓
npm run push
        ↓
Apps Script (trigger every 5 min)
```

## CI (GitHub Actions)

Workflow: `.github/workflows/deploy.yml` — runs on push to `main`.

| Secret | Content |
|--------|---------|
| `CLASP_SCRIPT_ID` | Apps Script Script ID |
| `CLASP_RC` | Full `~/.clasprc.json` from `cat ~/.clasprc.json` |
| `CLASP_CREDENTIALS` | Full `creds.json` (only if using custom GCP OAuth) |

Never commit secrets. `CLASP_RC` is the authorized session; `CLASP_CREDENTIALS` is the OAuth app identity.
