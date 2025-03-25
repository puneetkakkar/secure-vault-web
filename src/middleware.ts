import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default function middleware(
  request: NextRequest,
  event: NextFetchEvent,
) {
  const path = request.nextUrl.pathname;

  // Allow direct access to sitemap.xml and robots.txt without i18n middleware processing
  // This ensures these files are properly served for SEO purposes
  if (path === "/sitemap.xml" || path === "/robots.txt") {
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Skip Next.js internals (`/api`, `/trpc`, `/_next`, `_vercel`
    // and all static files, unless found in search params
    "/((?!api|trpc|_next|monitoring|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
