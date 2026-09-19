import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";

import { routing } from "./i18n/routing";
import { verifySession } from "./lib/auth";

const intlMiddleware = createMiddleware(routing);

const SESSION_COOKIE_NAME = "admin-session";

type Locale = (typeof routing.locales)[number];

const protectedRoutes = ["/dashboard"] as const;

const guestOnlyRoutes = ["/login"] as const;

function isSupportedLocale(value: string): value is Locale {
  return routing.locales.includes(value as Locale);
}

function getPathnameLocale(pathname: string): Locale | null {
  const firstSegment = pathname.split("/")[1];

  return isSupportedLocale(firstSegment) ? firstSegment : null;
}

function removeLocalePrefix(pathname: string, locale: Locale | null): string {
  if (!locale) {
    return pathname || "/";
  }

  const withoutLocale = pathname.slice(locale.length + 1);

  return withoutLocale || "/";
}

function matchesRoute(pathname: string, route: string): boolean {
  return pathname === route || pathname.startsWith(`${route}/`);
}

function createLocalizedPath(path: string, locale: Locale | null): string {
  const resolvedLocale = locale ?? routing.defaultLocale;

  return `/${resolvedLocale}${path}`;
}

function createCallbackPath(request: NextRequest): string {
  return `${request.nextUrl.pathname}${request.nextUrl.search}`;
}

function clearSessionCookie(response: NextResponse): void {
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: "",
    expires: new Date(0),
    maxAge: 0,
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

function redirectToLogin(
  request: NextRequest,
  locale: Locale | null,
  shouldClearSession = false,
): NextResponse {
  const loginUrl = request.nextUrl.clone();

  loginUrl.pathname = createLocalizedPath("/login", locale);

  loginUrl.search = "";

  loginUrl.searchParams.set("callbackUrl", createCallbackPath(request));

  const response = NextResponse.redirect(loginUrl);

  if (shouldClearSession) {
    clearSessionCookie(response);
  }

  return response;
}

function redirectToDashboard(
  request: NextRequest,
  locale: Locale | null,
): NextResponse {
  const dashboardUrl = request.nextUrl.clone();

  dashboardUrl.pathname = createLocalizedPath("/dashboard", locale);

  dashboardUrl.search = "";

  return NextResponse.redirect(dashboardUrl);
}

async function getValidSession(
  request: NextRequest,
): Promise<Awaited<ReturnType<typeof verifySession>> | null> {
  const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionToken) {
    return null;
  }

  try {
    return await verifySession(sessionToken);
  } catch (error) {
    console.error("[Proxy session verification failed]", {
      pathname: request.nextUrl.pathname,
      error:
        error instanceof Error
          ? error.message
          : "Unknown session verification error",
    });

    return null;
  }
}

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  const locale = getPathnameLocale(pathname);

  const applicationPathname = removeLocalePrefix(pathname, locale);

  const isProtectedRoute = protectedRoutes.some((route) =>
    matchesRoute(applicationPathname, route),
  );

  const isGuestOnlyRoute = guestOnlyRoutes.some((route) =>
    matchesRoute(applicationPathname, route),
  );

  if (isProtectedRoute) {
    const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;

    if (!sessionToken) {
      return redirectToLogin(request, locale);
    }

    const session = await getValidSession(request);

    if (!session) {
      return redirectToLogin(request, locale, true);
    }
  }

  if (isGuestOnlyRoute) {
    const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;

    if (sessionToken) {
      const session = await getValidSession(request);

      if (session) {
        return redirectToDashboard(request, locale);
      }

      const response = intlMiddleware(request);

      clearSessionCookie(response);

      return response;
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
