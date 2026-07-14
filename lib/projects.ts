import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  techStack: string[];
  content: string;
}

const projectsDir = path.join(process.cwd(), "content/projects");

export function getProjects(): Omit<Project, "content">[] {
  if (!fs.existsSync(projectsDir)) return [];

  const files = fs.readdirSync(projectsDir);

  return files
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const slug = f.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(projectsDir, f), "utf-8");
      const { data } = matter(raw);
      return {
        slug,
        title: data.title || slug,
        description: data.description || "",
        tags: data.tags || [],
        techStack: data.techStack || [],
      };
    })
    .sort((a, b) => (a.title || "").localeCompare(b.title || ""));
}

export function getProject(slug: string): Project | null {
  const filePath = path.join(projectsDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title || slug,
    description: data.description || "",
    tags: data.tags || [],
    techStack: data.techStack || [],
    content,
  };
}
