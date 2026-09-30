---
description: Go engineering rules.
applyTo: "**/*.go,**/go.mod,**/go.sum"
---
# Go

- Follow module/package boundaries, `gofmt`, and existing error-handling conventions.
- Keep interfaces small and consumer-driven.
- Preserve context cancellation/deadlines in request and I/O paths.
- Use `go test`/project commands and do not add dependencies without checking existing standard-library or project solutions.
