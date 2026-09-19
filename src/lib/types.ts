// Shared types for the entire application

// ─── Content Types ───────────────────────────────────────────────

export type Locale = "fa" | "en";

export type Frontmatter = {
  title: string;
  slug: string;
  description: string;
  published: boolean;
  date: string;
  image?: string;
  author?: string;
  tags?: string[];
  featured?: boolean;
  order?: number;
  seo?: SeoMetadata;
};

export type SeoMetadata = {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
};

export type ContentSection =
  | "projects"
  | "blog"
  | "home"
  | "results"
  | "seo";

export type ContentFile<T = Record<string, unknown>> = {
  frontmatter: Frontmatter & T;
  content: string;
  slug: string;
  locale: Locale;
  filePath: string;
};

// ─── Project Types ───────────────────────────────────────────────

export type ProjectFrontmatter = Frontmatter & {
  github?: string;
  live?: string;
  stack?: string[];
  featured?: boolean;
};

// ─── Blog Types ──────────────────────────────────────────────────

export type BlogFrontmatter = Frontmatter & {
  categories?: string[];
  readingTime?: string;
};

// ─── Results Types ───────────────────────────────────────────────

export type ResultsFrontmatter = Frontmatter & {
  client?: string;
  improvement?: string;
  metrics?: Array<{
    label: string;
    before: number;
    after: number;
  }>;
  technologies?: string[];
};

// ─── Dashboard Types ─────────────────────────────────────────────

export type DashboardStats = {
  totalProjects: number;
  totalBlogPosts: number;
  totalResults: number;
  publishedCount: number;
  draftCount: number;
};

export type ActionResult<T = void> = {
  success: boolean;
  data?: T;
  error?: string;
};

// ─── API Types ───────────────────────────────────────────────────

export type CreateContentInput = {
  section: ContentSection;
  locale: Locale;
  title: string;
  slug?: string;
  description: string;
  content: string;
  published?: boolean;
  tags?: string[];
  frontmatter?: Record<string, unknown>;
};

export type UpdateContentInput = {
  section: ContentSection;
  slug: string;
  locale: Locale;
  title?: string;
  description?: string;
  content?: string;
  published?: boolean;
  tags?: string[];
  frontmatter?: Record<string, unknown>;
};

export type DeleteContentInput = {
  section: ContentSection;
  slug: string;
  locale: Locale;
};
