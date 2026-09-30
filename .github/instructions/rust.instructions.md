---
description: Rust engineering rules.
applyTo: "**/*.rs,**/Cargo.toml,**/Cargo.lock"
---
# Rust

- Respect workspace/crate boundaries and existing feature flags.
- Prefer explicit error propagation and avoid unnecessary `unwrap`/`expect` in production paths.
- Run formatting/check/tests through project commands or Cargo as appropriate.
- Do not assume Tokio, Axum, Tauri, Actix, or another ecosystem crate until verified.
