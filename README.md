# Portfolio

https://hyelif.vercel.app/

Personal portfolio built with Next.js, Tailwind CSS, and next-mdx-remote.

## Publishing blog posts via Telegram bot

The portfolio ships with a Telegram bot that publishes posts straight to this
repository. When a post lands in `content/blog/`, Vercel redeploys
automatically through its GitHub integration — no manual step needed.

### How it works

1. You send a message to your bot on Telegram.
2. The bot's webhook (`/api/telegram`) parses the message and commits a new
   markdown file to `content/blog/` via the GitHub Contents API.
3. Vercel detects the new commit and redeploys the site.

### Message format

```
/post
Title: My Post Title
Date: 2026-09-15
Tags: tag1, tag2

The post body in markdown goes here.
```

`Date` is optional (defaults to today) and accepts any date format
Telegram accepts; `Tags` is optional. The inline shorthand
`/post Title | tag1, tag2` still works too.

Other commands: `/id` replies with your chat id.

### Setup

1. Create a bot with [@BotFather](https://t.me/BotFather) on Telegram and copy
   the bot token.
2. Create a GitHub fine-grained personal access token with **Contents:
   Read and write** access scoped to this repository only.
3. Add these environment variables in Vercel (Project → Settings →
   Environment Variables):

   | Variable | Value |
   |----------|-------|
   | `TELEGRAM_BOT_TOKEN` | Token from BotFather |
   | `TELEGRAM_WEBHOOK_SECRET` | Any random string, used to authenticate webhook calls |
   | `TELEGRAM_ALLOWED_CHAT_ID` | Your chat id (send `/id` to the bot to find it) |
   | `GITHUB_TOKEN` | The fine-grained PAT |
   | `GITHUB_REPO` | `hyelif/Portfolio` |
   | `GITHUB_BRANCH` | `main` |

4. Register the webhook (after the first deploy, replace the placeholders):

   ```sh
   curl "https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/setWebhook?url=https://<your-vercel-domain>/api/telegram&secret_token=<TELEGRAM_WEBHOOK_SECRET>"
   ```

5. Send `/id` to the bot, put the chat id into `TELEGRAM_ALLOWED_CHAT_ID`, then redeploy.

### Notes

- Duplicate titles get a numeric suffix (`my-post`, `my-post-2`, ...).
- Only text posts are supported for now — photos sent to the bot are ignored.
- The webhook rejects requests without the matching `secret_token` header, and
  ignores messages from chats other than `TELEGRAM_ALLOWED_CHAT_ID`.