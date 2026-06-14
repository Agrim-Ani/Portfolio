"use client";

import { useEffect, useState } from "react";
import { profile } from "@/content/profile";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        scrolled
          ? "border-b border-[var(--color-border)] bg-[var(--color-bg)]/85 backdrop-blur"
          : "border-b border-transparent"
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between">
        <a href="#top" className="font-mono text-sm font-semibold tracking-tight">
          <span className="text-[var(--color-accent)]">~/</span>
          {profile.name.split(" ")[0].toLowerCase()}
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-fg)]"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/api/resume"
              className="rounded-lg border border-[var(--color-accent)] px-3 py-1.5 text-sm font-medium text-[var(--color-accent)] transition-colors hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)]"
            >
              Résumé
            </a>
          </li>
        </ul>

        <button
          aria-label="Toggle menu"
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <div className="space-y-1.5">
            <span className="block h-0.5 w-6 bg-[var(--color-fg)]" />
            <span className="block h-0.5 w-6 bg-[var(--color-fg)]" />
            <span className="block h-0.5 w-6 bg-[var(--color-fg)]" />
          </div>
        </button>
      </nav>

      {open && (
        <ul className="container-page flex flex-col gap-1 border-t border-[var(--color-border)] bg-[var(--color-bg)] pb-4 md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-fg)]"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/api/resume"
              className="mt-2 inline-block rounded-lg border border-[var(--color-accent)] px-3 py-1.5 text-sm font-medium text-[var(--color-accent)]"
            >
              Download Résumé
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
