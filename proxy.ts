import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ACCESS_COOKIE } from "./lib/session";

export default async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const protectedArea =
    path.startsWith("/dashboard") || path.startsWith("/admin");
  if (!protectedArea) {
    return NextResponse.next();
  }

  const token = request.cookies.get(ACCESS_COOKIE)?.value;
  if (!token) {
    const login = new URL("/auth/login", request.url);
    login.searchParams.set("next", path);
    return NextResponse.redirect(login);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/admin", "/admin/:path*"],
};
