"use client";

import { useState } from "react";

/**
 * Circular hero avatar. Shows `src` by default and, on hover (desktop), swaps to
 * `hoverSrc` if provided — e.g. an animated GIF. Keep `hoverSrc` reasonably sized
 * so it doesn't hurt load performance.
 */
export default function HeroAvatar({
  src,
  hoverSrc,
  alt,
}: {
  src: string;
  hoverSrc?: string;
  alt: string;
}) {
  const [hover, setHover] = useState(false);
  const current = hoverSrc && hover ? hoverSrc : src;

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="reveal relative aspect-square w-40 shrink-0 sm:w-48 md:w-56"
    >
      <div
        className="absolute -inset-3 rounded-full bg-[var(--color-accent)] opacity-10 blur-2xl"
        aria-hidden
      />
      <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-[var(--color-accent)]/50 bg-[var(--color-surface)] shadow-lg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={current} alt={alt} className="h-full w-full object-cover" />
      </div>
    </div>
  );
}
