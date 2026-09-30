---
name: api-contract-validation
description: Trace and validate API contracts across producers, consumers, schemas, errors, authentication, pagination, and versioning.
---

# Api Contract Validation Skill

## Contract checklist
- method/transport and route/topic
- authentication/authorization
- path/query/header/body schema
- response schema and status codes
- error envelope
- pagination/filter/sort semantics
- idempotency/retry behavior
- realtime/event payloads when applicable
- generated clients/types/docs
- frontend/mobile/external consumers

Before changing a shared contract, find all known consumers. Prefer additive/backward-compatible changes unless breaking behavior is explicitly intended.
