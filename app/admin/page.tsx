"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { ProjectDTO, ContactMessageDTO } from "@/lib/types";
import ProjectForm from "@/components/admin/ProjectForm";

type Tab = "projects" | "messages";

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("projects");
  const [projects, setProjects] = useState<ProjectDTO[]>([]);
  const [messages, setMessages] = useState<ContactMessageDTO[]>([]);
  const [editing, setEditing] = useState<ProjectDTO | null>(null);
  const [creating, setCreating] = useState(false);

  const loadProjects = useCallback(async () => {
    const res = await fetch("/api/projects");
    if (res.ok) setProjects((await res.json()).projects);
  }, []);

  const loadMessages = useCallback(async () => {
    const res = await fetch("/api/admin/messages");
    if (res.ok) setMessages((await res.json()).messages);
  }, []);

  useEffect(() => {
    loadProjects();
    loadMessages();
  }, [loadProjects, loadMessages]);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  async function deleteProject(id: string) {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    loadProjects();
  }

  async function markRead(m: ContactMessageDTO) {
    await fetch(`/api/admin/messages/${m.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: !m.read }),
    });
    loadMessages();
  }

  async function deleteMessage(id: string) {
    if (!confirm("Delete this message?")) return;
    await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
    loadMessages();
  }

  function onFormSaved() {
    setCreating(false);
    setEditing(null);
    loadProjects();
  }

  const showForm = creating || editing;
  const unread = messages.filter((m) => !m.read).length;

  return (
    <main className="min-h-screen">
      <header className="border-b border-[var(--color-border)]">
        <div className="container-page flex h-16 items-center justify-between">
          <h1 className="font-mono text-sm">
            <span className="text-[var(--color-accent)]">~/</span>admin
          </h1>
          <div className="flex items-center gap-3">
            <a href="/" className="text-sm text-[var(--color-muted)] hover:text-[var(--color-fg)]">
              View site
            </a>
            <button onClick={logout} className="rounded-lg border border-[var(--color-border)] px-3 py-1.5 text-sm">
              Log out
            </button>
          </div>
        </div>
      </header>

      <div className="container-page py-8">
        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setTab("projects")}
            className={`rounded-lg px-4 py-2 text-sm ${tab === "projects" ? "bg-[var(--color-surface-2)]" : "text-[var(--color-muted)]"}`}
          >
            Projects ({projects.length})
          </button>
          <button
            onClick={() => setTab("messages")}
            className={`rounded-lg px-4 py-2 text-sm ${tab === "messages" ? "bg-[var(--color-surface-2)]" : "text-[var(--color-muted)]"}`}
          >
            Messages{unread > 0 ? ` (${unread} new)` : ` (${messages.length})`}
          </button>
        </div>

        {tab === "projects" && (
          <div className="space-y-4">
            <button
              onClick={() => {
                setCreating(true);
                setEditing(null);
              }}
              className="rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-[var(--color-bg)]"
            >
              + New project
            </button>

            <div className="space-y-2">
              {projects.map((p) => (
                <div key={p.id} className="card flex items-center justify-between gap-4 p-4">
                  <div className="min-w-0">
                    <p className="truncate font-medium">
                      {p.featured && <span className="mr-1 text-[var(--color-accent)]">★</span>}
                      {p.title}
                    </p>
                    <p className="truncate font-mono text-xs text-[var(--color-muted)]">
                      {p.category} · order {p.order} · {p.techStack.join(", ")}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button onClick={() => { setEditing(p); setCreating(false); }} className="rounded-md border border-[var(--color-border)] px-3 py-1.5 text-xs">
                      Edit
                    </button>
                    <button onClick={() => deleteProject(p.id)} className="rounded-md border border-red-500/40 px-3 py-1.5 text-xs text-red-400">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              {projects.length === 0 && (
                <p className="text-sm text-[var(--color-muted)]">No projects yet.</p>
              )}
            </div>
          </div>
        )}

        {tab === "messages" && (
          <div className="space-y-2">
            {messages.map((m) => (
              <div key={m.id} className={`card p-4 ${m.read ? "opacity-60" : ""}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-medium">
                      {m.name}{" "}
                      <a href={`mailto:${m.email}`} className="font-mono text-xs text-[var(--color-accent)]">
                        &lt;{m.email}&gt;
                      </a>
                    </p>
                    <p className="mt-1 whitespace-pre-wrap text-sm text-[var(--color-muted)]">{m.message}</p>
                    <p className="mt-2 font-mono text-[0.65rem] text-[var(--color-muted)]">
                      {new Date(m.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col gap-2">
                    <button onClick={() => markRead(m)} className="rounded-md border border-[var(--color-border)] px-3 py-1.5 text-xs">
                      {m.read ? "Mark unread" : "Mark read"}
                    </button>
                    <button onClick={() => deleteMessage(m.id)} className="rounded-md border border-red-500/40 px-3 py-1.5 text-xs text-red-400">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {messages.length === 0 && (
              <p className="text-sm text-[var(--color-muted)]">No messages yet.</p>
            )}
          </div>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 sm:p-8">
          <div className="card w-full max-w-2xl p-6">
            <ProjectForm
              initial={editing ?? undefined}
              onSaved={onFormSaved}
              onCancel={() => {
                setCreating(false);
                setEditing(null);
              }}
            />
          </div>
        </div>
      )}
    </main>
  );
}
