#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

if [[ -f .env ]]; then
  set -a
  # shellcheck disable=SC1091
  source .env
  set +a
fi

SCRIPT_ID=$(node -e "console.log(JSON.parse(require('fs').readFileSync('.clasp.json','utf8')).scriptId)")
SCRIPT_URL="https://script.google.com/d/${SCRIPT_ID}/edit"

echo "=== Flight Price Alerts — setup ==="
echo

if [[ -z "${TELEGRAM_BOT_TOKEN:-}" ]]; then
  echo "Add TELEGRAM_BOT_TOKEN to .env (see .env.example)"
  exit 1
fi

if [[ -z "${TELEGRAM_CHAT_ID:-}" ]]; then
  echo "Fetching chat ID from getUpdates..."
  RESPONSE=$(curl -s --max-time 15 "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates")
  CHAT_ID=$(echo "$RESPONSE" | node -e "
    const data = JSON.parse(require('fs').readFileSync(0, 'utf8'));
    const updates = data.result ?? [];
    const last = updates[updates.length - 1];
    if (!last?.message?.chat?.id) {
      console.error('No messages found. Send a message to your bot first.');
      process.exit(1);
    }
    console.log(last.message.chat.id);
  ")
  export TELEGRAM_CHAT_ID="$CHAT_ID"
  echo "Detected TELEGRAM_CHAT_ID=$TELEGRAM_CHAT_ID"
  echo
fi

echo "Pushing code to Apps Script..."
if ! printf 'y\n' | npx clasp push 2>/dev/null; then
  npx clasp push
fi

echo
echo "=== Manual steps in Apps Script UI ==="
echo
echo "Open: $SCRIPT_URL"
echo
echo "1. Project Settings (gear) → Script Properties → Add:"
echo "   TELEGRAM_BOT_TOKEN = (from your .env)"
echo "   TELEGRAM_CHAT_ID   = $TELEGRAM_CHAT_ID"
echo
echo "2. Select function 'processFlightAlerts' → Run"
echo "   → Authorize Gmail access when prompted"
echo
echo "3. Select function 'setupTrigger' → Run once"
echo "   → Creates a trigger every 5 minutes"
echo
echo "4. E2E test: send an unread email to your Gmail, wait up to 5 min"
echo
echo "Note: clasp run requires GCP project linking and often hangs in devcontainer."
echo "      UI setup above is the recommended path for MVP."
