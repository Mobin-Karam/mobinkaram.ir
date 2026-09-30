---
name: debugging
description: Diagnose failures by reproduction, tracing, hypothesis testing, root-cause isolation, regression tests, and minimal fixes.
---

# Debugging Skill

## Workflow
1. Capture the exact failure, inputs, environment, and expected behavior.
2. Reproduce with the narrowest command/test possible.
3. Trace from the symptom toward the first incorrect state/decision.
4. Compare failing and working paths when available.
5. Form one or more falsifiable hypotheses.
6. Verify before editing.
7. Add a regression test when practical.
8. Implement the root-cause fix.
9. Run targeted and relevant surrounding validation.

Avoid speculative multi-file edits before understanding the failure.
