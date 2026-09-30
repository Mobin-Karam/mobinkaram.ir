# Design or add a CMB module

Design the requested backend capability as a CMB-compatible module.

Before coding:

1. Query Graphify for existing related services/modules and dependency paths.
2. Decide whether the capability belongs to kernel, reusable platform, infrastructure adapter, or Moshaver product domain.
3. Reuse an existing module when the responsibility already exists.
4. Define public contracts, required/provided capabilities, configuration, persistence ownership, events, security rules, and health behavior.
5. Identify migrations and API compatibility impact.
6. Define tests before implementation.

Reject designs that push Moshaver-specific education concepts into the reusable CMB kernel.
