import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

// PATCH /api/admin/messages/[id] — toggle/mark read state.
export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params;
  let body: { read?: boolean } = {};
  try {
    body = await request.json();
  } catch {
    // default to marking read
  }

  try {
    const message = await prisma.contactMessage.update({
      where: { id },
      data: { read: body.read ?? true },
    });
    return NextResponse.json({ message });
  } catch {
    return NextResponse.json({ error: "Message not found" }, { status: 404 });
  }
}

// DELETE /api/admin/messages/[id]
export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;
  try {
    await prisma.contactMessage.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Message not found" }, { status: 404 });
  }
}
