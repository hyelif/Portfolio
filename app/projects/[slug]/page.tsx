import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getProject, getProjects } from "@/lib/projects";
import TechStack from "@/components/TechStack";
import Link from "next/link";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject(params.slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
  };
}

export default function ProjectPage({ params }: Props) {
  const project = getProject(params.slug);
  if (!project) notFound();

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link
        href="/projects"
        className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 mb-6 inline-block"
      >
        &larr; Back to projects
      </Link>

      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-3">
          {project.title}
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
          {project.description}
        </p>

        {project.techStack.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Tech Stack
            </p>
            <TechStack items={project.techStack} />
          </div>
        )}
      </header>

      <div className="prose-custom">
        <MDXRemote source={project.content} />
      </div>
    </article>
  );
}
