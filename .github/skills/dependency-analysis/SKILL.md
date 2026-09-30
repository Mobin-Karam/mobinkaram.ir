---
name: dependency-analysis
description: Analyze dependency usage, duplication, licensing/security signals, upgrade impact, lockfiles, and safe dependency changes.
---

# Dependency Analysis Skill

## Workflow
- Detect package manager and workspace boundaries.
- Confirm whether a dependency is direct, transitive, runtime, dev, or unused.
- Search actual imports/usages before removal.
- Check peer/runtime compatibility from local manifests/lockfiles and current documentation when external verification is needed.
- Upgrade in the smallest compatible step; identify breaking changes and migration work.
- Update lockfiles with the repository's package manager only.
- Run relevant tests/builds after changes.
