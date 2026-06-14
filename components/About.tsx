import { profile } from "@/content/profile";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="py-20">
      <div className="container-page">
        <Reveal>
          <SectionHeading index="01" title="About me" />
        </Reveal>
        <div className="space-y-4 text-[15px] leading-relaxed text-[var(--color-muted)]">
          {profile.about.map((para, i) => (
            <Reveal key={i} delay={i * 80}>
              <p>{para}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
