import { NextRequest, NextResponse } from "next/server";
import {
  parsePostCommand,
  createUniqueSlug,
  toMarkdown,
  commitPost,
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

  if (!msg.text.startsWith("/post")) {
    await reply(
      chatId,
      "Send a post like:\n\n/post\nTitle: My Post\nDate: 2026-09-15\nTags: tag1, tag2\n\nContent markdown here...\n\n(Date optional — defaults to today. Inline shorthand also works: /post Title | tags)"
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

    await reply(
      chatId,
      `✅ Post queued: ${parsed.title}\nslug: ${slug}\nVercel deploying...\n${commitUrl}`
    );
    return NextResponse.json({ ok: true, slug });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    await reply(chatId, `❌ Failed: ${message}`);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}