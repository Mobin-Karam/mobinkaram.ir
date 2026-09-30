# Universal AI Engineering Toolkit v3

This `.github` package is designed to be copied into different repositories without assuming a particular stack.

## What it provides

- Repository-wide and path-specific AI instructions
- Specialized custom agents
- Reusable engineering skills
- Reusable prompt files
- Project discovery and generic validation scripts
- Safety/session hooks compatible with GitHub Copilot hook configuration v1
- Generic issue and pull-request templates
- An AI-toolkit self-check workflow
- Optional templates for CI, Dependabot, CODEOWNERS, and release configuration

## Start

```bash
chmod +x .github/ai-toolkit/scripts/*.sh
.github/ai-toolkit/scripts/detect-project.sh
cat .agent-state/project.json
.github/ai-toolkit/scripts/validate-project.sh quick
```

On Windows PowerShell:

```powershell
.github/ai-toolkit/scripts/detect-project.ps1
.github/ai-toolkit/scripts/validate-project.ps1 quick
```

## Configuration

Edit `.github/ai-toolkit/config.json` to tune discovery, safety, and validation behavior.

The toolkit intentionally does not activate stack-specific Dependabot or production CI configuration automatically. Generate those after project discovery using the provided prompt/template so copying this folder cannot silently introduce an incorrect pipeline.

## Upgrade note

This version replaces hard-coded application paths and framework assumptions from the previous package. See `.github/ai-toolkit/MIGRATION.md`.
