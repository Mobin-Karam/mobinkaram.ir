import type { BlogLocale } from "@/types/blog";
import type { TableOfContentsItem } from "@/lib/blog/toc";
import MobileTableOfContents from "./MobileTableOfContents";
import DesktopTableOfContents from "./DesktopTableOfContents";

export default function BlogTableOfContents({ items, locale, mobile = false }: { items: TableOfContentsItem[]; locale: BlogLocale; mobile?: boolean }) {
  if (!items.length) return null;
  if (mobile) return <MobileTableOfContents items={items} locale={locale} />;
  return <DesktopTableOfContents items={items} locale={locale} />;
}
