import type { MetadataRoute } from "next";
import { getBlogSitemapEntries } from "@/lib/blog/sitemap";

const baseUrl = "https://mobinkaram.ir";
const locales = ["fa", "en"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = ["", "/projects", "/blog"];

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

  const remoteBlogEntries = await getBlogSitemapEntries();

  return [...staticEntries, ...remoteBlogEntries];
}
