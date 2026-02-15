import "server-only";
import { cache } from "react";
import { listPostFiles, getPostFile, getAuthorFile } from "@/lib/github-content";
import { compilePost } from "@/lib/mdx-server";
import type { Post } from "@/types/post";

const locales: ("en" | "fa")[] = ["en", "fa"];
const revalidateSeconds = 1800; // 30 minutes

const fallbackSlug = "clean-software-architecture";
const fallbackSource = `---
title: "Clean Software Architecture"
description: "How senior engineers design scalable systems"
date: "2026-02-15"
slug: "clean-software-architecture"
tags: ["architecture", "engineering"]
cover: "/assets/images/architecture.jpg"
readingTime: 8
published: true
author: "Mobin Karam"
---

When the remote content repository is unreachable, this fallback article is rendered so the blog never ships empty. Replace it with the real post from mobinkaram-content when available.

- Why: predictable boundaries, decoupled domains, fast change-safe deployments.
- How: contracts first, explicit use-cases, adapters for IO, observability from day 1.
- Outcome: systems that scale without rewriting the core.
`;

async function loadIndex(locale: "en" | "fa") {
  const files = await listPostFiles(locale);
  const posts: Post[] = [];
  for (const file of files) {
    const slug = file.name.replace(/\.mdx$/, "");
    const source = await getPostFile(locale, slug, file.category);
    if (!source) continue;
    try {
      const { frontmatter } = await compilePost(locale, source);
      if (frontmatter.published === false) continue;
      posts.push({ ...frontmatter, category: frontmatter.category ?? file.category });
    } catch (err) {
      console.warn(`[blog] failed to compile ${locale}/${file.category}/${slug}:`, err);
    }
  }
  if (posts.length === 0) {
    const { frontmatter } = await compilePost(locale, fallbackSource);
    posts.push(frontmatter);
  }
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export const getPostIndex = cache(async (locale: "en" | "fa") => {
  return loadIndex(locale);
});

export const getRelatedPosts = cache(
  async (locale: "en" | "fa", slug: string, tags: string[] = []) => {
    const posts = await loadIndex(locale);
    return posts
      .filter((p) => p.slug !== slug)
      .map((p) => ({
        post: p,
        score: p.tags?.reduce(
          (acc, tag) => acc + (tags.includes(tag) ? 1 : 0),
          0,
        ) ?? 0,
      }))
      .sort((a, b) => b.score - a.score || b.post.date.localeCompare(a.post.date))
      .slice(0, 3)
      .map((x) => x.post);
  },
);

export const getAllSlugs = cache(async () => {
  const entries: { locale: "en" | "fa"; slug: string; category: string }[] = [];
  for (const locale of locales) {
    const files = await listPostFiles(locale);
    files.forEach((f) =>
      entries.push({ locale, slug: f.name.replace(/\.mdx$/, ""), category: f.category }),
    );
  }
  return entries;
});

export const getAllSlugCategories = getAllSlugs;

export const getPostBySlug = cache(
  async (locale: "en" | "fa", category: string, slug: string) => {
    const source = await getPostFile(locale, slug, category);
    if (source) {
      try {
        const compiled = await compilePost(locale, source);
        compiled.frontmatter.category = compiled.frontmatter.category ?? category;
        return compiled;
      } catch (err) {
        console.warn(`[blog] failed to compile ${locale}/${category}/${slug}:`, err);
        return null;
      }
    }
    if (slug === fallbackSlug) {
      return compilePost(locale, fallbackSource);
    }
    return null;
  },
);

export const getAuthor = cache(async (id = "mobin") => {
  return getAuthorFile(id);
});

const islamMatcher = (tag: string) =>
  tag.toLowerCase() === "islam" || tag.toLowerCase() === "اسلام";

export type BlogCategory = string;

export function categorizePost(post: Post) {
  if ((post as any).category) return (post as any).category as BlogCategory;
  const hasIslam = (post.tags ?? []).some(islamMatcher);
  return hasIslam ? "islam" : "general";
}

export function filterByCategory(posts: Post[], category: BlogCategory) {
  return posts.filter((p) =>
    (p as any).category ? (p as any).category === category : categorizePost(p) === category,
  );
}

export const getUniqueBlogTags = cache(async (locale: "en" | "fa") => {
  const posts = await loadIndex(locale);
  return Array.from(new Set(posts.flatMap((p) => p.tags ?? []))).sort((a, b) =>
    a.localeCompare(b),
  );
});

export function isPostNew(date?: string, days = 4) {
  if (!date) return false;
  const diff = Date.now() - Date.parse(date);
  return diff <= days * 24 * 60 * 60 * 1000;
}

export const revalidate = revalidateSeconds;
