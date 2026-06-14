import { profile } from "@/content/profile";
import SectionHeading from "./SectionHeading";
import ContactForm from "./ContactForm";
import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section id="contact" className="py-20">
      <div className="container-page">
        <Reveal>
          <SectionHeading index="05" title="Get in touch" />
        </Reveal>
        <div className="grid gap-8 md:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <p className="text-[15px] leading-relaxed text-[var(--color-muted)]">
              Have a backend project, an API to build, or a role in mind? Send me a
              message and I&apos;ll get back to you.
            </p>
            <div className="mt-6 space-y-2 font-mono text-sm">
              <p>
                <span className="text-[var(--color-accent)]">email</span>{" "}
                <a href={`mailto:${profile.email}`} className="text-[var(--color-muted)] hover:text-[var(--color-fg)]">
                  {profile.email}
                </a>
              </p>
              <p>
                <span className="text-[var(--color-accent)]">phone</span>{" "}
                <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="text-[var(--color-muted)] hover:text-[var(--color-fg)]">
                  {profile.phone}
                </a>
              </p>
              <p>
                <span className="text-[var(--color-accent)]">loc&nbsp;&nbsp;</span>{" "}
                <span className="text-[var(--color-muted)]">{profile.location}</span>
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
