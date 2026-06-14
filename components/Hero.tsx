import { profile } from "@/content/profile";
import { GitHubIcon, LinkedInIcon, MailIcon, DownloadIcon } from "./icons";
import HeroAvatar from "./HeroAvatar";

export default function Hero() {
  return (
    <section id="top" className="relative pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="container-page flex flex-col-reverse items-start gap-10 md:flex-row md:items-center md:justify-between md:gap-12">
        <div className="w-full">
        <p className="section-label reveal">Hi, my name is</p>
        <h1 className="reveal mt-3 text-4xl font-semibold tracking-tight sm:text-6xl">
          {profile.name}
        </h1>
        <h2 className="reveal mt-2 text-2xl font-medium text-[var(--color-muted)] sm:text-4xl">
          {profile.title}.
        </h2>
        <p className="reveal mt-6 max-w-xl text-base leading-relaxed text-[var(--color-muted)]">
          {profile.tagline}
        </p>

        <div className="reveal mt-8 flex flex-wrap items-center gap-3">
          <a
            href={profile.resumeFile}
            download
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent)] px-5 py-2.5 text-sm font-semibold text-[var(--color-bg)] transition-transform hover:-translate-y-0.5"
          >
            <DownloadIcon className="h-4 w-4" />
            Download Résumé
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-5 py-2.5 text-sm font-medium text-[var(--color-fg)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          >
            Get in touch
          </a>
        </div>

        <div className="reveal mt-8 flex items-center gap-5 text-[var(--color-muted)]">
          <a aria-label="GitHub" href={profile.socials.github} target="_blank" rel="noreferrer" className="transition-colors hover:text-[var(--color-fg)]">
            <GitHubIcon className="h-5 w-5" />
          </a>
          <a aria-label="LinkedIn" href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="transition-colors hover:text-[var(--color-fg)]">
            <LinkedInIcon className="h-5 w-5" />
          </a>
          <a aria-label="Email" href={`mailto:${profile.email}`} className="transition-colors hover:text-[var(--color-fg)]">
            <MailIcon className="h-5 w-5" />
          </a>
        </div>
        </div>

        <HeroAvatar src={profile.avatar} alt={profile.name} />
      </div>
    </section>
  );
}
