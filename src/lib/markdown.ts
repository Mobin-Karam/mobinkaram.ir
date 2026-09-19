import fs from "fs";
import path from "path";
import matter from "gray-matter";
import slugify from "slugify";
import type {
  Locale,
  Frontmatter,
  ContentFile,
  ContentSection,
  DashboardStats,
  CreateContentInput,
  UpdateContentInput,
  DeleteContentInput,
  ActionResult,
} from "./types";

const contentDir = path.join(process.cwd(), "content");

// ─── Helpers ─────────────────────────────────────────────────────

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function getFilePath(
  section: ContentSection,
  slug: string,
  locale: Locale
): string {
  return path.join(contentDir, section, `${slug}-${locale}.md`);
}

function sanitizeSlug(input: string): string {
  return slugify(input, { lower: true, strict: true, trim: true });
}

function buildMarkdownFile(
  frontmatter: Record<string, unknown>,
  content: string
): string {
  const { title, slug, description, published, date, seo, ...rest } =
    frontmatter;

  const fm: Record<string, unknown> = {
    title,
    slug,
    description,
    published: published ?? false,
    date: date ?? new Date().toISOString().split("T")[0],
    ...rest,
  };

  if (seo && typeof seo === "object" && Object.keys(seo as object).length > 0) {
    fm.seo = seo;
  }

  return matter.stringify(content, fm);
}

// ─── Read Operations ─────────────────────────────────────────────

/**
 * Get all markdown files for a given section and locale.
 */
export function getContentFiles(
  section: ContentSection,
  locale: Locale
): ContentFile[] {
  const sectionDir = path.join(contentDir, section);
  if (!fs.existsSync(sectionDir)) return [];

  const files = fs.readdirSync(sectionDir).filter((f) => f.endsWith(".md"));

  return files
    .filter((f) => f.endsWith(`-${locale}.md`))
    .map((filename) => {
      const filePath = path.join(sectionDir, filename);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      const slug = filename.replace(`-${locale}.md`, "");

      return {
        frontmatter: data as Frontmatter,
        content,
        slug,
        locale,
        filePath,
      };
    });
}

/**
 * Get a single content file by slug and locale.
 */
export function getContentFile(
  section: ContentSection,
  slug: string,
  locale: Locale
): ContentFile | null {
  const filePath = getFilePath(section, slug, locale);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    frontmatter: data as Frontmatter,
    content,
    slug,
    locale,
    filePath,
  };
}

/**
 * Get all content files sorted by date.
 */
export function getAllContent(
  section: ContentSection,
  locale: Locale,
  publishedOnly = true
): ContentFile[] {
  const files = getContentFiles(section, locale);

  const filtered = publishedOnly
    ? files.filter((f) => f.frontmatter.published)
    : files;

  return filtered.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date).getTime();
    const dateB = new Date(b.frontmatter.date).getTime();
    return dateB - dateA;
  });
}

/**
 * Get all slugs for a section (for generateStaticParams).
 */
export function getAllSlugs(
  section: ContentSection,
  locale: Locale
): string[] {
  return getContentFiles(section, locale).map((f) => f.slug);
}

/**
 * List all sections in the content directory.
 */
export function getContentSections(): ContentSection[] {
  if (!fs.existsSync(contentDir)) return [];
  return fs
    .readdirSync(contentDir)
    .filter((f) => {
      const stat = fs.statSync(path.join(contentDir, f));
      return stat.isDirectory();
    }) as ContentSection[];
}

/**
 * Get dashboard statistics.
 */
export function getContentStats(locale: Locale): DashboardStats {
  const projects = getContentFiles("projects", locale);
  const blog = getContentFiles("blog", locale);
  const results = getContentFiles("results", locale);

  const allFiles = [...projects, ...blog, ...results];
  const published = allFiles.filter((f) => f.frontmatter.published).length;
  const draft = allFiles.filter((f) => !f.frontmatter.published).length;

  return {
    totalProjects: projects.length,
    totalBlogPosts: blog.length,
    totalResults: results.length,
    publishedCount: published,
    draftCount: draft,
  };
}

/**
 * Parse markdown content to HTML.
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  const { remark } = await import("remark");
  const { default: html } = await import("remark-html");
  const { default: gfm } = await import("remark-gfm");

  const result = await remark().use(html).use(gfm).process(markdown);
  return result.toString();
}

// ─── Write Operations ────────────────────────────────────────────

/**
 * Create a new content file.
 */
