import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { projectUpdateSchema } from "@/lib/validation";

type Params = { params: Promise<{ id: string }> };

// PATCH /api/admin/projects/[id] — update a project.
export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = projectUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 },
    );
  }

  try {
    const project = await prisma.project.update({
      where: { id },
      data: parsed.data,
    });
    return NextResponse.json({ project });
  } catch {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }
}

// DELETE /api/admin/projects/[id] — remove a project.
export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;
  try {
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }
}
