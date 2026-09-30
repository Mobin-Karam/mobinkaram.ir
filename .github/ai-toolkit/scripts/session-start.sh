#!/usr/bin/env bash
set -euo pipefail
ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
export AI_TOOLKIT_ROOT="$ROOT"
exec python3 "$ROOT/.github/ai-toolkit/scripts/session_start.py"
