export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mobinkaram.ir";

function absoluteUrl(path?: string | null) {
  if (!path) return undefined;
  if (path.startsWith("http")) return path;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function articleLd({
  title,
  description,
  url,
  datePublished,
  author,
  tags,
  image,
}: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  author?: string;
  tags?: string[];
  image?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: title,
    description,
    url,
    datePublished,
    author: author ? { "@type": "Person", name: author } : undefined,
    mainEntityOfPage: url,
    keywords: tags ?? undefined,
    image: absoluteUrl(image),
  };
}

export { absoluteUrl };
