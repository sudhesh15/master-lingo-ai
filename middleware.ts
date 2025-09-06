// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/landing"
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  
  // If user is not authenticated and trying to access protected route
  if (!userId && !isPublicRoute(req)) {
    return NextResponse.redirect(new URL("/landing", req.url));
  }
  
  // If user is authenticated and trying to access landing page, redirect to app
  if (userId && req.nextUrl.pathname === "/landing") {
    return NextResponse.redirect(new URL("/app", req.url));
  }
  
  // If user is authenticated and at root, redirect to app
  if (userId && req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/app", req.url));
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};