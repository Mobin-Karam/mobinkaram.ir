import type { BlogAuthor, BlogPost } from "@/types/blog";

export function generateBlogPostingJsonLd(post: BlogPost, author?: BlogAuthor) {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://mobinkaram.ir").replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updatedAt || post.date,
    mainEntityOfPage: `${siteUrl}${post.href}`,
    inLanguage: post.locale === "fa" ? "fa-IR" : "en-US",
    articleSection: post.category,
    keywords: post.tags,
    isAccessibleForFree: true,
    wordCount: post.body.trim().split(/\s+/).filter(Boolean).length,
    author: {
      "@type": "Person",
      name: post.author || author?.name || "Mobin Karam",
      url: siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: "Mobin Karam",
      url: siteUrl,
    },
    ...(post.coverUrl ? { image: [post.coverUrl] } : {}),
  };
}
