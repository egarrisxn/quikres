import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { PRIVATE_ROUTES } from "./lib/constants";

const isPrivateRoute = createRouteMatcher(
  PRIVATE_ROUTES.map((route) => `/${route}`)
);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  if (isPrivateRoute(req) && !userId) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("redirect_url", req.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
