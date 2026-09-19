export type BlogLocale = "en" | "fa";

export type BlogFrontmatter = {
  title: string;
  description: string;
  date: string;
  slug?: string;
  translationKey?: string;
  tags?: string[];
  category: string;
  cover?: string;
  readingTime?: number;
  published?: boolean;
  author?: string;
  updatedAt?: string;
};

export type LocalizedText = {
  en: string;
  fa: string;
};

export type BlogCategory = {
  slug: string;
  title: LocalizedText;
  description?: LocalizedText;
  icon?: string;
  iconPath?: string;
  theme?: {
    primary?: string;
    secondary?: string;
    background?: string;
    text?: string;
    bgPattern?: string;
  };
};

export type BlogAuthor = {
  name: string;
  title?: string;
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  social?: Record<string, string>;
};

export type BlogDateParts = {
  year: string;
  month: string;
  day: string;
};

export type BlogPostMeta = BlogFrontmatter & {
  path: string;
  locale: BlogLocale;
  fileStem: string;
  routeSlug: string;
  translationKey: string;
  href: string;
  dateParts: BlogDateParts;
  coverUrl?: string;
  categoryInfo?: BlogCategory;
};

export type BlogPost = BlogPostMeta & {
  body: string;
};
