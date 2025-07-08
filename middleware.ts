import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const pathname = request.nextUrl.pathname;

  // Public routes
  const publicRoutes = [
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
  ];
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // Protected routes
  const protectedRoutes = ['/dashboard', '/profile', '/checkout'];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // Nếu vào route cần bảo vệ mà không có token
  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Nếu đang login/register mà đã có token => redirect về dashboard
  if (isPublicRoute && token) {
    if (pathname === '/login' || pathname === '/register') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  // Chạy middleware của next-intl cuối cùng
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Loại trừ các route tĩnh
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
