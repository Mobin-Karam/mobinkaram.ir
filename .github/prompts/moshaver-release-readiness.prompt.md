# Release readiness review

Assess whether the requested branch/commit is ready to release.

Check:

- backend lint/test/build and migration safety;
- admin typecheck/format/lint/test/a11y/build;
- student-core build/test;
- student-app typecheck/test/a11y/build;
- security regression coverage for affected boundaries;
- API/shared-contract compatibility;
- migration/deployment configuration;
- documentation/changelog/release notes;
- Graphify impact paths for high-risk changes when available.

Return blockers, warnings, evidence, and exact follow-up actions. Never mark release-ready based on unexecuted checks.
