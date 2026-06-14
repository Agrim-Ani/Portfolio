import { z } from "zod";

export const loginSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email("A valid email is required").max(200),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(5000),
});

// Coerce comma-or-array tech stack input into a clean string[].
const techStack = z
  .union([z.string(), z.array(z.string())])
  .transform((val) =>
    (Array.isArray(val) ? val : val.split(","))
      .map((t) => t.trim())
      .filter(Boolean),
  );

const optionalUrl = z
  .string()
  .trim()
  .url("Must be a valid URL")
  .optional()
  .or(z.literal("").transform(() => undefined));

// Images may be a full URL (https://…) OR a root-relative path (/images/foo.png
// served from /public).
const optionalImage = z
  .string()
  .trim()
  .optional()
  .transform((v) => (v ? v : undefined))
  .refine(
    (v) => v === undefined || v.startsWith("/") || /^https?:\/\//i.test(v),
    { message: "Image must be a full URL (https://…) or a path starting with /" },
  );

export const projectSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(160),
  description: z.string().trim().min(1, "Description is required").max(2000),
  category: z.string().trim().min(1, "Category is required").max(80),
  techStack: techStack.default([]),
  githubUrl: optionalUrl,
  liveUrl: optionalUrl,
  demoUrl: optionalUrl,
  imageUrl: optionalImage,
  featured: z.boolean().default(false),
  order: z.coerce.number().int().default(0),
});

export const projectUpdateSchema = projectSchema.partial();

export type ContactInput = z.infer<typeof contactSchema>;
export type ProjectInput = z.infer<typeof projectSchema>;
