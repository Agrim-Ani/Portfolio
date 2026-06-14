"use client";

import { useState } from "react";
import type { ProjectDTO } from "@/lib/types";

export type ProjectFormValues = Omit<ProjectDTO, "id"> & { id?: string };

const empty: ProjectFormValues = {
  title: "",
  description: "",
  category: "API",
  techStack: [],
  githubUrl: "",
  liveUrl: "",
  demoUrl: "",
  imageUrl: "",
  featured: false,
  order: 0,
};

export default function ProjectForm({
  initial,
  onSaved,
  onCancel,
}: {
  initial?: ProjectDTO;
  onSaved: () => void;
  onCancel: () => void;
}) {
  const [values, setValues] = useState<ProjectFormValues>(
    initial
      ? {
          ...initial,
          githubUrl: initial.githubUrl ?? "",
          liveUrl: initial.liveUrl ?? "",
          demoUrl: initial.demoUrl ?? "",
          imageUrl: initial.imageUrl ?? "",
        }
      : empty,
  );
  const [techInput, setTechInput] = useState(initial?.techStack.join(", ") ?? "");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function update<K extends keyof ProjectFormValues>(key: K, val: ProjectFormValues[K]) {
    setValues((v) => ({ ...v, [key]: val }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      ...values,
      techStack: techInput,
      githubUrl: values.githubUrl || undefined,
      liveUrl: values.liveUrl || undefined,
      demoUrl: values.demoUrl || undefined,
      imageUrl: values.imageUrl || undefined,
    };

    const isEdit = Boolean(initial?.id);
    const url = isEdit ? `/api/admin/projects/${initial!.id}` : "/api/admin/projects";

    try {
      const res = await fetch(url, {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Save failed");
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
      setSaving(false);
    }
  }

  const input =
    "w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm outline-none focus:border-[var(--color-accent)]";
  const label = "mb-1 block font-mono text-xs text-[var(--color-muted)]";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-semibold">
        {initial ? "Edit project" : "New project"}
      </h2>

      <div>
        <label className={label}>title *</label>
        <input className={input} value={values.title} onChange={(e) => update("title", e.target.value)} required />
      </div>

      <div>
        <label className={label}>description *</label>
        <textarea className={input} rows={3} value={values.description} onChange={(e) => update("description", e.target.value)} required />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label}>category *</label>
          <input className={input} value={values.category} onChange={(e) => update("category", e.target.value)} placeholder="API / Scriptable Widget / npm package" required />
        </div>
        <div>
          <label className={label}>tech stack (comma separated)</label>
          <input className={input} value={techInput} onChange={(e) => setTechInput(e.target.value)} placeholder="Node.js, Express, MongoDB" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label}>github url</label>
          <input className={input} value={values.githubUrl ?? ""} onChange={(e) => update("githubUrl", e.target.value)} />
        </div>
        <div>
          <label className={label}>live url</label>
          <input className={input} value={values.liveUrl ?? ""} onChange={(e) => update("liveUrl", e.target.value)} />
        </div>
        <div>
          <label className={label}>demo url (e.g. Swagger)</label>
          <input className={input} value={values.demoUrl ?? ""} onChange={(e) => update("demoUrl", e.target.value)} />
        </div>
        <div>
          <label className={label}>image url</label>
          <input className={input} value={values.imageUrl ?? ""} onChange={(e) => update("imageUrl", e.target.value)} />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={values.featured} onChange={(e) => update("featured", e.target.checked)} />
          featured
        </label>
        <label className="flex items-center gap-2 text-sm">
          order
          <input type="number" className={`${input} w-20`} value={values.order} onChange={(e) => update("order", Number(e.target.value))} />
        </label>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-[var(--color-bg)] disabled:opacity-60">
          {saving ? "Saving…" : "Save"}
        </button>
        <button type="button" onClick={onCancel} className="rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm">
          Cancel
        </button>
      </div>
    </form>
  );
}
