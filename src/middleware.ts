import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  const role: any = req.cookies.get("role");
  const { pathname } = req.nextUrl;
  const isAdminPage = ["/admin/users", "/admin/articles"];

  // Jika token tidak ada dan user bukan di halaman login
  if (!token && pathname !== "/auth/login") {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  // if (token && role?.value !== "admin" && isAdminPage.includes(pathname)) {
  //   return NextResponse.redirect(new URL("/profile", req.url));
  // }

  // Jika token ada dan user mencoba mengakses halaman login
  if (token && pathname === "/auth/login") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    "/auth/login",
    "/",
    "/profile",
    "/admin/:path*",
    "/dashboard/:path*",
  ],
};
