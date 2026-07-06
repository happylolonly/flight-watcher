#!/usr/bin/env bash
set -euo pipefail

NPM_CACHE_DIR="/home/node/.cache/npm"
if [ -d "$NPM_CACHE_DIR" ]; then
  sudo chown -R node:node "$NPM_CACHE_DIR"
fi

PLUGINS_DIR="/home/node/.claude/plugins"
if [ -d "$PLUGINS_DIR" ]; then
  sudo chown -R node:node "$PLUGINS_DIR"
fi

CLAUDE_BIN="$(command -v claude || true)"
if [ -n "$CLAUDE_BIN" ]; then
  mkdir -p /home/node/.local/bin
  ln -sf "$CLAUDE_BIN" /home/node/.local/bin/claude
fi

CLAUDE_CONFIG="/home/node/.claude/.claude.json"
if [ ! -f "$CLAUDE_CONFIG" ]; then
  LATEST_BACKUP="$(ls -1t /home/node/.claude/backups/.claude.json.backup.* 2>/dev/null | head -1 || true)"
  if [ -n "$LATEST_BACKUP" ]; then
    cp "$LATEST_BACKUP" "$CLAUDE_CONFIG"
  else
    echo '{}' > "$CLAUDE_CONFIG"
  fi
fi
ln -sfn "$CLAUDE_CONFIG" /home/node/.claude.json

if [ -f package.json ]; then
  npm install
  npm run build
fi
