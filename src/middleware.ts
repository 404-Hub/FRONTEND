import { withAuth } from 'next-auth/middleware';
import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { handleAuth } from '@/authMiddleware';

const authRoutes: string[] = ['/dashboard', '/tasks', '/projects/new'];
const verifyRoutes: string[] = ['/reset-password', '/verify-email'];
const guestRoutes: string[] = ['/forgot-password', '/login', '/password-reset', '/register'];

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\..*|assets|favicon.ico|sw.js).*)'],
};

export default withAuth(
  async (request: NextRequest): Promise<NextResponse | undefined> => {
    const authResult = await handleAuth(request, authRoutes, verifyRoutes, guestRoutes);

    if (authResult?.redirect) {
      return NextResponse.redirect(authResult.redirect);
    }

    // Step 1: Use the incoming request (example)
    const defaultLocale = request.headers.get('x-default-locale') || 'en';

    // Step 2: Create and call the next-intl middleware (example)
    const handleI18nRouting = createIntlMiddleware({
      locales: ['en', 'de'],
      localePrefix: 'never',
      defaultLocale: defaultLocale || 'en',
      localeDetection: false,
    });
    const response = handleI18nRouting(request);

    // Step 3: Alter the response (example)
    response.headers.set('x-your-custom-locale', defaultLocale);

    return response;

    // return handleLanguage(request, 'i18next', 'lng');
  },
  {
    callbacks: {
      async authorized(): Promise<boolean> {
        return true;
      },
    },
  },
);
