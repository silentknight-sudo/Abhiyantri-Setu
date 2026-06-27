import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// Public routes — anyone can access without logging in 
const PUBLIC_ROUTES = [
  "/",
  "/about",
  "/services",
  "/contact",
  "/jobs",    // job listings browse page (not /jobs/post)
  "/ai",
];

// Auth routes — logged-in users should not see these
const AUTH_ROUTES = ["/auth"];

// Helpers 
function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );
}

function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );
}

// Middleware 
export default async function Middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Always allow: Next.js internals, Better Auth API, static files ────────
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth") || // Better Auth endpoints — never block
    pathname.startsWith("/favicon") ||
    pathname.includes(".")              // static files (.jpg, .png, .svg etc.)
  ) {
    return NextResponse.next();
  }

  // Read session cookie — edge-safe, no DB call
  const sessionCookie = await getSessionCookie(request);
  const isLoggedIn = !!sessionCookie;

  // Case 1: /auth + already logged in → redirect to dashboard ────────────
  if (isAuthRoute(pathname) && isLoggedIn) {
  return NextResponse.redirect(
    new URL("/dashboard", request.url)
  );
}

  // Case 2: /auth + not logged in → allow through ────────────────────────
  if (isAuthRoute(pathname)) {
    return NextResponse.next();
  }

  // Case 3: Public route → always allow 
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  //  Case 4: Everything else + not logged in → redirect to /auth ──────────
  // Covers /client/dashboard, /jobs/post, /provider/dashboard,
  // and ANY new route you add — protected by default 
  if (!isLoggedIn) {
    const loginUrl = new URL("/auth", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Case 5: Logged in + any route → allow
  return NextResponse.next();
}

// Matcher 
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};