---
name: git-workflow
description: Work safely with Git branches, commits, diffs, merges, rebases, pull requests, and repository state without losing user work.
---

# Git Workflow Skill

## Safety rules
- Inspect `git status`, current branch, remotes, and relevant diff before disruptive operations.
- Preserve uncommitted user changes.
- Do not run `reset --hard`, destructive `clean`, force push, or history rewrites unless explicitly requested and understood.
- Keep commits focused when the user requests commits.
- Before merge/rebase, identify conflicts and branch relationship.
- Before PR/release work, validate the intended base/head and repository policy.
