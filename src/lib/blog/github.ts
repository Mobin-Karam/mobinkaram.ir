import "server-only";

import matter from "gray-matter";

import { BLOG_CONTENT, getRepoFullName } from "./config";
import { slugifyBlogTitle } from "./url";
import type { BlogLocale } from "@/types/blog";

type GithubContentResponse = { sha: string; content?: string; encoding?: string };

export type BlogWriteInput = {
  title: string;
  slug: string;
  locale: BlogLocale;
  description: string;
  category: string;
  tags: string[];
  cover?: string;
  content: string;
  published: boolean;
};

function token() {
  const value = process.env.GITHUB_CONTENT_TOKEN ?? process.env.GITHUB_TOKEN;
  if (!value) throw new Error("GitHub publishing is not configured. Set GITHUB_CONTENT_TOKEN on the server.");
  return value;
}

function normalizedSegment(value: string, field: string) {
  const normalized = slugifyBlogTitle(value);
  if (!normalized || normalized.includes("/")) throw new Error(`Invalid ${field}.`);
  return normalized;
}

function postPath(input: BlogWriteInput) {
  return `posts/${input.locale}/${normalizedSegment(input.category, "category")}/${normalizedSegment(input.slug, "slug")}.mdx`;
}

function githubPath(path: string) {
  return path.split("/").map(encodeURIComponent).join("/");
}

function headers() {
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token()}`,
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

async function existingFile(path: string) {
  const response = await fetch(
    `https://api.github.com/repos/${getRepoFullName()}/contents/${githubPath(path)}?ref=${encodeURIComponent(BLOG_CONTENT.branch)}`,
    { headers: headers(), cache: "no-store" },
  );
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`GitHub could not read ${path} (${response.status}).`);
  return (await response.json()) as GithubContentResponse;
}

function markdown(input: BlogWriteInput, existing?: GithubContentResponse | null) {
  const now = new Date().toISOString().slice(0, 10);
  const previous = existing?.content && existing.encoding === "base64"
    ? matter(Buffer.from(existing.content, "base64").toString("utf8")).data
    : {};

  return matter.stringify(input.content, {
    ...previous,
    title: input.title.trim(),
    slug: normalizedSegment(input.slug, "slug"),
    locale: input.locale,
    description: input.description.trim(),
    category: normalizedSegment(input.category, "category"),
    tags: input.tags.map((tag) => tag.trim()).filter(Boolean),
    ...(input.cover?.trim() ? { cover: input.cover.trim() } : {}),
    author: typeof previous.author === "string" ? previous.author : "Mobin Karam",
    date: typeof previous.date === "string" ? previous.date : now,
    updatedAt: now,
    published: input.published,
  });
}

export async function writeBlogPost(input: BlogWriteInput) {
  const path = postPath(input);
  const existing = await existingFile(path);
  const body = markdown(input, existing);
  const response = await fetch(`https://api.github.com/repos/${getRepoFullName()}/contents/${githubPath(path)}`, {
    method: "PUT",
    headers: { ...headers(), "Content-Type": "application/json" },
    body: JSON.stringify({
      message: `${existing ? "Update" : "Create"} blog post: ${normalizedSegment(input.slug, "slug")}`,
      content: Buffer.from(body).toString("base64"),
      branch: BLOG_CONTENT.branch,
      ...(existing ? { sha: existing.sha } : {}),
    }),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`GitHub could not publish this post (${response.status}).`);
  return { path, created: !existing };
}

export async function deleteBlogPost(locale: BlogLocale, category: string, slug: string) {
  const path = `posts/${locale}/${normalizedSegment(category, "category")}/${normalizedSegment(slug, "slug")}.mdx`;
  const existing = await existingFile(path);
  if (!existing) throw new Error("Post not found.");
  const response = await fetch(`https://api.github.com/repos/${getRepoFullName()}/contents/${githubPath(path)}`, {
    method: "DELETE",
    headers: { ...headers(), "Content-Type": "application/json" },
    body: JSON.stringify({ message: `Delete blog post: ${slug}`, sha: existing.sha, branch: BLOG_CONTENT.branch }),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`GitHub could not delete this post (${response.status}).`);
}
