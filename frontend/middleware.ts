import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_ROUTES = ['/login'];
const PROTECTED_ROUTES = ['/dashboard', '/compose', '/sent', '/templates', '/settings', '/'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasToken = request.cookies.has('api_token');

  if (PUBLIC_ROUTES.includes(pathname) && hasToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (PROTECTED_ROUTES.includes(pathname) && !hasToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard', '/compose', '/sent', '/templates', '/settings', '/login'],
};
