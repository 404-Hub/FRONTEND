import { getToken, JWT } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export const handleAuth = async (
  request: NextRequest,
  authRoutes: string[],
  verifyRoutes: string[],
  guestRoutes: string[]
): Promise<{ redirect?: URL; next?: boolean }> => {
  const token: JWT | null = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const isAuthRoute: boolean = authRoutes.some((route) => request.nextUrl.pathname.startsWith(route));
  const isVerifyRoute: boolean = verifyRoutes.some((route) => request.nextUrl.pathname.startsWith(route));
  const isGuestRoute: boolean = guestRoutes.some((route) => request.nextUrl.pathname.startsWith(route));

  if (!token) {
    if (isAuthRoute) {
      return { redirect: new URL('/login', request.url) };
    }
    if (isVerifyRoute) {
      const redirectUrl: URL = new URL('/login', request.url);
      redirectUrl.searchParams.set('callbackUrl', request.nextUrl.href);
      return { redirect: redirectUrl };
    }
    if (isGuestRoute) {
      return { next: true };
    }
  }

  if (token) {
    // if (!token.email_verified_at && !isVerifyRoute) {
    //   return { redirect: new URL('/verify-email', request.url) };
    // }
  }

  return { next: true };
};
