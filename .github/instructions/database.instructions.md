---
description: Database schema, query, migration, and persistence guidance.
applyTo: "**/*.sql,**/*.prisma,**/migrations/**/*,**/schema/**/*"
---
# Database

- Detect the database engine, ORM/query layer, schema source of truth, migrations, seeds, and deployment model.
- Inspect existing data compatibility before schema changes.
- Prefer explicit constraints and indexes justified by real access patterns.
- Treat destructive migrations, large backfills, lock-heavy changes, and data rewrites as rollout-sensitive.
- Do not run destructive database commands without explicit authorization.
