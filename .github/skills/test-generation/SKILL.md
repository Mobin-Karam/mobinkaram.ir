---
name: test-generation
description: Design and implement maintainable unit, integration, contract, end-to-end, and regression tests using existing project tooling.
---

# Test Generation Skill

## Selection guide
- Unit: isolated business rules and transformations.
- Integration: database, framework, service boundary, or module interaction.
- Contract: producer/consumer request-response compatibility.
- E2E: critical user journeys and cross-system behavior.
- Regression: exact failure mode for a fixed bug.

Use existing fixtures/builders. Keep tests deterministic. Avoid real external services unless the repository deliberately uses them. Assert meaningful behavior rather than implementation trivia.
