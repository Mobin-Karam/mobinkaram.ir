# Mobinkaram.ir — Developer Operating System

Bilingual (Persian-first, English-second) engineering workspace built with **Next.js App Router**, MDX content, RTL/LTR aware layout, and next-intl. It presents case-study style projects, an engineering lab, public build log, “now” page, stack reasoning, and the Koonj public tracker.

## Run

```bash
npm install
npm run dev
```

Visit http://localhost:3000 → middleware redirects to `/fa` (default locale). Switch languages via the header toggle.

## Key features
- MDX-powered content for projects, lab experiments, and build log entries.
- RTL/LTR adaptive UI, locale-aware routes via `next-intl` middleware.
- Dark/light themes with `next-themes`.
- Case-study project pages (problem, architecture diagram, trade-offs, learnings).
- Engineering Lab, Build Log, Now page, Stack rationale, Reading list, Tech evolution chart.
- Search across projects/lab/logs, tag filtering, and GitHub activity widget.
- Public Koonj roadmap/tracker page.

## Structure
- `src/app/[locale]/` — locale-scoped routes (home, projects, lab, build-log, now, stack, about, koonj-status).
- `content/fa|en/` — MDX content for projects, lab experiments, build logs.
- `src/data/` — typed metadata (stack reasons, timeline, tracker, reading list).
- `src/i18n/` — locale config; `middleware.ts` handles redirects/prefixes.
- `mdx-components.tsx` — shared MDX component styling.

## Notes
- Default locale is **fa**; English available at `/en/...`.
- Plausible script slot ready (add your domain to `layout.tsx` if desired).
- GitHub widget pulls public events for `mobinkaram` with 1h cache and graceful fallback.
