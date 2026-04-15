import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { getJwtSecret } from "./lib/admin-auth";

const ADMIN_SESSION_COOKIE = "kuleta_admin_session";



async function isAuthenticated(request: NextRequest) {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) {
    return false;
  }

  try {
    await jwtVerify(token, getJwtSecret());
    return true;
  } catch {
    return false;
  }
}

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminApi = pathname.startsWith("/api/back-office-console");
  const isAuthApi = pathname.startsWith("/api/back-office-console/auth");
  const isAdminPage = pathname.startsWith("/back-office-console");
  const isLoginPage = pathname === "/back-office-console/login";

  if ((!isAdminApi && !isAdminPage) || isAuthApi || isLoginPage) {
    return NextResponse.next();
  }

  const authenticated = await isAuthenticated(request);
  if (authenticated) {
    return NextResponse.next();
  }

  if (isAdminApi) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = new URL("/back-office-console/login", request.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/back-office-console/:path*", "/api/back-office-console/:path*"],
};
