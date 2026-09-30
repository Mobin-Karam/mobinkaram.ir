---
description: Python guidance that follows detected packaging, typing, formatting, testing, and framework conventions.
applyTo: "**/*.py,**/pyproject.toml,**/requirements*.txt,**/Pipfile,**/uv.lock,**/poetry.lock"
---
# Python

- Detect Python version, package manager, virtual-environment workflow, formatter, linter, type checker, test runner, and framework.
- Respect package boundaries and existing import style.
- Prefer explicit error handling and type hints where the project uses typing.
- Do not assume Django, FastAPI, Flask, pytest, Ruff, Poetry, or uv until verified.
