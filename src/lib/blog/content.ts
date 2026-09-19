import matter from "gray-matter";

import type {
  BlogAuthor,
  BlogCategory,
  BlogFrontmatter,
  BlogLocale,
  BlogPost,
  BlogPostMeta,
} from "@/types/blog";
import { BLOG_CONTENT, BLOG_CONTENT_TAG, getRawContentBase, getRepoFullName } from "./config";
import { getLocalizedDateParts, normalizeDateSegment } from "./date";
import { resolveContentMediaUrl } from "./media";
import { getBlogPostHref, getRouteSlug } from "./url";

type GitTreeEntry = {
  path: string;
  type: "blob" | "tree";
  sha: string;
  size?: number;
};

type GitTreeResponse = {
  tree: GitTreeEntry[];
  truncated?: boolean;
};

function requestInit(): RequestInit & { next?: { revalidate: number; tags: string[] } } {
  const token = process.env.GITHUB_CONTENT_TOKEN;
  return {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "mobinkaram-blog",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    next: {
      revalidate: BLOG_CONTENT.revalidateSeconds,
      tags: [BLOG_CONTENT_TAG],
    },
  };
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, requestInit());
  if (!response.ok) {
    throw new Error(`Blog content request failed (${response.status}): ${url}`);
  }
  return (await response.json()) as T;
}

async function fetchRaw(path: string) {
  const options = {
    next: {
      revalidate: BLOG_CONTENT.revalidateSeconds,
      tags: [BLOG_CONTENT_TAG],
    },
  } as RequestInit;

  const response = await fetch(`${getRawContentBase()}/${encodeURI(path)}`, options);

  if (!response.ok) {
    throw new Error(`Unable to fetch blog file ${path}: ${response.status}`);
  }

  return response.text();
}

export async function getContentTree() {
  const url = `https://api.github.com/repos/${getRepoFullName()}/git/trees/${encodeURIComponent(BLOG_CONTENT.branch)}?recursive=1`;
  const result = await fetchJson<GitTreeResponse>(url);

  if (result.truncated) {
    throw new Error("GitHub content tree was truncated. Split the content repository or use a manifest.");
  }

  return result.tree;
}

export async function getCategories() {
  const raw = await fetchRaw(BLOG_CONTENT.categoriesPath);
  return JSON.parse(raw) as BlogCategory[];
}

export async function getDefaultAuthor() {
  const raw = await fetchRaw(BLOG_CONTENT.defaultAuthorPath);
  const author = JSON.parse(raw) as BlogAuthor;

  const tree = await getContentTree();
  const avatarPath = author.avatar?.replace(/^\/+/, "");
  const avatarExists = avatarPath
    ? tree.some((entry) => entry.type === "blob" && entry.path === avatarPath)
    : false;

  return {
    ...author,
    avatar: avatarExists ? resolveContentMediaUrl(author.avatar) : undefined,
  };
}

function normalizeFrontmatter(data: Record<string, unknown>): BlogFrontmatter {
  if (!data.title || !data.description || !data.date || !data.category) {
    throw new Error("Blog post is missing required frontmatter: title, description, date, or category");
  }

  return {
    title: String(data.title),
    description: String(data.description),
    date: String(data.date),
    slug: data.slug ? String(data.slug) : undefined,
    translationKey: data.translationKey ? String(data.translationKey) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    category: String(data.category),
    cover: data.cover ? String(data.cover) : undefined,
    readingTime: data.readingTime ? Number(data.readingTime) : undefined,
    published: data.published === undefined ? true : Boolean(data.published),
    author: data.author ? String(data.author) : undefined,
    updatedAt: data.updatedAt ? String(data.updatedAt) : undefined,
  };
}

function postPathLocale(path: string): BlogLocale | null {
  if (path.startsWith("posts/en/")) return "en";
  if (path.startsWith("posts/fa/")) return "fa";
  return null;
}

function fileStem(path: string) {
  return path.split("/").pop()?.replace(/\.mdx?$/i, "") || path;
}

