import Link from "next/link";
import TechStack from "./TechStack";

interface ProjectSummary {
  slug: string;
  title: string;
  description: string;
  techStack: string[];
}

interface Props {
  project: ProjectSummary;
}

export default function ProjectCard({ project }: Props) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-md hover:-translate-y-0.5 transition-all"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="text-lg font-semibold group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {project.title}
        </h3>
        <span
          aria-hidden
          className="text-slate-300 dark:text-slate-600 group-hover:text-primary-500 group-hover:translate-x-0.5 transition-all shrink-0 mt-0.5"
        >
          &rarr;
        </span>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
        {project.description}
      </p>
      {project.techStack.length > 0 && (
        <TechStack items={project.techStack.slice(0, 4)} size={14} />
      )}
    </Link>
  );
}
