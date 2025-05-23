import { isProduction } from "@/core/env";
import createMiddleware from "next-intl/middleware";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { routing } from "@/core/i18n";

const intlMiddleware = createMiddleware(routing);

export default function middleware(
  request: NextRequest,
  event: NextFetchEvent
) {
  const nonce = isProduction
    ? Buffer.from(crypto.randomUUID()).toString("base64")
    : undefined;

  const devCSP = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data:;
  connect-src 'self' http://localhost:8080 ws://localhost:3000;
  object-src 'none';
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
`;

  // TODO: Replace with actual production values
  const prodCSP = `
  default-src 'self';
  script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data:;
  connect-src 'self' http://localhost:8080 ws://localhost:3000;
  object-src 'none';
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
`;

  const cspHeader = isProduction ? prodCSP : devCSP;

  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, " ")
    .trim();

  // Handle static SEO files
  // Allow direct access to sitemap.xml and robots.txt without CSP and i18n middleware processing
  // This ensures these files are properly served for SEO purposes
  const path = request.nextUrl.pathname;
  if (path === "/robots.txt" || path === "/sitemap.xml") {
    const response = NextResponse.next();
    response.headers.set(
      "Content-Security-Policy",
      contentSecurityPolicyHeaderValue
    );
    return response;
  }

  const requestHeaders = new Headers(request.headers);
  if (nonce) {
    requestHeaders.set("x-nonce", nonce);
  }

  requestHeaders.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue
  );

  const req = new NextRequest(request, {
    headers: requestHeaders,
  });

  const response = intlMiddleware(req);

  response.headers.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue
  );

  return response;
}

export const config = {
  matcher: [
    // Skip Next.js internals (`/api`, `/trpc`, `/_next`, `_vercel`
    // and all static files, unless found in search params
    "/((?!api|trpc|_next|monitoring|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
