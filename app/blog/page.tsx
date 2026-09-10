import { Metadata } from "next";
import BlogCard from "@/components/BlogCard";
import { getBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on building software.",
};

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="section-heading mb-2">Blog</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-10">
        Pick a date to read the post.
      </p>
      {posts.length === 0 ? (
        <p className="text-slate-500 dark:text-slate-400">No posts yet.</p>
      ) : (
        <div>
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}