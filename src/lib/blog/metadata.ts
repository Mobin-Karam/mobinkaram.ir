import type { Metadata } from "next";
import type { BlogPost, BlogPostMeta } from "@/types/blog";

export function generatePostMetadata(post: BlogPost | BlogPostMeta, translation?: BlogPostMeta | null): Metadata {
  const otherLocale = post.locale === "fa" ? "en" : "fa";
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author || "Mobin Karam" }],
    alternates: { canonical: post.href, languages: { [post.locale]: post.href, ...(translation ? { [otherLocale]: translation.href } : {}) } },
    openGraph: { type: "article", title: post.title, description: post.description, publishedTime: post.date, modifiedTime: post.updatedAt || post.date, tags: post.tags, url: post.href, images: post.coverUrl ? [{ url: post.coverUrl }] : undefined },
    twitter: { card: "summary_large_image", title: post.title, description: post.description, images: post.coverUrl ? [post.coverUrl] : undefined },
  };
}
