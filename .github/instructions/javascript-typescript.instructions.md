---
description: JavaScript and TypeScript guidance that follows the project's detected runtime and tooling.
applyTo: "**/*.js,**/*.jsx,**/*.mjs,**/*.cjs,**/*.ts,**/*.tsx,**/*.mts,**/*.cts"
---
# JavaScript / TypeScript

- Detect package manager, runtime, framework, formatter, linter, test runner, module system, and TypeScript configuration before editing.
- Respect existing path aliases, strictness, generated code boundaries, and package/module ownership.
- Avoid `any`, unsafe assertions, and broad lint suppression unless justified by existing patterns.
- Use project scripts from `package.json` rather than inventing commands.
- Do not assume React, Next.js, Node.js, Bun, Deno, NestJS, Prisma, or any particular library until verified.
