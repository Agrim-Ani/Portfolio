import { experience, education } from "@/content/profile";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

// Render **bold** markers (used to highlight numeric results) as <strong>.
function renderRich(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-[var(--color-fg)]">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
  );
}

function Timeline({
  items,
}: {
  items: { title: string; subtitle: string; period: string; points?: string[] }[];
}) {
  return (
    <ol className="relative space-y-8 border-l border-[var(--color-border)] pl-6">
      {items.map((item, i) => (
        <li key={i} className="relative">
          <span className="absolute -left-[27px] top-1.5 h-3 w-3 rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-bg)]" />
          <p className="font-mono text-xs text-[var(--color-accent)]">{item.period}</p>
          <h4 className="mt-1 font-semibold">{item.title}</h4>
          <p className="text-sm text-[var(--color-muted)]">{item.subtitle}</p>
          {item.points && (
            <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-[var(--color-muted)]">
              {item.points.map((p, j) => (
                <li key={j}>{renderRich(p)}</li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ol>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="py-20">
      <div className="container-page">
        <Reveal>
          <SectionHeading index="02" title="Where I've worked" />
        </Reveal>

        <div className="grid gap-12 md:grid-cols-2">
          <Reveal>
            <h3 className="mb-6 font-mono text-sm uppercase tracking-wider text-[var(--color-muted)]">
              Experience
            </h3>
            <Timeline
              items={experience.map((e) => ({
                title: e.role,
                subtitle: e.company,
                period: e.period,
                points: e.points,
              }))}
            />
          </Reveal>

          <Reveal delay={120}>
            <h3 className="mb-6 font-mono text-sm uppercase tracking-wider text-[var(--color-muted)]">
              Education
            </h3>
            <Timeline
              items={education.map((e) => ({
                title: e.institution,
                subtitle: e.detail,
                period: e.period,
              }))}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
