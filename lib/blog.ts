import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  content: string;
}

const blogDir = path.join(process.cwd(), "content/blog");

export function getBlogPosts(): Omit<BlogPost, "content">[] {
  if (!fs.existsSync(blogDir)) return [];

  const files = fs.readdirSync(blogDir);

  return files
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const slug = f.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(blogDir, f), "utf-8");
      const { data } = matter(raw);
      return {
        slug,
        title: data.title || slug,
        description: data.description || "",
        date: data.date || "",
        tags: data.tags || [],
      };
    })
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

export function getBlogPost(slug: string): BlogPost | null {
  const filePath = path.join(blogDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title || slug,
    description: data.description || "",
    date: data.date || "",
    tags: data.tags || [],
    content,
  };
}
