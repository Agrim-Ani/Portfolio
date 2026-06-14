import { skills } from "@/content/profile";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Skills() {
  return (
    <section id="skills" className="py-20">
      <div className="container-page">
        <Reveal>
          <SectionHeading index="03" title="Skills & tools" />
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {skills.map((group, i) => (
            <Reveal key={group.label} delay={i * 80}>
              <div className="card h-full p-5">
                <h3 className="font-mono text-sm text-[var(--color-accent)]">
                  {group.label}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="tag">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
