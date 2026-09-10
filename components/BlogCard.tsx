import Link from "next/link";

interface BlogPostSummary {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
}

interface Props {
  post: BlogPostSummary;
}

export default function BlogCard({ post }: Props) {
  const d = new Date(post.date);
  const valid = !isNaN(d.getTime());

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex items-baseline gap-5 py-4 border-b border-slate-100 dark:border-slate-800/60 transition-colors"
    >
      <time
        dateTime={post.date}
        className="shrink-0 w-24 text-sm font-medium text-slate-500 dark:text-slate-400 tabular-nums"
      >
        {valid
          ? d.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : post.date}
      </time>
      <span className="text-lg font-medium group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
        {post.title}
      </span>
    </Link>
  );
}