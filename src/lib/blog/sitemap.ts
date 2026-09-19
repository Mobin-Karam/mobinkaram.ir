import { getAllPosts } from "./content";

export async function getBlogSitemapEntries() {
  const site = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.mobinkaram.ir").replace(/\/$/, "");
  const [en, fa] = await Promise.all([getAllPosts("en"), getAllPosts("fa")]);

  return [...en, ...fa].map((post) => ({
    url: `${site}${post.href}`,
    lastModified: new Date(`${post.updatedAt || post.date}T00:00:00Z`),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
}
