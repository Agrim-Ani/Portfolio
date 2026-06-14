import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

// Protects the admin dashboard pages and the admin API routes.
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const authed = await verifySessionToken(token);

  const isAdminApi = pathname.startsWith("/api/admin");
  const isAdminPage =
    pathname.startsWith("/admin") && pathname !== "/admin/login";

  if (!authed && isAdminApi) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!authed && isAdminPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  // Already logged in — skip the login page.
  if (authed && pathname === "/admin/login") {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
