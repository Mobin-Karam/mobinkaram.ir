# Blog publishing

The portfolio reads published MDX from `Mobin-Karam/mobinkaram-content`. Publishing is intentionally repository-first: edit or add a post in a branch, review it, then merge it. There is no public browser admin panel or production write API.

## Required server environment

```env
BLOG_CONTENT_OWNER=Mobin-Karam
BLOG_CONTENT_REPO=mobinkaram-content
BLOG_CONTENT_BRANCH=main
NEXT_PUBLIC_SITE_URL=https://mobinkaram.ir
```

Keep content configuration server-side. A token is optional for private-source reads and must never use a `NEXT_PUBLIC_` name.

## Content layout and publishing

Posts live at `posts/{fa|en}/{category}/{slug}.mdx`. Each post needs `title`, `description`, `date`, and `category`; optional frontmatter includes `slug`, `tags`, `cover`, `author`, `updatedAt`, `translationKey`, and `published`. Images are committed to the content repository under `assets/images/` and referenced by their repository-relative path.

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

The existing GitHub Actions workflow builds and deploys on each push to `main`. A deployment needs outbound access to GitHub's API and raw-content host.
