---
name: migration-planning
description: Plan safe schema, data, API, dependency, or architecture migrations with compatibility phases, backfills, validation, and rollback/forward-repair.
---

# Migration Planning Skill

## Plan template
- current state and target state
- compatibility constraints
- affected producers/consumers/data
- expand phase
- data backfill/dual-write/translation if needed
- cutover and validation
- contract/deprecation phase
- cleanup/contract phase
- observability and abort criteria
- rollback or forward-repair strategy

Prefer incremental migrations over flag-day changes when production compatibility matters.
