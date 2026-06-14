"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error ?? "Something went wrong.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const inputClass =
    "w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-sm outline-none transition-colors focus:border-[var(--color-accent)]";

  if (status === "success") {
    return (
      <div className="card p-8 text-center">
        <p className="font-mono text-[var(--color-accent)]">✓ Message sent</p>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          Thanks for reaching out — I&apos;ll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-4 p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block font-mono text-xs text-[var(--color-muted)]">
            name
          </label>
          <input id="name" name="name" required maxLength={120} className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block font-mono text-xs text-[var(--color-muted)]">
            email
          </label>
          <input id="email" name="email" type="email" required className={inputClass} />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block font-mono text-xs text-[var(--color-muted)]">
          message
        </label>
        <textarea id="message" name="message" required minLength={10} rows={5} className={inputClass} />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-400">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent)] px-5 py-2.5 text-sm font-semibold text-[var(--color-bg)] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
