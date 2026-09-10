const GITHUB_API = "https://api.github.com";

export interface ParsedPost {
  title: string;
  tags: string[];
  body: string;
}

export function parsePostCommand(text: string): ParsedPost | null {
  const match = text.match(/^\/post\s+([\s\S]+)$/);
  if (!match) return null;

  const rest = match[1];
  const newlineIdx = rest.indexOf("\n");

  const header = newlineIdx === -1 ? rest : rest.slice(0, newlineIdx);
  const body = newlineIdx === -1 ? "" : rest.slice(newlineIdx + 1).trim();

  const [title, tagsPart] = header.split("|").map((s) => s.trim());
  if (!title) return null;

  const tags = tagsPart
    ? tagsPart
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  return { title, tags, body };
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60)
    .replace(/-+$/g, "");
}

export function toMarkdown(post: ParsedPost, slug: string): string {
  const today = new Date().toISOString().slice(0, 10);
  const tags = post.tags.map((t) => `  - ${t}`).join("\n");

  const frontmatter = [
    "---",
    `title: ${post.title}`,
    `description: ""`,
    `date: ${today}`,
    `tags:`,
    tags || "  - general",
    "---",
    "",
  ].join("\n");

  return `${frontmatter}\n${post.body}\n`;
}

function githubHeaders(): Record<string, string> {
  return {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

export async function createUniqueSlug(title: string): Promise<string> {
  const base = slugify(title) || `post-${Date.now()}`;
  const dir = "content/blog";

  for (let i = 0; i < 50; i++) {
    const candidate = i === 0 ? base : `${base}-${i + 1}`;
    const url = `${GITHUB_API}/repos/${process.env.GITHUB_REPO}/contents/${dir}/${candidate}.md`;
    const res = await fetch(url, { headers: githubHeaders() });
    if (res.status === 404) return candidate;
    if (!res.ok) throw new Error(`GitHub check failed: ${res.status}`);
  }
  throw new Error("Could not find unique slug");
}

export async function commitPost(
  slug: string,
  markdown: string
): Promise<{ commitUrl: string }> {
  const dir = "content/blog";
  const path = `${dir}/${slug}.md`;
  const url = `${GITHUB_API}/repos/${process.env.GITHUB_REPO}/contents/${path}`;

  const res = await fetch(url, {
    method: "PUT",
    headers: githubHeaders(),
    body: JSON.stringify({
      message: `feat: add blog post "${slug}" via telegram bot`,
      content: Buffer.from(markdown, "utf-8").toString("base64"),
      branch: process.env.GITHUB_BRANCH || "main",
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`GitHub commit failed: ${res.status} ${errText}`);
  }

  const data = (await res.json()) as {
    commit?: { html_url?: string };
  };

  return { commitUrl: data.commit?.html_url || "" };
}