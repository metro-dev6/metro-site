import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export type Heading = { text: string; slug: string };

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  keywords: string[];
};

export type BlogPost = BlogPostMeta & {
  content: string;
};

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
      const { data } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        description: data.description ?? "",
        date: data.date ?? "",
        keywords: Array.isArray(data.keywords) ? data.keywords : [],
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPost(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ?? "",
    keywords: Array.isArray(data.keywords) ? data.keywords : [],
    content,
  };
}

export function getHeadings(content: string): Heading[] {
  return Array.from(content.matchAll(/^## (.+)$/gm)).map((m) => {
    const text = m[1].trim();
    return { text, slug: slugify(text) };
  });
}

export function renderPost(content: string): string {
  const html = marked(content, { async: false }) as string;
  return html.replace(/<h2>([^<]+)<\/h2>/g, (_, text) => {
    return `<h2 id="${slugify(text)}">${text}</h2>`;
  });
}
