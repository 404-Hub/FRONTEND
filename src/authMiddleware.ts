import { getToken, JWT } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export const handleAuth = async (
  request: NextRequest,
  authRoutes: string[],
  verifyRoutes: string[],
  guestRoutes: string[],
): Promise<NextResponse | undefined> => {
  const token: JWT | null = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const isIndexPage: boolean = request.nextUrl.pathname === '/';
  const isAuthRoute: boolean = authRoutes
    .some((route) => request.nextUrl.pathname.startsWith(route));
  const isVerifyRoute: boolean = verifyRoutes
    .some((route) => request.nextUrl.pathname.startsWith(route));
  const isGuestRoute: boolean = guestRoutes
    .some((route) => request.nextUrl.pathname.startsWith(route));

  if (!token && (isAuthRoute || isVerifyRoute)) {
    const redirectUrl: URL = new URL('/login', request.url);
    redirectUrl.searchParams.set('callbackUrl', request.nextUrl.href);
    return NextResponse.redirect(redirectUrl);
  }

  if (token) {
    if (!token.email_verified_at && !isVerifyRoute) {
      return NextResponse.redirect(new URL('/verify-email', request.url));
    }

    if (isIndexPage || isGuestRoute || isVerifyRoute) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
};
