---
name: code-review
description: Perform evidence-based code review focused on correctness, regressions, security, contracts, tests, performance, and maintainability.
---

# Code Review Skill

## Review order
1. Correctness and user-visible regressions.
2. Security/authorization/data exposure.
3. Data integrity and migration safety.
4. Contract compatibility and consumers.
5. Concurrency/state/lifecycle behavior.
6. Tests and validation gaps.
7. Performance risks with plausible impact.
8. Maintainability and unnecessary complexity.

Findings should include severity, file/location, evidence, impact, and remediation. Skip purely stylistic comments covered by formatters unless they affect clarity or correctness.
