---
description: Stack-agnostic server and API guidance.
applyTo: "**/*.ts,**/*.js,**/*.py,**/*.go,**/*.rs,**/*.java,**/*.kt,**/*.cs,**/*.php,**/*.rb,**/*.graphql,**/*.gql,**/*.proto"
---
# Backend / API

- Detect the server framework, routing, validation, auth, persistence, jobs/queues, logging, and error conventions.
- Keep transport/controller layers thin when the project already separates business logic.
- Validate input at boundaries and enforce authorization/ownership close to protected operations.
- Before changing an API contract, find request/response types and all known consumers.
- Preserve observability and meaningful errors without leaking sensitive internals.
