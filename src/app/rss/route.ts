import { NextResponse } from "next/server";
import { getAllContent } from "@/lib/markdown";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://mobinkaram.ir";

type FeedItem = {
  title: string;
  link: string;
  description: string;
  pubDate?: string;
  guid: string;
  author?: string;
};

async function buildItems(): Promise<FeedItem[]> {
  const locale = "fa";
  const [projects, blog, results] = await Promise.all([
    getAllContent("projects", locale),
    getAllContent("blog", locale),
    getAllContent("results", locale),
  ]);

  const projectItems = projects.map((p) => ({
    title: p.frontmatter.title,
    link: `${SITE_URL}/${locale}/projects/${p.slug}`,
    description: p.frontmatter.description,
    pubDate: p.frontmatter.date,
    guid: `project-${p.slug}`,
    author: p.frontmatter.author ?? "Mobin Karam",
  }));

  const blogItems = blog.map((post) => ({
    title: post.frontmatter.title,
    link: `${SITE_URL}/${locale}/blog/${post.slug}`,
    description: post.frontmatter.description,
    pubDate: post.frontmatter.date,
    guid: `blog-${post.slug}`,
    author: post.frontmatter.author ?? "Mobin Karam",
  }));

  const resultItems = results.map((r) => ({
    title: r.frontmatter.title,
    link: `${SITE_URL}/${locale}/results/${r.slug}`,
    description: r.frontmatter.description,
    pubDate: r.frontmatter.date,
    guid: `result-${r.slug}`,
    author: r.frontmatter.author ?? "Mobin Karam",
  }));

  return [...projectItems, ...blogItems, ...resultItems].sort((a, b) => {
    if (!a.pubDate || !b.pubDate) return 0;
    return Date.parse(b.pubDate) - Date.parse(a.pubDate);
  });
}

function escape(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const items = await buildItems();
  const lastBuild = items[0]?.pubDate || new Date().toISOString();

  const xmlItems = items
    .map(
      (item) => `
      <item>
        <title>${escape(item.title)}</title>
        <link>${escape(item.link)}</link>
        <guid isPermaLink="false">${escape(item.guid)}</guid>
        ${item.pubDate ? `<pubDate>${new Date(item.pubDate).toUTCString()}</pubDate>` : ""}
        <description><![CDATA[${item.description}]]></description>
        ${item.author ? `<author>${escape(item.author)}</author>` : ""}
      </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>Mobin Karam | Software Engineer & Product Builder</title>
      <link>${SITE_URL}</link>
      <description>Case studies, projects, and blog posts from Mobin Karam. مهندس نرم افزار و توسعه‌دهنده وب.</description>
      <language>fa</language>
      <lastBuildDate>${new Date(lastBuild).toUTCString()}</lastBuildDate>
      ${xmlItems}
    </channel>
  </rss>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=3600",
    },
  });
}
