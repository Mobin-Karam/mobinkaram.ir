# Moshaver repository-wide Copilot instructions

- Read `AGENTS.md` first; it is the canonical repository contract.
- **Graphify first:** when `graphify-out/graph.json` exists, use the graph to locate architecture, callers, consumers, and change impact before broad repository search. Verify the source files you will change.
- If the graph is missing/stale and Graphify is available, refresh it before architecture-wide work. Do not block a small fix solely because Graphify is unavailable.
- Read the nearest applicable `.github/instructions/*.instructions.md` files.
- Moshaver is a monorepo: `apps/api`, `apps/admin`, `apps/student`, `student-core`, and `packages/api-contract` can affect each other.
- Backend architectural work must follow the CMB direction tracked by issue #21: reusable kernel/platform modules must not depend on education-domain modules.
- Prefer existing repository conventions and dependencies. Avoid unnecessary rewrites or new packages.
- Search/query callers, consumers, tests, types, schemas, routes, migrations, and configuration before changing a shared contract.
- Keep changes focused, reversible, and compatible unless a breaking change is explicitly approved.
- Never expose, print, commit, or fabricate secrets or production data.
- Never disable authentication, authorization, CSRF, validation, tenant isolation, or security checks to fix functionality.
- For bugs: trace the failure, identify root cause, implement the smallest fix, and add a regression test when practical.
- For database changes: inspect schema, migrations, indexes, constraints, consumers, rollback and rollout safety.
- For UI changes: preserve design tokens and handle loading, empty, error, disabled, accessibility, responsive, keyboard, theme, localization and RTL states where relevant.
- For API changes: verify actual request/response/error/auth contracts and identify both admin and student consumers.
- Use project-defined lint, test, typecheck, format, and build commands. Never report a check as passing unless it ran successfully.
- Reference concrete file paths for repository-specific findings.
- Mark unresolved facts as `UNKNOWN` rather than inventing them.
