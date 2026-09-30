#  AI Engineering Guide

Moshaver is a multi-application monorepo. Treat this file as the primary repository-wide operating contract for AI coding agents.

## Graphify-first discovery

Before broad grep/search or reading many source files, use the repository knowledge graph when `graphify-out/graph.json` is available.

Preferred order:

1. Query Graphify for the concept, flow, caller/callee relationship, or impact area.
2. Use Graphify path/neighbor information to identify the smallest relevant file set.
3. Open those source files and verify the graph evidence before editing.
4. If the graph is missing or stale, refresh it with the Graphify skill (`/graphify . --update`; Codex uses `$graphify`) when available.
5. Fall back to repository search only when Graphify cannot answer the question or source-level verification is required.

Graph evidence is navigation/context, not a replacement for reading the source of files being changed.

See `docs/architecture/graphify.md` and `.agents/skills/graphify/SKILL.md`.

## Repository architecture

Read `ARCHITECTURE.md` and `docs/architecture/repository-architecture.md` before repository-wide structural work.

The accepted model is a **grouped product monorepo** with a **modular-monolith backend**.

Current physical paths remain valid during migration:

- `apps/api/` — API application/composition root.
- `apps/admin/` — Admin application.
- `apps/student/` — Student application.
- `student-core/` — runtime-neutral Student domain/provider package.
- `packages/api-contract/` — shared API contract package.

Logical dependency direction is effective immediately even before folders move:

```text
applications
    ↓
product/domain code
    ↓
CMB platform modules
    ↓
CMB kernel + public contracts
```

Infrastructure adapters implement lower-level ports and are wired by application composition roots.

Never make a lower/reusable layer depend on a higher/product-specific layer. Cross-project imports must use public entrypoints. See `docs/architecture/dependency-boundaries.md`.

## Workspace foundation

Phase 2 uses `tooling/workspace/projects.json` as the authoritative cross-project package DAG.

The root `package.json` is an orchestration manifest only. It intentionally has no `workspaces` field or dependency list. Existing leaf `package-lock.json` files remain install authority until a separate root-lock migration is explicitly approved.

Before repository-wide validation or package extraction:

```bash
npm run workspace:check
npm run workspace:list
npm run workspace:plan -- build
```

To bootstrap every installable project in dependency order:

```bash
npm run bootstrap
```

To run release-quality component scripts in dependency order:

```bash
npm run verify
```

For one project and its local dependencies:

```bash
node tooling/workspace/run.mjs verify --project=student-app-v2
```

Do not run a root `npm install` expecting unified workspace dependencies. Do not add the npm `workspaces` field, Nx, Turborepo, or a root dependency lock as an incidental change. See `docs/architecture/workspace-foundation.md`.

## Backend architecture direction

The reusable backend initiative is **CMB — Composable Modular Backend Architecture** (tracking epic #21).
Before changing CMB packages or backend composition, read
`docs/architecture/cmb-reference-and-release.md` and run the compatibility and
architecture gates documented there.

When changing backend architecture:

- keep the reusable kernel independent from Moshaver education domains;
- keep product modules such as students, plans, exams, reports, guardian, tasks, and study sessions outside the reusable kernel;
- prefer explicit module contracts and public entrypoints over private cross-module imports;
- keep infrastructure replaceable where portability justifies it;
- preserve `/api/v2` compatibility unless a breaking change is explicitly approved;
- do not weaken authentication, authorization, CSRF, validation, tenant isolation, or audit boundaries;
- do not introduce a microservice boundary without a documented operational reason and ADR.

## First actions

1. Read this file and `.github/copilot-instructions.md`.
2. Query Graphify first when the graph exists.
3. Read `ARCHITECTURE.md` for structural/repository work.
4. Read applicable `.github/instructions/*.instructions.md` files.
5. Run `.github/ai-toolkit/scripts/detect-project.sh` when a shell is available.
6. Read `.agent-state/project.json` if present.
7. Inspect nearby tests, package scripts, migrations, and public contracts before editing.

## Engineering rules

- Repository source and executable tests are authoritative; documentation and graphs may drift.
- Prefer existing libraries, patterns, tokens, modules, and commands.
- Make the smallest complete change that satisfies the requirement.
- Preserve public contracts unless a breaking change is explicitly requested.
- Never invent repository facts. Mark unresolved facts as `UNKNOWN`.
- Never expose, print, commit, or fabricate secrets.
- Never disable security controls to make a change pass.
- For bugs, identify the root cause and add a regression test when practical.
- For database changes, inspect migration history, data compatibility, constraints, and rollback safety.
- For UI work, cover loading, empty, error, disabled, responsive, keyboard, accessibility, theme, and Persian/RTL behavior where relevant.
- For API changes, identify admin/student/other consumers and synchronize shared contracts.
- Do not promote code into a shared package without a clear ownership reason or real second consumer.

## Validation

Use the root workspace graph for repository-level ordering, but keep component-defined scripts authoritative.

### Repository

```bash
npm run workspace:check
npm run workspace:list
npm run verify
```

### Backend

```bash
cd apps/api
npm ci
npm run lint
npm test
npm run build
```

### Admin

```bash
cd apps/admin
npm ci
npm run typecheck
npm run format:check
npm run lint
npm test
npm run test:a11y
npm run build
```

### Student core

```bash
cd student-core
npm ci
npm run build
npm test
```

### Student app

```bash
cd apps/student
npm ci
npm run typecheck
npm test
npm run test:a11y
npm run build
```

Generic toolkit fallback:

```bash
.github/ai-toolkit/scripts/validate-project.sh quick
```

Release-quality fallback:

```bash
.github/ai-toolkit/scripts/validate-project.sh full
```

Never claim a validation command passed unless it actually ran successfully.
