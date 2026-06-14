import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/admin/messages — list contact messages, newest first.
export async function GET() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ messages });
}
