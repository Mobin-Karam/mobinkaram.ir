# Graphify-first repository discovery

Use this skill whenever a task requires understanding architecture, dependency direction, callers/callees, cross-module impact, or where a concept is implemented.

## Policy

1. If `graphify-out/graph.json` exists, query it before broad grep/search.
2. Start with a focused natural-language query.
3. Use path/neighbor queries for cross-module relationships.
4. Open and verify the concrete source files identified by the graph before making changes.
5. If the graph is stale, refresh it through the installed Graphify assistant skill.
6. If Graphify is unavailable or incomplete, fall back to normal repository search and state that limitation.

## Setup

Recommended local install:

```bash
uv tool install "graphifyy[mcp]"
graphify agents install --project
```

For a specific assistant use its project installer, for example `graphify codex install --project`, `graphify claude install --project`, or `graphify gemini install --project`.

Build the initial graph from inside a supported assistant using the Graphify skill. Refresh after substantial pulls/merges or architecture changes.

## Useful queries

```bash
graphify query "how does authentication reach persistence?"
graphify query "what depends on the exam module?"
graphify path "AuthSessionGuard" "Database"
graphify explain "Notifications"
```

## Moshaver-specific use

Before changing shared contracts, query for consumers across `apps/api`, `apps/admin`, `apps/student`, `student-core`, and `packages/api-contract`.

Before CMB refactoring, query dependency paths between common/platform code and Moshaver domain modules to avoid moving product concepts into the reusable kernel.
