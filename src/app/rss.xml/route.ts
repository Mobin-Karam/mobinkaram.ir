import { NextResponse } from "next/server";
import { getProjects, getLabEntries, getBuildLogs } from "@/lib/engineer-data";
import { getPostIndex } from "@/lib/blog";
import { defaultLocale } from "@/i18n/config";

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
  const locale = defaultLocale;
  const [projects, labs, logs, posts] = await Promise.all([
    getProjects(locale),
    getLabEntries(locale),
    getBuildLogs(locale),
    getPostIndex(locale as "en" | "fa"),
  ]);

  const projectItems = projects.map((p) => ({
    title: p.meta.title,
    link: `${SITE_URL}/${locale}/projects/${p.meta.slug}`,
    description: p.meta.summary,
    pubDate: p.meta.date,
    guid: `project-${p.meta.slug}`,
    author: p.meta.author,
  }));

  const labItems = labs.map((lab) => ({
    title: lab.meta.title,
    link: `${SITE_URL}/${locale}/lab/${lab.meta.slug}`,
    description: lab.meta.summary,
    pubDate: lab.meta.date,
    guid: `lab-${lab.meta.slug}`,
    author: lab.meta.author,
  }));

  const logItems = logs.map((log) => ({
    title: log.meta.title,
    link: `${SITE_URL}/${locale}/build-log/${log.meta.slug}`,
    description: log.meta.summary,
    pubDate: log.meta.date,
    guid: `log-${log.meta.slug}`,
    author: log.meta.author,
  }));

  const postItems = posts.map((post) => ({
    title: post.title,
    link: `${SITE_URL}/${locale}/blog/${post.slug}`,
    description: post.description,
    pubDate: post.date,
    guid: `post-${post.slug}`,
    author: post.author ?? "Mobin Karam",
  }));

  return [...projectItems, ...labItems, ...logItems, ...postItems].sort((a, b) => {
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
    .map((item) => `
      <item>
        <title>${escape(item.title)}</title>
        <link>${escape(item.link)}</link>
        <guid isPermaLink="false">${escape(item.guid)}</guid>
        ${item.pubDate ? `<pubDate>${new Date(item.pubDate).toUTCString()}</pubDate>` : ""}
        <description><![CDATA[${item.description}]]></description>
        ${item.author ? `<author>${escape(item.author)}</author>` : ""}
      </item>
    `)
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>Mobin Karam | Developer OS</title>
      <link>${SITE_URL}</link>
      <description>Case studies, engineering lab notes, and build logs from Mobin Karam (Koonj Inc).</description>
      <language>en</language>
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
