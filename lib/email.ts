import { Resend } from "resend";
import type { ContactInput } from "./validation";

/**
 * Send a contact-form notification email via Resend.
 * If RESEND_API_KEY is not configured, this is a no-op (the message is still
 * stored in the DB by the caller) — useful for local development.
 */
export async function sendContactNotification(data: ContactInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.info("[email] RESEND_API_KEY not set — skipping email notification.");
    return;
  }

  const resend = new Resend(apiKey);
  const to = process.env.CONTACT_TO_EMAIL ?? "agrimani.125@gmail.com";
  const from = process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>";

  await resend.emails.send({
    from,
    to,
    replyTo: data.email,
    subject: `New portfolio message from ${data.name}`,
    text: `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`,
  });
}
