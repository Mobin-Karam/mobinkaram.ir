---
description: Universal engineering rules for source code and configuration.
applyTo: "**/*"
---
# Universal engineering rules

- Inspect before editing and preserve existing architecture unless change is required.
- Search for reusable code before creating duplicates.
- Keep shared contracts synchronized across producers and consumers.
- Prefer small, cohesive changes over broad unrelated refactors.
- Maintain backward compatibility by default.
- Do not fabricate routes, fields, environment variables, configuration keys, or dependencies.
- Add or update tests for behavior changes when practical.
- Run the narrowest relevant checks first, then broader validation when needed.
