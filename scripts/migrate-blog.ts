/**
 * One-time migration from the legacy local `content/blog/*-{locale}.md` layout
 * to the GitHub content repository's `posts/{locale}/{category}/*.mdx` layout.
 *
 * Run with a TypeScript runner, for example:
 *   npx tsx scripts/migrate-blog.ts --source content/blog --out ../mobinkaram-content
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import matter from "gray-matter";

type Locale = "fa" | "en";

function argument(name: string, fallback: string) {
  const index = process.argv.indexOf(name);
  return index >= 0 && process.argv[index + 1] ? process.argv[index + 1] : fallback;
}

function slugify(value: string) {
  return value.normalize("NFKC").replace(/[يى]/g, "ی").replace(/ك/g, "ک").toLowerCase()
    .replace(/[^؀-ۿ\p{L}\p{N}]+/gu, "-").replace(/^-+|-+$/g, "");
}

const source = resolve(argument("--source", "content/blog"));
const output = resolve(argument("--out", "../mobinkaram-content"));

if (!existsSync(source)) throw new Error(`Legacy blog directory does not exist: ${source}`);

let migrated = 0;
for (const filename of readdirSync(source).filter((name) => /-(fa|en)\.md$/i.test(name))) {
  const locale = (filename.match(/-(fa|en)\.md$/i)?.[1].toLowerCase() ?? "") as Locale;
  const parsed = matter(readFileSync(join(source, filename), "utf8"));
  const title = String(parsed.data.title ?? "").trim();
  const slug = slugify(String(parsed.data.slug ?? title));
  if (!title || !slug || (locale !== "fa" && locale !== "en")) throw new Error(`Cannot derive title, slug, or locale for ${filename}`);
  const category = slugify(String(parsed.data.category ?? "web-development")) || "web-development";
  const destination = join(output, "posts", locale, category, `${slug}.mdx`);
  if (existsSync(destination)) throw new Error(`Refusing to overwrite existing file: ${destination}`);
  mkdirSync(join(output, "posts", locale, category), { recursive: true });
  const today = new Date().toISOString().slice(0, 10);
  writeFileSync(destination, matter.stringify(parsed.content.trim(), {
    ...parsed.data,
    title, slug, locale, category,
    description: String(parsed.data.description ?? title),
    date: String(parsed.data.date ?? today),
    updatedAt: String(parsed.data.updatedAt ?? parsed.data.date ?? today),
    author: String(parsed.data.author ?? "Mobin Karam"),
    tags: Array.isArray(parsed.data.tags) ? parsed.data.tags.map(String) : [],
    published: parsed.data.published !== false,
  }), "utf8");
  migrated += 1;
}
console.log(`Migrated ${migrated} posts to ${output}. Review the files, then commit them in the content repository.`);
