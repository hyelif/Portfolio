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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="section-heading mb-2">Blog</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-10 max-w-2xl">
        Notes on iOS, Wear OS, and whatever else I&apos;m learning.
      </p>
      {posts.length === 0 ? (
        <div className="text-center py-16 text-slate-500 dark:text-slate-400">
          <p className="text-lg">No posts yet: coming soon.</p>
        </div>
      ): (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
