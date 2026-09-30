# Migration from the previous package

## Changed

- Added `.github/copilot-instructions.md` and root `AGENTS.md`.
- Replaced hard-coded `cloud-api`, `cloud-frontend`, and `mobile` discovery with manifest-based repository detection.
- Converted reusable prompts to the `*.prompt.md` naming convention.
- Replaced legacy hook files with hook configuration version `1`.
- Added the missing end/session behavior through maintained scripts.
- Made architecture, research, and audit agents read-only.
- Added orchestrator, researcher, planner, implementer, debugger, test, code-review, DevOps, performance, release, and documentation roles.
- Added language/path instructions that only apply when matching files exist.
- Added generic validation that delegates to the repository's own scripts/tools.
- Added project templates without activating stack-specific CI/dependency settings prematurely.

## Removed assumptions

The core no longer assumes NestJS, Prisma, PostgreSQL, JWT, React Query, Next.js, Tauri, tenant IDs, or specific app directory names. Those technologies are detected and existing repository conventions take precedence.
