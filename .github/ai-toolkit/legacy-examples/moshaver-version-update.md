# Legacy project-specific example (inactive)

> Preserved from the previous archive for reference. Do not treat this as universal project guidance.

# Moshaver v1.4 Modernization and Refactoring Task

You are working on the existing **Moshaver v1.4** project.

Your goal is to improve architecture, maintainability, performance, security, testing, and future scalability **without rewriting the application or unnecessarily changing its technology stack**.

## Core principle

Preserve the current strengths of the project:

* Node.js 22 backend
* Native Node HTTP server
* Existing custom router
* SQLite persistence
* Dependency-light architecture
* Static admin PWA
* Static student PWA
* Vanilla JavaScript
* nginx static hosting
* Cookie-based authentication
* CSRF protection
* Server-Sent Events
* Existing Persian RTL user experience

Do not migrate to React, Next.js, NestJS, PostgreSQL, Redis, WebSockets, an ORM, or another major framework unless a concrete technical requirement proves the existing architecture cannot reasonably support the feature.

Prefer improving the current architecture over replacing it.

---

# Current project structure

Primary areas:

```text
v1.4/
├── backend/
├── admin-app/
├── student-app/
└── docs/
```

Backend:

```text
v1.4/backend/src/
├── server.js
├── router.js
├── db.js
├── env.js
├── security.js
└── realtime.js
```

Frontend:

```text
v1.4/admin-app/
v1.4/student-app/
```

Important frontend files currently include:

```text
admin-app/js/admin.js
admin-app/js/api.js

student-app/js/app.js
student-app/js/api.js
```

---

# Existing verified state

Before modifying behavior, preserve the currently working functionality.

Backend validation commands:

```bash
cd v1.4/backend

npm run check
npm run smoke
```

These commands currently pass and must continue passing after backend changes.

Do not claim validation passed unless the commands actually succeed.

---

# Main objective

Transform Moshaver from a growing single-file application into a clearly structured but still simple modular application.

The desired direction is:

```text
simple infrastructure
+
well-separated domains
+
explicit database migrations
+
reusable frontend modules
+
strong permissions
+
good mobile performance
+
automated regression testing
```

Do not introduce enterprise complexity for its own sake.

---

# Phase 0 — Inspect before editing

Before making changes:

1. Inspect the repository structure.
2. Identify the actual backend route registration conventions.
3. Identify database initialization behavior.
4. Inspect all existing backend helpers.
5. Inspect admin and student application startup flows.
6. Identify all duplicated frontend functionality.
7. Identify current role checks and permissions.
8. Identify production environment variables.
9. Inspect Docker/nginx configuration.
10. Inspect existing tests and smoke scripts.

Search for existing implementations before creating new abstractions.

Create a task checklist before editing.

---

# Phase 1 — Backend modularization

The largest immediate technical risk is `src/server.js`.

Do not rewrite it.

Refactor it incrementally without changing behavior.

Move domain-specific routes into modules such as:

```text
backend/src/
├── server.js
├── router.js
├── db.js
├── env.js
├── security.js
├── realtime.js
│
├── routes/
│   ├── auth.routes.js
│   ├── users.routes.js
│   ├── students.routes.js
│   ├── plans.routes.js
│   ├── tasks.routes.js
│   ├── reports.routes.js
│   ├── study.routes.js
│   ├── exams.routes.js
│   ├── quizzes.routes.js
│   ├── chat.routes.js
│   ├── notifications.routes.js
│   ├── imports.routes.js
│   └── admin.routes.js
│
├── services/
│   ├── auth.service.js
│   ├── plans.service.js
│   ├── exams.service.js
│   ├── chat.service.js
│   ├── notification.service.js
│   ├── import.service.js
│   └── audit.service.js
│
└── validation/
    ├── auth.validation.js
    ├── plans.validation.js
    ├── exams.validation.js
    └── imports.validation.js
```

Do not create unnecessary micro-files.

For this project, prefer:

```text
route
→ validation
→ service
→ database
```

Avoid placing all of the following in one route handler:

```text
authentication
validation
SQL
business rules
notifications
SSE
audit
response formatting
```

