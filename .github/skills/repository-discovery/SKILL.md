---
name: repository-discovery
description: Discover repository structure, languages, frameworks, package managers, applications, services, persistence, CI/CD, and project commands before implementation.
---

# Repository Discovery Skill

## Workflow
1. Inspect root files and manifests without traversing generated/vendor directories.
2. Detect package/workspace managers and monorepo configuration.
3. Identify applications, libraries, services, CLIs, mobile apps, and infrastructure roots.
4. Detect frameworks from dependencies/configuration, not directory names alone.
5. Locate test, lint, typecheck, format, build, migration, and start commands.
6. Locate persistence, authentication, external integrations, CI/CD, and deployment configuration.
7. Write `.agent-state/project.json` by running `.github/ai-toolkit/scripts/detect-project.sh` when possible.
8. Report verified facts and `UNKNOWN` items separately.

Do not edit product source during discovery unless the user explicitly asks for discovery metadata changes.