export function createContentFile(
  input: CreateContentInput
): ActionResult<ContentFile> {
  try {
    const slug = input.slug
      ? sanitizeSlug(input.slug)
      : sanitizeSlug(input.title);

    if (!slug) {
      return { success: false, error: "Invalid slug generated from title" };
    }

    const filePath = getFilePath(input.section, slug, input.locale);

    if (fs.existsSync(filePath)) {
      return { success: false, error: `File already exists: ${slug}` };
    }

    const sectionDir = path.join(contentDir, input.section);
    ensureDir(sectionDir);

    const frontmatter: Record<string, unknown> = {
      title: input.title,
      slug,
      description: input.description,
      published: input.published ?? false,
      date: new Date().toISOString().split("T")[0],
      tags: input.tags ?? [],
      ...input.frontmatter,
    };

    const fileContent = buildMarkdownFile(frontmatter, input.content);

    fs.writeFileSync(filePath, fileContent, "utf-8");

    return {
      success: true,
      data: {
        frontmatter: frontmatter as Frontmatter,
        content: input.content,
        slug,
        locale: input.locale,
        filePath,
      },
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to create file",
    };
  }
}

/**
 * Update an existing content file.
 */
export function updateContentFile(
  input: UpdateContentInput
): ActionResult<ContentFile> {
  try {
    const filePath = getFilePath(input.section, input.slug, input.locale);

    if (!fs.existsSync(filePath)) {
      return { success: false, error: `File not found: ${input.slug}` };
    }

    const raw = fs.readFileSync(filePath, "utf-8");
    const { data: existingData, content: existingContent } = matter(raw);

    const updatedFrontmatter: Record<string, unknown> = {
      ...existingData,
      ...(input.title !== undefined && { title: input.title }),
      ...(input.description !== undefined && {
        description: input.description,
      }),
      ...(input.published !== undefined && { published: input.published }),
      ...(input.tags !== undefined && { tags: input.tags }),
      ...(input.frontmatter && { ...input.frontmatter }),
    };

    const updatedContent =
      input.content !== undefined ? input.content : existingContent;

    const fileContent = buildMarkdownFile(updatedFrontmatter, updatedContent);

    fs.writeFileSync(filePath, fileContent, "utf-8");

    return {
      success: true,
      data: {
        frontmatter: updatedFrontmatter as Frontmatter,
        content: updatedContent,
        slug: input.slug,
        locale: input.locale,
        filePath,
      },
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to update file",
    };
  }
}

/**
 * Delete a content file.
 */
export function deleteContentFile(
  input: DeleteContentInput
): ActionResult<void> {
  try {
    const filePath = getFilePath(input.section, input.slug, input.locale);

    if (!fs.existsSync(filePath)) {
      return { success: false, error: `File not found: ${input.slug}` };
    }

    fs.unlinkSync(filePath);

    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to delete file",
    };
  }
}

/**
 * Toggle published status of a content file.
 */
export function togglePublishStatus(
  section: ContentSection,
  slug: string,
  locale: Locale
): ActionResult<boolean> {
  try {
    const filePath = getFilePath(section, slug, locale);

    if (!fs.existsSync(filePath)) {
      return { success: false, error: `File not found: ${slug}` };
    }

    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    const newPublished = !data.published;
    const updatedFrontmatter = { ...data, published: newPublished };

    const fileContent = buildMarkdownFile(updatedFrontmatter, content);
    fs.writeFileSync(filePath, fileContent, "utf-8");

    return { success: true, data: newPublished };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to toggle status",
    };
  }
}

/**
 * Check if a slug already exists for a section.
 */
export function slugExists(
  section: ContentSection,
  slug: string,
  locale: Locale
): boolean {
  const filePath = getFilePath(section, slug, locale);
  return fs.existsSync(filePath);
}

/**
 * Generate a unique slug from a title.
 */
export function generateUniqueSlug(
  section: ContentSection,
  title: string,
  locale: Locale
): string {
  let slug = sanitizeSlug(title);
  let counter = 1;

  while (slugExists(section, slug, locale)) {
    slug = `${sanitizeSlug(title)}-${counter}`;
    counter++;
  }

  return slug;
}
