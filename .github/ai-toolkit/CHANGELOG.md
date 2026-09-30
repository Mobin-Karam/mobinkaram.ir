# Changelog

## v3.0.0 — Universal toolkit

- Added repository-wide `.github/copilot-instructions.md` and root `AGENTS.md`.
- Added 17 specialized agents with read-only boundaries for research/audit roles.
- Added VS Code handoffs for Plan → Implement → Review flows.
- Added 16 reusable engineering skills.
- Added 11 reusable `*.prompt.md` prompt files.
- Added stack-agnostic instructions for JavaScript/TypeScript, Python, Go, Rust, Java/Kotlin, .NET, frontend, backend, database, infrastructure, security, testing, and docs.
- Added manifest-based repository/component discovery and ignored runtime context under `.agent-state/`.
- Added nested-monorepo validation for common Node.js, Python, Go, Rust, Java/Gradle, .NET, PHP, Ruby, Dart/Flutter, and Swift projects when their toolchains are available.
- Replaced legacy hooks with GitHub Copilot hook configuration version 1.
- Added a catastrophic-command safety hook and lightweight post-edit guidance hook.
- Added generic PR/issue/security templates and an AI-toolkit self-check workflow.
- Added inactive CI/Dependabot/CODEOWNERS templates so the toolkit does not guess project-specific configuration.
- Preserved the old project-specific version-update prompt as an explicitly inactive legacy example.
