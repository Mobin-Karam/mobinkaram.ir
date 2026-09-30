---
description: Security rules for code, configuration, authentication, authorization, and secrets.
applyTo: "**/*"
---
# Security rules

- Never commit or print credentials, private keys, tokens, passwords, production connection strings, or sensitive `.env` values.
- Never bypass authentication, authorization, ownership checks, CSRF protections, tenant/workspace isolation, or validation to make a feature work.
- Validate untrusted input at trust boundaries and encode/escape output for its context.
- Use parameterized database access and safe APIs instead of string-built commands or queries.
- Treat dependency, deserialization, file upload, path traversal, SSRF, injection, XSS, and permission boundaries as relevant when the code exposes those surfaces.
- Prefer least privilege and explicit deny behavior for sensitive operations.
- Report security findings with evidence, impact, and a practical remediation.
