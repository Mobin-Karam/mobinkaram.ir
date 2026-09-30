---
description: Infrastructure, containers, CI/CD, and deployment guidance.
applyTo: "**/Dockerfile,**/docker-compose*.yml,**/docker-compose*.yaml,**/compose*.yml,**/compose*.yaml,**/.github/workflows/*.yml,**/.github/workflows/*.yaml,**/*.tf,**/*.hcl,**/k8s/**/*,**/helm/**/*"
---
# Infrastructure / DevOps

- Detect the deployment platform and existing CI/CD model before editing.
- Preserve secret boundaries and least-privilege permissions.
- Pin or constrain critical tool/action versions according to repository policy.
- Avoid destructive deployment or infrastructure commands without explicit user intent.
- Keep local, CI, staging, and production behavior distinguishable.
