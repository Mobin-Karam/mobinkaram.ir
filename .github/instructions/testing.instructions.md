---
description: Testing and validation rules for all project types.
applyTo: "**/*"
---
# Testing rules

- Detect and use the repository's existing testing framework and conventions.
- For bugs, prefer a regression test that fails before the fix and passes after it.
- Test behavior and contracts rather than private implementation details where possible.
- Cover success, failure, boundary, authorization, and state-transition cases when relevant.
- Do not delete or weaken tests only to obtain a green build.
- Never claim validation passed unless the command was executed successfully.
