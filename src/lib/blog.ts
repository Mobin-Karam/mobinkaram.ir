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
    const source = await getPostFile(locale, slug);
    if (!source) continue;
    const { frontmatter } = await compilePost(locale, source);
    if (frontmatter.published === false) continue;
    posts.push(frontmatter);
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

export const getAllSlugs = cache(async () => {
  const entries: { locale: "en" | "fa"; slug: string }[] = [];
  for (const locale of locales) {
    const files = await listPostFiles(locale);
    files.forEach((f) => entries.push({ locale, slug: f.name.replace(/\.mdx$/, "") }));
  }
  return entries;
});

export const getPostBySlug = cache(async (locale: "en" | "fa", slug: string) => {
  const source = await getPostFile(locale, slug);
  if (source) return compilePost(locale, source);
  if (slug === fallbackSlug) {
    return compilePost(locale, fallbackSource);
  }
  return null;
});

export const getAuthor = cache(async (id = "mobin") => {
  return getAuthorFile(id);
});

export const revalidate = revalidateSeconds;
