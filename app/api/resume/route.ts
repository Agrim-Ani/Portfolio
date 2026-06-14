import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";

const RESUME_PATH = path.join(
  process.cwd(),
  "public",
  "resume",
  "AgrimSangotra_Resume.pdf",
);

// GET /api/resume — stream the résumé PDF as a download.
export async function GET() {
  try {
    const file = await readFile(RESUME_PATH);
    return new NextResponse(new Uint8Array(file), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="Agrim-Sangotra-Resume.pdf"',
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return NextResponse.json(
      {
        error:
          "Résumé not available yet. Add your PDF at public/resume/AgrimSangotra_Resume.pdf",
      },
      { status: 404 },
    );
  }
}
