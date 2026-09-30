---
name: performance-analysis
description: Measure and optimize runtime, database, network, frontend, memory, concurrency, and build performance based on evidence.
---

# Performance Analysis Skill

## Workflow
1. Define the metric and target (latency, throughput, memory, bundle size, query count, etc.).
2. Establish a baseline.
3. Find the dominant cost with profiling/logs/query plans/build analyzers where available.
4. Choose the smallest high-leverage change.
5. Preserve correctness and resource limits.
6. Measure again and document the before/after result.

Do not add caches, indexes, workers, parallelism, or complexity without evidence they address the bottleneck.
