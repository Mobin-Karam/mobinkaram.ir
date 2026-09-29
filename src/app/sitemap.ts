import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/markdown";
import { getBlogSitemapEntries } from "@/lib/blog/sitemap";

const baseUrl = "https://mobinkaram.ir";
const locales = ["fa", "en"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = ["", "/about", "/products", "/projects", "/results", "/blog"];

  const staticEntries = staticPages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: page === "" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}${page}`])
        ),
      },
    }))
  );

  // Dynamic project pages
  const projectSlugs = getAllSlugs("projects", "fa");
  const projectEntries = projectSlugs.flatMap((slug) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/projects/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  // Dynamic blog pages
  const blogSlugs = getAllSlugs("blog", "fa");
  const blogEntries = blogSlugs.flatMap((slug) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  const remoteBlogEntries = await getBlogSitemapEntries();

  return [...staticEntries, ...projectEntries, ...blogEntries, ...remoteBlogEntries];
}
