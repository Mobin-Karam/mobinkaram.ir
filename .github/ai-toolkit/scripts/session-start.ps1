$root = git rev-parse --show-toplevel 2>$null
if (-not $root) { $root = (Get-Location).Path }
$env:AI_TOOLKIT_ROOT = $root
python "$root/.github/ai-toolkit/scripts/session_start.py"
