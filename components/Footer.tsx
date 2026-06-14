import { profile } from "@/content/profile";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./icons";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] py-10">
      <div className="container-page flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="font-mono text-xs text-[var(--color-muted)]">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js & Prisma.
        </p>
        <div className="flex items-center gap-5 text-[var(--color-muted)]">
          <a aria-label="GitHub" href={profile.socials.github} target="_blank" rel="noreferrer" className="hover:text-[var(--color-fg)]">
            <GitHubIcon className="h-4 w-4" />
          </a>
          <a aria-label="LinkedIn" href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-[var(--color-fg)]">
            <LinkedInIcon className="h-4 w-4" />
          </a>
          <a aria-label="Email" href={`mailto:${profile.email}`} className="hover:text-[var(--color-fg)]">
            <MailIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
