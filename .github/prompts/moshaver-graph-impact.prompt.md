# Moshaver graph impact analysis

Use Graphify first to answer the requested change-impact question.

1. Identify the primary concepts/modules involved.
2. Trace direct and transitive callers/consumers.
3. Identify affected API contracts, migrations, admin UI, student UI/core, tests, and documentation.
4. Separate EXTRACTED evidence from inferred relationships when Graphify exposes that distinction.
5. Verify the most important paths in source.
6. Return a compact impact map: must-change, should-check, unlikely-to-change, risks, and validation commands.

Do not modify code unless explicitly requested.
