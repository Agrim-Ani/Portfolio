import type { ProjectDTO } from "@/lib/types";
import { GitHubIcon, ExternalLinkIcon, CodeIcon } from "./icons";

export default function ProjectCard({ project }: { project: ProjectDTO }) {
  return (
    <article className="card group flex h-full flex-col overflow-hidden transition-colors hover:border-[var(--color-accent)]">
      {project.imageUrl && (
        <div className="aspect-[16/9] w-full overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-surface-2)]">
          {/* Plain img so any external URL works without Next/Image domain config. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.imageUrl}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <CodeIcon className="h-5 w-5 text-[var(--color-accent)]" />
            {project.featured && (
              <span className="font-mono text-[0.65rem] uppercase tracking-wider text-[var(--color-accent)]">
                featured
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 text-[var(--color-muted)]">
            {project.githubUrl && (
              <a aria-label="GitHub repository" href={project.githubUrl} target="_blank" rel="noreferrer" className="transition-colors hover:text-[var(--color-fg)]">
                <GitHubIcon className="h-4 w-4" />
              </a>
            )}
            {project.liveUrl && (
              <a aria-label="Live site" href={project.liveUrl} target="_blank" rel="noreferrer" className="transition-colors hover:text-[var(--color-fg)]">
                <ExternalLinkIcon className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>

        <h3 className="mt-4 font-semibold leading-snug">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">
          {project.description}
        </p>

        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-md bg-[var(--color-accent-soft)] px-2.5 py-1 font-mono text-xs text-[var(--color-accent)] transition-colors hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)]"
          >
            {"{...}"} Live demo
          </a>
        )}

        {project.techStack.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span key={tech} className="font-mono text-xs text-[var(--color-muted)]">
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
