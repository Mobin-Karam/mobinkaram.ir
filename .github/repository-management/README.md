# Repository management

This directory stores the source-of-truth conventions for GitHub repository operations that are not application code.

## Working model

- feature/fix/refactor/chore branches start from `develop`;
- pull requests normally target `develop`;
- `develop` is promoted to `main` through a reviewed release/integration PR;
- issues should reference the affected component and acceptance criteria;
- architecture work should link the relevant architecture epic/ADR;
- releases should use tags and GitHub Releases rather than undocumented branch states.

## Labels

Recommended groups:

- type: `bug`, `feature`, `refactor`, `docs`, `security`, `chore`
- component: `backend`, `admin`, `student`, `student-core`, `contracts`, `devops`, `ai-tooling`
- architecture: `cmb`, `architecture`
- priority: `priority:P0`, `priority:P1`, `priority:P2`, `priority:P3`
- workflow: `blocked`, `needs-design`, `needs-tests`, `ready-for-review`

Graphify is used for repository understanding and impact analysis, not as a substitute for code review.
