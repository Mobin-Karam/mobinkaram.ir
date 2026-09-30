---
applyTo: "**"
---

# Graphify discovery instructions

- Query Graphify before broad repository search when `graphify-out/graph.json` exists.
- Use it for architecture, dependency, caller/callee, ownership, and change-impact questions.
- Verify source before editing; never make a code change based only on graph inference.
- Refresh the graph after significant architecture changes, merges, module moves, or contract refactors.
- If Graphify is missing or stale and cannot be refreshed, continue with normal source discovery and state the limitation.
- For shared API changes, query consumers across backend, admin, student app, student core, and shared contracts.
- For CMB changes, explicitly inspect whether reusable packages depend on Moshaver-specific domain concepts.
