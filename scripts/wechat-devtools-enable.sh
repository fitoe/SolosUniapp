#!/usr/bin/env bash
set -euo pipefail

CLI_PATH="${WECHAT_DEVTOOLS_CLI:-C:\\Program Files (x86)\\Tencent\\微信web开发者工具\\cli.bat}"
PROJECT_PATH="${WECHAT_MINIPROGRAM_PROJECT_PATH:-}"
AUTO_PORT="${WECHAT_AUTO_PORT:-9420}"
HTTP_PORT="${WECHAT_DEVTOOLS_HTTP_PORT:-}"

if [[ -z "$PROJECT_PATH" ]]; then
  echo "WECHAT_MINIPROGRAM_PROJECT_PATH is required" >&2
  exit 1
fi

args=(
  auto
  --project "$PROJECT_PATH"
  --auto-port "$AUTO_PORT"
)

if [[ -n "$HTTP_PORT" ]]; then
  args+=(--port "$HTTP_PORT")
fi

"$CLI_PATH" "${args[@]}"
