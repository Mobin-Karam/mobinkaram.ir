---
applyTo: "apps/api/**,packages/backend-*/**,packages/api-contract/**"
---

# CMB backend architecture instructions

CMB means **Composable Modular Backend Architecture**. Issue #21 is the architecture epic.

- Reusable kernel code must not import Moshaver education-domain modules.
- Platform modules expose explicit public contracts and declare dependencies.
- Product modules own Moshaver-specific behavior and policy.
- Controllers/transports should remain thin; application/domain logic must be callable without HTTP request construction.
- Infrastructure/vendor dependencies belong behind adapters where replacement is valuable.
- Persistence ownership and migrations must be deterministic and module-safe.
- Preserve `/api/v2` compatibility during incremental extraction unless a breaking change is explicitly reviewed.
- Run security regression coverage after changes to auth/session/authorization/tenancy/CSRF/realtime scope.
