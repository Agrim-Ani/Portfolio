"use client";

import { useMemo, useState } from "react";
import type { ProjectDTO } from "@/lib/types";
import ProjectCard from "./ProjectCard";

export default function ProjectGrid({ projects }: { projects: ProjectDTO[] }) {
  const categories = useMemo(() => {
    const set = new Set(projects.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, [projects]);

  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  if (projects.length === 0) {
    return (
      <p className="card p-6 text-center text-sm text-[var(--color-muted)]">
        No projects yet. Add them from the{" "}
        <a href="/admin" className="text-[var(--color-accent)] underline">
          admin dashboard
        </a>
        .
      </p>
    );
  }

  return (
    <div>
      {categories.length > 2 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full px-3 py-1.5 font-mono text-xs transition-colors ${
                active === cat
                  ? "bg-[var(--color-accent)] text-[var(--color-bg)]"
                  : "border border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-fg)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
