import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const authRoutes = ['/dashboard'];
const verifyRoutes = ['/request-email-verification', '/verify-email'];
const guestRoutes = ['/forgot-password', '/login', '/password-reset', '/register'];

export async function authMiddleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = request.nextUrl;
  console.log('pathname', pathname);
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isVerifyRoute = verifyRoutes.some((route) => pathname.startsWith(route));
  const isGuestRoute = guestRoutes.some((route) => pathname.startsWith(route));

  if (!token && (isAuthRoute || isVerifyRoute)) {
    const redirectUrl = new URL('/login', request.url);
    redirectUrl.searchParams.set('callbackUrl', request.nextUrl.href);
    return NextResponse.redirect(redirectUrl);
  }

  if (token) {
    if (!token.email_verified_at && !isVerifyRoute) {
      return NextResponse.redirect(new URL('/request-email-verification', request.url));
    }

    if (pathname === '/' || isGuestRoute || isVerifyRoute) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }
  return undefined;
}
