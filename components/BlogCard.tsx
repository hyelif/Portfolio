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
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-lg transition-all"
    >
      <time className="text-xs text-slate-500 dark:text-slate-400">
        {new Date(post.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </time>
      <h3 className="text-lg font-semibold mt-1 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
        {post.title}
      </h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
        {post.description}
      </p>
    </Link>
  );
}
