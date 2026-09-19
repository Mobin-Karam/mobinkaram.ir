import { getAllPosts, isBlogLocale } from "@/lib/blog/content";

function xml(value: string) {
  return value.replace(/[<>&'\"]/g, (char) => ({
    "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;",
  }[char] || char));
}

export async function GET(_request: Request, context: { params: Promise<{ locale: string }> }) {
  const { locale } = await context.params;
  if (!isBlogLocale(locale)) return new Response("Not found", { status: 404 });

  const posts = await getAllPosts(locale);
  const site = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.mobinkaram.ir").replace(/\/$/, "");
  const title = locale === "fa" ? "ژورنال مهندسی مبین کرم" : "Mobin Karam Engineering Journal";

  const items = posts.slice(0, 50).map((post) => `
    <item>
      <title>${xml(post.title)}</title>
      <link>${site}${post.href}</link>
      <guid>${site}${post.href}</guid>
      <description>${xml(post.description)}</description>
      <pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>
    </item>`).join("");

  const feed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>${xml(title)}</title>
    <link>${site}/${locale}/blog</link>
    <description>${xml(title)}</description>
    <language>${locale}</language>${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400",
    },
  });
}
