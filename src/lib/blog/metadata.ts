import type { Metadata } from "next";
import type { BlogPost, BlogPostMeta } from "@/types/blog";

export function generatePostMetadata(post: BlogPost | BlogPostMeta, translation?: BlogPostMeta | null): Metadata {
  const otherLocale = post.locale === "fa" ? "en" : "fa";
  return {
    metadataBase: new URL("https://mobinkaram.ir"),
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author || "Mobin Karam" }],
    alternates: {
      canonical: post.href,
      languages: {
        [post.locale]: post.href,
        ...(translation ? { [otherLocale]: translation.href } : {}),
        "x-default": translation?.locale === "fa" ? translation.href : post.href,
      },
    },
    openGraph: {
      type: "article",
      locale: post.locale === "fa" ? "fa_IR" : "en_US",
      alternateLocale: post.locale === "fa" ? ["en_US"] : ["fa_IR"],
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.updatedAt || post.date,
      authors: [post.author || "Mobin Karam"],
      tags: post.tags,
      url: post.href,
      images: post.coverUrl ? [{ url: post.coverUrl, alt: post.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.coverUrl ? [{ url: post.coverUrl, alt: post.title }] : undefined,
    },
    robots: { index: true, follow: true, "max-image-preview": "large" },
  };
}
