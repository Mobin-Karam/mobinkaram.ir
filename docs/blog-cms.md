# GitHub blog CMS

The portfolio reads published MDX from `Mobin-Karam/mobinkaram-content`; the application never writes to its deployed filesystem. The protected admin screen at `/{locale}/admin/blog` sends writes to the GitHub Contents API, where each commit triggers the existing `push` deployment workflow.

## Required server environment

```env
# GitHub fine-grained token: Contents read/write for Mobin-Karam/mobinkaram-content only
GITHUB_CONTENT_TOKEN=
BLOG_CONTENT_OWNER=Mobin-Karam
BLOG_CONTENT_REPO=mobinkaram-content
BLOG_CONTENT_BRANCH=main

# Existing password-based admin session
SESSION_SECRET=
ADMIN_USERNAME=Mobin-Karam
ADMIN_PASSWORD_HASH=
NEXT_PUBLIC_SITE_URL=https://mobinkaram.ir
```

Keep every variable server-side. The GitHub token must never use a `NEXT_PUBLIC_` name. Give it the smallest possible scope and rotate it if it is exposed.

## Content layout and publishing

Posts live at `posts/{fa|en}/{category}/{slug}.mdx`. The admin form writes frontmatter for title, SEO description, locale, category, tags, cover path, date, `updatedAt`, author, and publish status. Images are committed to the content repository under `assets/images/`; enter their repository-relative path in the cover field.

The reader generates server-rendered pages at `/{locale}/blog/{year}/{month}/{day}/{slug}`. English uses Gregorian dates and Persian uses Jalali dates. `sitemap.xml`, RSS, canonical metadata, Open Graph metadata, and BlogPosting JSON-LD are generated from the same post source.

## Initial migration

The remote repository is already the live source. For any remaining legacy files in this app, clone the content repository beside this checkout and run:

```bash
npx tsx scripts/migrate-blog.ts --source content/blog --out ../mobinkaram-content
cd ../mobinkaram-content
git add posts && git commit -m "Migrate legacy portfolio posts" && git push origin main
```

The migration deliberately refuses to overwrite a destination file. Review generated frontmatter and use the content repository pull request flow before publishing.

## Deployment

The existing GitHub Actions workflow builds and deploys on each push to `main`. Configure the environment variables above in Vercel, Coolify, or the deployment provider; all support the same server-side GitHub API flow. A deployment must have outbound access to GitHub's API and raw-content host.
