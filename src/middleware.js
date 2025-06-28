import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const protectedPaths = ["/start", "/dashboard", "/profile", "/storage"];

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      const signInUrl = new URL("/auth/signin", request.url);
      signInUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(signInUrl);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/start","/storage","/dashboard", "/profile", "/flashcards", "/learn"],
};