import { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import { getProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I've built.",
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="section-heading mb-2">Projects</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-10 max-w-2xl">
        Things I&apos;ve built: from mobile apps to web tools.
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
