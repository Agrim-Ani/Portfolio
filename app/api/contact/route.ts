import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validation";
import { sendContactNotification } from "@/lib/email";

// POST /api/contact — validate, store the message, then email a notification.
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 },
    );
  }

  try {
    await prisma.contactMessage.create({ data: parsed.data });
  } catch (err) {
    console.error("[POST /api/contact] db error", err);
    return NextResponse.json(
      { error: "Could not save your message. Please try again." },
      { status: 500 },
    );
  }

  // Email is best-effort: a failure here shouldn't lose the stored message.
  try {
    await sendContactNotification(parsed.data);
  } catch (err) {
    console.error("[POST /api/contact] email error", err);
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
