import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import type { Role } from '@/types/user';

const PUBLIC_PATHS = [
  '/',
  '/about',
  '/pricing',
  '/team',
  '/careers',
  '/contact',
  '/live',
  '/login',
  '/signup',
  '/unauthorized',
  '/api/health',
  '/api/auth',
  '/api/contact',
  '/api/content',
  '/api/docs',
];

function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const role = req.nextauth.token?.role as Role | undefined;

    if (pathname.startsWith('/admin') && role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
    if (pathname.startsWith('/manager') && role !== 'MANAGER' && role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
    if (pathname.startsWith('/dashboard') && !role) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        if (isPublicPath(pathname)) return true;
        if (pathname.startsWith('/admin')) return token?.role === 'ADMIN';
        if (pathname.startsWith('/manager')) {
          return token?.role === 'MANAGER' || token?.role === 'ADMIN';
        }
        if (pathname.startsWith('/dashboard')) return !!token;
        return true;
      },
    },
  },
);

export const config = {
  matcher: ['/admin/:path*', '/manager/:path*', '/dashboard/:path*'],
};
