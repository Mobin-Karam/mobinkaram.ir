import { getAllPosts, getPostByPath, getRelatedPosts as relatedPosts } from "./content";
import type { BlogLocale } from "@/types/blog";

export async function getPostsByLocale(locale: BlogLocale, includeDrafts = false) {
  return getAllPosts(locale, { includeDrafts });
}

export async function getPostBySlug(locale: BlogLocale, slug: string) {
  const post = (await getAllPosts(locale, { includeDrafts: true })).find(
    (item) => item.routeSlug === slug || item.fileStem === slug,
  );
  return post ? getPostByPath(post) : null;
}

export async function getPostsByCategory(locale: BlogLocale, category: string) {
  return (await getAllPosts(locale)).filter((post) => post.category === category);
}

export { getAllPosts, relatedPosts as getRelatedPosts };
