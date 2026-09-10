const GITHUB_API = "https://api.github.com";

export interface ParsedPost {
  title: string;
  date?: string;
  tags: string[];
  body: string;
}

// Accepts two formats:
//
// Labelled:
//   /post
//   Title: My Post Title
//   Date: 2026-09-15
//   Tags: tag1, tag2
//
//   Content here...
//
// Inline (legacy):
//   /post My Title | tag1, tag2
//   Content here...
export function parsePostCommand(text: string): ParsedPost | null {
  const match = text.match(/^\/post\s*([\s\S]+)$/);
  if (!match) return null;

  const rest = match[1].trim();
  if (!rest) return null;

  const lines = rest.split("\n");
  let title = "";
  let date: string | undefined;
  let tags: string[] = [];
  let contentStart = 0;

  // Labelled format: leading "Title:" / "Date:" / "Tags:" lines
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const keyMatch = line.match(/^(title|date|tags)\s*[:=]\s*(.*)$/i);
    if (!keyMatch) break;
    const key = keyMatch[1].toLowerCase();
    const value = keyMatch[2].trim();
    if (key === "title") title = value;
    else if (key === "date") date = normalizeDate(value);
    else if (key === "tags")
      tags = value.split(",").map((t) => t.trim()).filter(Boolean);
    contentStart = i + 1;
  }

  if (title) {
    const body = lines.slice(contentStart).join("\n").trim();
    return { title, date, tags, body };
  }

  // Legacy inline format
  const newlineIdx = rest.indexOf("\n");
  const header = newlineIdx === -1 ? rest : rest.slice(0, newlineIdx);
  const body = newlineIdx === -1 ? "" : rest.slice(newlineIdx + 1).trim();

  const [legacyTitle, tagsPart] = header.split("|").map((s) => s.trim());
  if (!legacyTitle) return null;

  tags = tagsPart
    ? tagsPart.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  return { title: legacyTitle, tags, body };
}

function normalizeDate(value: string): string | undefined {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const parsed = new Date(value);
  if (isNaN(parsed.getTime())) return undefined;
  return parsed.toISOString().slice(0, 10);
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
  const body = escapeMdxText(post.body);
  const title = post.title.replace(/\\/g, "\\\\").replace(/"/g, '\\"');

  const frontmatter = [
    "---",
    `title: "${title}"`,
    `description: ""`,
    `date: ${post.date || today}`,
    `tags:`,
    tags || "  - general",
    "---",
    "",
  ].join("\n");

  return `${frontmatter}\n${body}\n`;
}

// MDX treats <tag> and {expr} as JSX anywhere outside code spans/fences,
// which breaks the build. Convert them to character references that render
// literally. Fenced code blocks and inline code spans are left untouched —
// MDX already parses those as literal text.
export function escapeMdxText(body: string): string {
  const segments = body.split(/(```[\s\S]*?```|~~~[\s\S]*?~~~)/);

  return segments
    .map((segment, i) => {
      // Odd segments are the code fences themselves - leave as-is
      if (i % 2 === 1) return segment;
      // Skip inline code spans; escape the plain text between them
      return segment
        .split(/(`[^`\n]+`)/)
        .map((part, j) =>
          j % 2 === 1
            ? part
            : part.replace(
                /([<{])/g,
                (ch) => (ch === "<" ? "&lt;" : "&#123;")
              )
        )
        .join("");
    })
    .join("");
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