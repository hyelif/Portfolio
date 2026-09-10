import { NextRequest, NextResponse } from "next/server";
import {
  parsePostCommand,
  createUniqueSlug,
  toMarkdown,
  commitPost,
  listPosts,
  deletePost,
} from "@/lib/telegram-post";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface TelegramUpdate {
  message?: {
    chat: { id: number };
    text?: string;
  };
}

async function reply(chatId: number, text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return;
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
}

export async function POST(req: NextRequest) {
  // Verify Telegram secret token header
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (secret && req.headers.get("x-telegram-bot-api-secret-token") !== secret) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const update = (await req.json()) as TelegramUpdate;
  const msg = update.message;
  if (!msg?.text) {
    return NextResponse.json({ ok: true });
  }

  const chatId = msg.chat.id;

  // Only allow configured chat (owner)
  const allowed = process.env.TELEGRAM_ALLOWED_CHAT_ID;
  if (allowed && String(chatId) !== allowed) {
    return NextResponse.json({ ok: true });
  }

  if (msg.text === "/id") {
    await reply(chatId, `chat_id: ${chatId}`);
    return NextResponse.json({ ok: true });
  }

  if (msg.text === "/list") {
    try {
      const posts = await listPosts();
      if (posts.length === 0) {
        await reply(chatId, "No posts yet.");
        return NextResponse.json({ ok: true });
      }
      const lines = posts
        .map(
          (p, i) =>
            `${i + 1}. ${p.date || "?"} — ${p.title}\n   /delete ${p.slug}`
        )
        .join("\n");
      await reply(chatId, `📚 Posts:\n\n${lines}`);
    } catch (err) {
      await reply(
        chatId,
        `❌ ${err instanceof Error ? err.message : "list failed"}`
      );
    }
    return NextResponse.json({ ok: true });
  }

  if (msg.text === "/delete" || msg.text.startsWith("/delete ")) {
    const arg = msg.text.replace(/^\/delete\s*/, "").trim();
    try {
      if (!arg || arg === "latest") {
        const posts = await listPosts();
        if (posts.length === 0) {
          await reply(chatId, "No posts to delete.");
          return NextResponse.json({ ok: true });
        }
        await deletePost(posts[0].slug);
        await reply(
          chatId,
          `🗑 Deleted "${posts[0].title}" (${posts[0].date}) — redeploying...`
        );
      } else {
        await deletePost(arg);
        await reply(chatId, `🗑 Deleted "${arg}" — redeploying...`);
      }
    } catch (err) {
      await reply(
        chatId,
        `❌ ${err instanceof Error ? err.message : "delete failed"}`
      );
    }
    return NextResponse.json({ ok: true });
  }

  if (!msg.text.startsWith("/post")) {
    await reply(
      chatId,
      "Commands:\n\n/post — create a post:\n/post\nTitle: My Post\nDate: 2026-09-15\nTags: tag1, tag2\n\nContent markdown here...\n\n(Date optional — defaults to today. Shorthand works too: /post Title | tags)\n\n/list — show all posts\n/delete <slug> — delete a post (/delete or /delete latest for newest)\n/id — show your chat id"
    );
    return NextResponse.json({ ok: true });
  }

  if (
    !process.env.GITHUB_TOKEN ||
    !process.env.GITHUB_REPO ||
    !process.env.TELEGRAM_BOT_TOKEN
  ) {
    await reply(
      chatId,
      "Bot not configured. Missing GITHUB_TOKEN / GITHUB_REPO / TELEGRAM_BOT_TOKEN."
    );
    return NextResponse.json({ ok: true });
  }

  const parsed = parsePostCommand(msg.text);
  if (!parsed) {
    await reply(
      chatId,
      "Could not parse. Need a Title line:\n\n/post\nTitle: My Post\nDate: 2026-09-15\nTags: tag1, tag2\n\nContent here..."
    );
    return NextResponse.json({ ok: true });
  }

  try {
    const slug = await createUniqueSlug(parsed.title);
    const markdown = toMarkdown(parsed, slug);
    const { commitUrl } = await commitPost(slug, markdown);

    const date = parsed.date || new Date().toISOString().slice(0, 10);
    const tags = parsed.tags.length ? parsed.tags.join(", ") : "general";
    await reply(
      chatId,
      `✅ Post queued\n\nTitle: ${parsed.title}\nDate: ${date}\nTags: ${tags}\nslug: ${slug}\n\nVercel deploying...\n${commitUrl}`
    );
    return NextResponse.json({ ok: true, slug });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    await reply(chatId, `❌ Failed: ${message}`);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}