Keep `server.js` focused on:

```text
configuration
database initialization
middleware/setup
route registration
server startup
graceful shutdown
```

Target approximately a few hundred lines or less after gradual extraction.

---

# Phase 2 — Database migrations

Keep SQLite.

Do not introduce Prisma, Sequelize, Knex, Drizzle, or another ORM unless explicitly requested.

Replace implicit schema evolution with explicit numbered migrations.

Create something like:

```text
backend/src/migrations/
├── 001_initial.js
├── 002_add_student_presence.js
├── 003_add_exam_retry.js
├── 004_add_guardian_relations.js
└── ...
```

Use the existing `schema_migrations` table if present.

The migration runner must:

1. Read previously applied migrations.
2. Execute missing migrations in order.
3. Run each migration safely.
4. Record successful migration completion.
5. Stop startup when a required migration fails.
6. Avoid re-running already completed migrations.

Prefer transactional migrations where SQLite supports the operation.

Do not destroy production data.

Never reset the database to solve a migration issue.

---

# Phase 3 — Data model for future roles

Prepare the system for these user types:

```text
admin
advisor
teacher
student
guardian
```

Do not create completely independent authentication systems.

Prefer one central identity model:

```text
users
```

Conceptually:

```text
id
username/email
password_hash
role
is_active
created_at
updated_at
```

Add relationship tables where needed.

Examples:

```text
advisor_students

advisor_id
student_id
```

```text
teacher_students

teacher_id
student_id
subject_id
```

```text
student_guardians

student_id
guardian_id
relationship
```

Guardian relationships may represent:

```text
parent
mother
father
sibling
other
```

Preserve existing students and authentication data.

Use backward-compatible migrations.

---

# Phase 4 — Permission system

Avoid scattering logic like:

```js
if (user.role === 'admin')
```

throughout the project.

Create a lightweight authorization layer.

Example permission concepts:

```text
students:view
students:manage

plans:view-own
plans:manage

reports:view-own
reports:view-assigned

exams:take
exams:manage

chat:advisor
chat:student

subjects:view
subjects:manage

guardians:view-linked-student
```

Roles should map to permissions.

Example concept:

```js
admin
→ all permissions

advisor
→ assigned student management

teacher
→ assigned student/subject access

student
→ own resources

guardian
→ explicitly linked student resources
```

Every protected backend operation must enforce authorization server-side.

Frontend hiding alone is never authorization.

---

# Phase 5 — Tenant and relationship isolation

Whenever a non-admin role accesses student-related information, verify relationship ownership.

Examples:

An advisor must not access an unrelated student.

A teacher must not access unrelated students or unrelated subjects.

A guardian must only access explicitly linked students.

A student must only access their own private records unless the endpoint intentionally exposes public/shared information.

Create reusable authorization helpers rather than duplicating relationship checks.

Add tests for cross-user access attempts.

---

# Phase 6 — Frontend modularization

Do not rewrite the frontend into React.

First modularize the existing vanilla JavaScript applications.

## Student app target

Move toward:

```text
student-app/js/
├── app.js
├── api.js
│
├── core/
│   ├── auth.js
│   ├── router.js
│   ├── realtime.js
│   └── state.js
│
├── views/
│   ├── today.js
│   ├── plans.js
│   ├── reports.js
│   ├── exams.js
│   ├── chat.js
│   ├── notifications.js
│   ├── reviews.js
│   └── profile.js
│
├── components/
│   ├── modal.js
│   ├── toast.js
│   ├── loader.js
│   ├── empty-state.js
│   ├── confirm-dialog.js
│   └── tabs.js
│
└── utils/
    ├── dom.js
    ├── escape.js
    ├── dates.js
    └── formatting.js
```

## Admin app target

Use the same architectural concept:

```text
admin-app/js/
├── admin.js
├── api.js
│
├── core/
├── views/
├── components/
└── utils/
```

Extract one screen/domain at a time.

Do not perform a giant frontend rewrite.

---

# Phase 7 — Shared frontend code

The admin and student API clients currently contain duplicated behavior.

