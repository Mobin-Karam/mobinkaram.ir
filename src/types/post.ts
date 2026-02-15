export type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  slug: string;
  tags: string[];
  cover?: string;
  readingTime?: number;
  published?: boolean;
  author?: string;
};

export type Post = PostFrontmatter & {
  locale: "en" | "fa";
  content: string;
  readingTime: number;
};
