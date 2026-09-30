# Recommended repository settings

This file records the intended GitHub governance for Moshaver. Repository settings should be kept aligned manually or through future administration automation.

## Branch model

- `main` — releasable/production history.
- `develop` — integration branch for active v2 development.
- work branches — branch from `develop`, then merge by pull request.

## Recommended protection

Protect `main` and `develop` with:

- pull requests required;
- required status checks for impacted components;
- conversations resolved before merge;
- stale approvals dismissed when material code changes;
- force pushes disabled;
- branch deletion disabled for protected branches.

`main` should require the complete release gate. `develop` may use path-aware component checks but must not bypass security-sensitive validation.

## Required quality surfaces

- backend quality
- admin quality
- student-core quality
- student-app quality
- repository safety / AI-toolkit checks

## Merge policy

Prefer squash merges for focused feature/fix branches. Use merge commits only when preserving a meaningful multi-branch integration history is useful.

## Release policy

Create versioned GitHub releases/tags for production milestones. Release notes must call out migrations, API compatibility changes, security-impacting changes, and deployment steps.

## AI / Graphify policy

Graphify is a navigation and impact-analysis aid. The repository source, migrations, executable tests, and reviewed contracts remain authoritative.