Extract reusable source for common functionality where reasonable.

Potential shared modules:

```text
frontend-shared/
├── api/
│   ├── client.js
│   ├── csrf.js
│   └── errors.js
│
├── realtime/
│   └── sse.js
│
├── utils/
│   ├── escape.js
│   ├── dates.js
│   └── formatting.js
│
└── components/
    ├── modal.js
    ├── toast.js
    └── loader.js
```

Do not force admin-specific and student-specific UI into the same modules when the workflows are materially different.

---

# Phase 8 — Improve frontend rendering safety

Gradually reduce giant HTML strings and inline event handlers.

Prefer:

```js
element.addEventListener(...)
```

over:

```html
onclick="..."
```

Where practical, create DOM nodes safely instead of interpolating untrusted content into HTML strings.

Use existing escaping utilities consistently.

Never render server-provided untrusted text directly through `innerHTML` without proper sanitization/escaping.

---

# Phase 9 — Design system

Create a lightweight shared UI design system.

Add CSS tokens such as:

```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;

  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;

  --font-sm: 0.875rem;
  --font-md: 1rem;
  --font-lg: 1.25rem;
}
```

Standardize:

```text
buttons
inputs
cards
dialogs
modals
tabs
badges
alerts
toasts
empty states
loading states
spacing
typography
```

Preserve:

```text
Persian language
RTL layout
mobile-first behavior
light/dark mode if already supported
```

Do not redesign the product purely for visual novelty.

Improve consistency and usability.

---

# Phase 10 — Low-end Android performance

The student app must remain usable on inexpensive/older Android devices.

Prioritize:

* Small JavaScript payloads
* Small critical CSS
* Minimal startup requests
* Minimal DOM size
* Pagination
* Incremental rendering
* Avoiding expensive animation
* Avoiding unnecessary libraries
* Efficient image loading
* Service worker correctness
* Offline/error handling

Do not introduce large frontend frameworks unless required.

Prefer native browser APIs when adequate.

Examples:

```text
Intl
IntersectionObserver
requestAnimationFrame
CSS animations
native SVG
dynamic import()
```

Avoid loading hundreds or thousands of records into the DOM.

For chat, notifications, reports, activity, and similar lists, use pagination or incremental loading.

---

# Phase 11 — Optional Vite integration

Vite may be introduced later as a build tool.

If added:

```text
Vanilla JavaScript
+
Vite
```

is preferred over automatically introducing React.

Use Vite for:

* Bundling
* Minification
* Cache-busted filenames
* Development server
* Dynamic imports
* Asset processing
* Production build optimization

Do not introduce Vite before frontend modules have been sensibly separated unless there is a concrete build need.

---

# Phase 12 — Lazy loading

Where useful, load large screens only when opened.

Example:

```js
const { renderChat } =
  await import('./views/chat.js');
```

Potential lazy-loaded areas:

```text
chat
exams
reports
admin analytics
large configuration screens
```

Keep the initial application shell small.

---

# Phase 13 — Keep SSE

Continue using Server-Sent Events for realtime updates.

Current suitable uses include:

```text
chat messages
notifications
task updates
exam updates
activity events
presence-related events
```

Preserve existing reconnect/replay behavior.

Do not migrate to WebSockets unless a concrete bidirectional realtime requirement appears that SSE cannot reasonably support.

---

# Phase 14 — Query and index review

Review frequently used queries.

Use SQLite:

```sql
EXPLAIN QUERY PLAN
```

when investigating performance.

Consider indexes for common access patterns such as:

```text
tasks(student_id, due_date)

chat_messages(conversation_id, created_at)

notifications(user_id, is_read, created_at)

daily_reports(student_id, report_date)

study_sessions(student_id, started_at)

sessions(user_id)

advisor_students(advisor_id, student_id)

teacher_students(teacher_id, student_id)

student_guardians(guardian_id, student_id)
```

Do not create indexes blindly.

Every index should correspond to an actual query pattern, uniqueness requirement, or integrity rule.

---

# Phase 15 — Transactions

Identify operations requiring atomicity.

Examples:

