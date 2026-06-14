import type { ProjectDTO } from "@/lib/types";
import SectionHeading from "./SectionHeading";
import ProjectGrid from "./ProjectGrid";
import Reveal from "./Reveal";

export default function Projects({ projects }: { projects: ProjectDTO[] }) {
  return (
    <section id="projects" className="py-20">
      <div className="container-page">
        <Reveal>
          <SectionHeading index="04" title="Things I've built" />
        </Reveal>
        <Reveal>
          <ProjectGrid projects={projects} />
        </Reveal>
      </div>
    </section>
  );
}