export async function getAllPosts(
  locale: BlogLocale,
  options: { includeDrafts?: boolean } = {},
): Promise<BlogPostMeta[]> {
  const [tree, categories] = await Promise.all([getContentTree(), getCategories()]);
  const assetSet = new Set(
    tree.filter((entry) => entry.type === "blob").map((entry) => entry.path),
  );
  const categoryMap = new Map(categories.map((category) => [category.slug, category]));

  const paths = tree
    .filter(
      (entry) =>
        entry.type === "blob" &&
        postPathLocale(entry.path) === locale &&
        /\.mdx?$/i.test(entry.path),
    )
    .map((entry) => entry.path);

  const posts = await Promise.all(
    paths.map(async (path) => {
      const source = await fetchRaw(path);
      const parsed = matter(source);
      const frontmatter = normalizeFrontmatter(parsed.data);
      const stem = fileStem(path);
      const routeSlug = getRouteSlug(frontmatter, locale, stem);
      const dateParts = getLocalizedDateParts(frontmatter.date, locale);
      const categoryInfo = categoryMap.get(frontmatter.category);

      const requestedCover = frontmatter.cover?.replace(/^\/+/, "");
      const coverExists = requestedCover ? assetSet.has(requestedCover) : false;
      const categoryFallback = categoryInfo?.theme?.bgPattern?.replace(/^\/+/, "");
      const fallbackExists = categoryFallback ? assetSet.has(categoryFallback) : false;

      const translationKey = frontmatter.translationKey || stem;

      const meta: BlogPostMeta = {
        ...frontmatter,
        path,
        locale,
        fileStem: stem,
        routeSlug,
        translationKey,
        dateParts,
        href: getBlogPostHref(frontmatter.date, locale, routeSlug),
        categoryInfo,
        coverUrl: coverExists
          ? resolveContentMediaUrl(frontmatter.cover)
          : fallbackExists
            ? resolveContentMediaUrl(categoryInfo?.theme?.bgPattern)
            : undefined,
      };

      return meta;
    }),
  );

  return posts
    .filter((post) => options.includeDrafts || post.published !== false)
    .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
}

export async function getPostByPath(meta: BlogPostMeta): Promise<BlogPost> {
  const source = await fetchRaw(meta.path);
  const parsed = matter(source);
  return {
    ...meta,
    body: parsed.content.trim(),
  };
}

export async function findPostByRoute(
  locale: BlogLocale,
  year: string,
  month: string,
  day: string,
  slug: string,
) {
  const posts = await getAllPosts(locale);
  const normalizedMonth = normalizeDateSegment(month);
  const normalizedDay = normalizeDateSegment(day);

  const meta = posts.find(
    (post) =>
      post.dateParts.year === year &&
      post.dateParts.month === normalizedMonth &&
      post.dateParts.day === normalizedDay &&
      post.routeSlug === slug,
  );

  return meta ? getPostByPath(meta) : null;
}

export async function findTranslation(post: BlogPostMeta, targetLocale: BlogLocale) {
  const posts = await getAllPosts(targetLocale);
  return posts.find((item) => item.translationKey === post.translationKey) || null;
}

export async function getRelatedPosts(post: BlogPostMeta, limit = 3) {
  const posts = await getAllPosts(post.locale);
  const tags = new Set(post.tags || []);

  return posts
    .filter((item) => item.path !== post.path)
    .map((item) => {
      const sharedTags = (item.tags || []).filter((tag) => tags.has(tag)).length;
      const categoryScore = item.category === post.category ? 2 : 0;
      return { item, score: categoryScore + sharedTags };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || b.item.date.localeCompare(a.item.date))
    .slice(0, limit)
    .map(({ item }) => item);
}

export async function getAdjacentPosts(post: BlogPostMeta) {
  const posts = await getAllPosts(post.locale);
  const index = posts.findIndex((item) => item.path === post.path);

  return {
    newer: index > 0 ? posts[index - 1] : null,
    older: index >= 0 && index < posts.length - 1 ? posts[index + 1] : null,
  };
}

export function isBlogLocale(value: string): value is BlogLocale {
  return value === "en" || value === "fa";
}

export function filterPostsByArchive(
  posts: BlogPostMeta[],
  year: string,
  month?: string,
  day?: string,
) {
  return posts.filter((post) => {
    if (post.dateParts.year !== year) return false;
    if (month && post.dateParts.month !== normalizeDateSegment(month)) return false;
    if (day && post.dateParts.day !== normalizeDateSegment(day)) return false;
    return true;
  });
}