```text
exam submission

quiz submission

JSON import

plan replacement

bulk task creation

student deactivation

student relationship updates

exam publication

retry approvals
```

Use transactions where partial completion would leave inconsistent state.

Pattern:

```text
BEGIN

perform operation

COMMIT
```

On failure:

```text
ROLLBACK
```

Do not leave partially imported or partially submitted records.

---

# Phase 16 — Testing

Keep:

```bash
npm run check
npm run smoke
```

Add focused automated tests using project-appropriate tooling.

For the Node backend, prefer the built-in Node test runner when adequate:

```js
node:test
node:assert
```

Create focused coverage for:

```text
authentication

session lifecycle

CSRF

permissions

role isolation

plans

tasks

reports

study sessions

exams

quiz access

exam retry

JSON import preview

JSON import commit

chat

notifications

SSE replay

guardian relationships

teacher relationships

advisor relationships
```

Pay special attention to authorization failures and malformed input.

---

# Phase 17 — Browser regression tests

Introduce Playwright or an equivalent lightweight browser testing tool.

Cover critical workflows.

Admin/advisor:

```text
login
student lookup
plan creation/editing
chat
exam management
report review
logout
```

Student:

```text
login
view today's plan
complete task
submit report
start exam
submit exam
chat
notifications
logout
```

Run critical mobile views with dimensions such as:

```text
360x800
375x812
412x915
```

Validate RTL layout.

---

# Phase 18 — Security hardening

Preserve all existing:

```text
session security

CSRF

secure cookies

login rate limiting

CORS validation

password hashing

audit logging
```

Do not weaken security to fix a UI/API problem.

Add Content Security Policy through nginx/static hosting.

Prefer introducing CSP in report-only mode first if the current frontend still uses inline handlers.

Gradually eliminate CSP violations.

Target eventually:

```text
default-src 'self'
script-src 'self'
style-src 'self'
img-src 'self' data:
connect-src approved origins
frame-ancestors 'none'
```

Adjust based on actual application requirements.

---

# Phase 19 — Logging

Improve structured application logging without exposing secrets.

Useful fields:

```text
timestamp
level
event
requestId
method
path
status
durationMs
userId
role
```

Never log:

```text
passwords
session tokens
CSRF tokens
raw authorization secrets
environment secrets
```

For security-sensitive actions, continue using the audit log.

---

# Phase 20 — Health and readiness

Preserve health endpoints.

Where useful, distinguish:

```text
/health
/ready
```

`/health` may represent process health.

`/ready` should verify essential dependencies such as SQLite availability.

Do not expose sensitive infrastructure details publicly.

---

# Phase 21 — Database path cleanup

Review the production Docker configuration using:

```text
/data/konkur.sqlite
```

Determine whether a deployed volume currently relies on that exact filename.

Only after confirming production safety, migrate toward the project-consistent name:

```text
/data/moshaver.sqlite
```

Do not simply rename the path and accidentally create a fresh empty database.

Document migration/rollback steps.

---

# Phase 22 — Backup and restore

Document SQLite production backup and restore procedures.

Account for:

```text
database file
WAL
shared-memory file
active writes
```

Prefer SQLite-supported consistent backup procedures.

Document:

```text
backup
restore
verify
rollback
```

Test the restore process using a non-production copy.

---

# Phase 23 — Documentation

Update project documentation whenever architecture or behavior materially changes.

Maintain documentation for:

```text
project architecture
backend modules
frontend modules
database migrations
roles
permissions
environment variables
local development
testing
deployment
backup/restore
release process
```

Keep documentation synchronized with real implementation.

---

# Agent usage

When delegation is available, use specialized agents.

## Frontend Engineer

Use for:

```text
admin/student UI
vanilla JS modules
responsive layout
RTL
PWA behavior
API integration
frontend state
frontend performance
browser tests
```

## Backend Engineer

Use for:

```text
HTTP routes
services
authentication
authorization
business rules
SSE
API behavior
backend tests
```

## Database Architect

Use for:

```text
schema design
relationship design
migration strategy
index review
data integrity
database performance analysis
```

The Database Architect should primarily analyze and recommend.

## Database Engineer

