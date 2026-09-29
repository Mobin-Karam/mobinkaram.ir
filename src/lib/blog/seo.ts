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
    author: { "@type": "Person", name: post.author || author?.name || "Mobin Karam" },
    ...(post.coverUrl ? { image: [post.coverUrl] } : {}),
  };
}
