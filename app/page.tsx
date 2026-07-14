import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import ProjectCard from "@/components/ProjectCard";
import BlogCard from "@/components/BlogCard";
import { getProjects } from "@/lib/projects";
import { getBlogPosts } from "@/lib/blog";

export default function Home() {
  const projects = getProjects();
  const posts = getBlogPosts().slice(0, 3);

  return (
    <div className="space-y-24 pb-24">
      {/* Hero */}
      <Hero />

      {/* Skills */}
      <Skills />

      {/* Featured Projects */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-heading">Featured Projects</h2>
          <a
            href="/projects"
            className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
          >
            View all &rarr;
          </a>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-heading">Latest Posts</h2>
          <a
            href="/blog"
            className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
          >
            View all &rarr;
          </a>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