Use for:

```text
migration implementation
query optimization
indexes
transactions
backfills
data repair
database test implementation
```

## Mobile Engineer

Use when the application gains a dedicated native/hybrid mobile layer or when PWA behavior interacts with Android/iOS platform-specific concerns.

Do not create mobile-only duplicated business rules.

---

# Engineering rules

Follow these rules throughout implementation.

## Preserve behavior first

Before refactoring a working domain:

1. Understand the existing behavior.
2. Add or identify test coverage.
3. Move the code.
4. Run validation.
5. Only then change behavior.

---

## Keep changes narrow

Do not combine:

```text
major refactoring
+
new feature
+
database redesign
+
visual redesign
```

in one uncontrolled change.

Prefer small, reviewable steps.

---

## Reuse existing conventions

Before creating:

```text
new helper
new component
new validation function
new service abstraction
new storage pattern
```

search for an existing equivalent.

---

## Avoid unnecessary dependencies

Every new production dependency must solve a concrete problem.

Before adding a library, ask:

```text
Can the existing platform or a small local module solve this safely?
```

For development-only tooling, dependencies such as Playwright may be acceptable when they provide strong testing value.

---

## Database safety

Never:

```text
drop production tables casually

delete production data to solve a bug

reset the database

rewrite migration history already deployed

run destructive migration commands without explicit approval
```

Prefer additive/backward-compatible changes.

---

## API contracts

Do not silently change request or response structures.

Before modifying an API contract:

1. Find all consumers.
2. Identify admin frontend usage.
3. Identify student frontend usage.
4. Identify mobile/external usage if present.
5. Preserve compatibility when practical.

---

## Security

Never weaken:

```text
authentication
authorization
CSRF
rate limiting
cookie security
CORS
tenant/relationship isolation
input validation
```

to make a feature work.

Fix the underlying problem.

---

# Validation after every meaningful backend change

Run:

```bash
cd v1.4/backend

npm run check
npm run smoke
```

Also run any newly added relevant tests.

---

# Validation after frontend changes

Run all project-defined checks.

At minimum inspect the affected application in a browser.

Validate where relevant:

```text
desktop

small Android-sized viewport

RTL

LTR if supported

light mode

dark mode

loading state

empty state

error state

offline/retry state

permission-denied state
```

Do not report browser validation if it was not actually performed.

---

# Desired implementation order

Work approximately in this order unless repository findings reveal a safer dependency order:

```text
1. Inspect and document current architecture

2. Preserve passing check/smoke baseline

3. Add/refine tests around extracted domains

4. Extract backend route domains

5. Extract backend services

6. Introduce explicit migration runner

7. Review indexes and transactions

8. Modularize student frontend

9. Modularize admin frontend

10. Extract genuinely shared frontend modules

11. Introduce lightweight UI design tokens/components

12. Improve CSP compatibility

13. Add Playwright regression tests

14. Add generalized roles

15. Add permission system

16. Add advisor/student relationships

17. Add teacher/student relationships

18. Add guardian/student relationships

19. Add corresponding UI flows

20. Evaluate Vite only after modularization

21. Document deployment, backups, migrations, and releases
```

---

# Completion report

At the end of each implementation task, report:

## Summary

What changed and why.

## Files changed

List every changed file.

## Database changes

State:

```text
none
```

or describe migrations and data impact.

## API contract changes

State:

```text
none
```

or document exact request/response changes and affected consumers.

## Security impact

Describe authentication, permissions, validation, CSRF, CORS, or data-isolation impact.

## Validation

List exact commands run and their results.

Example:

```text
npm run check — passed

npm run smoke — passed

node --test ... — passed

Playwright ... — passed
```

Never mark a command passed if it failed or was not executed.

## Manual validation

List browser/device flows actually tested.

## Remaining risks

Describe anything that still needs attention.

---

# Final constraint

Do not try to make Moshaver look technically sophisticated.

Make it:

```text
easy to understand
easy to deploy
easy to test
safe to change
fast on low-end phones
secure
maintainable by a small team
```

The best solution is the simplest architecture that reliably supports the required product behavior.
