// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Define paths that don't need authentication
const PUBLIC_PATHS = [
  '/login',
  '/register',
  '/api',
  '/_next',      // Next.js static files
  '/favicon.ico', // favicon
  '/assets',     // optional: static assets folder
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip authentication for public paths
  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Get NextAuth token from request cookies
  const headers=req.headers;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // If no token, redirect to login
  if (!token) {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  // User is authenticated, proceed
  return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'], 
};
