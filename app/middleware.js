// middleware.js
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Paths that require authentication
  const protectedPaths = ['/dashboard'];

  // Check if the current path is protected
  if (protectedPaths.includes(pathname)) {
    // Fetch the session or token from cookies
    const token = req.cookies.get('auth-token')?.value;

    if (!token) {
      // If no token, redirect to the login page
      return NextResponse.redirect(new URL('/trytologin', req.url));
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}
