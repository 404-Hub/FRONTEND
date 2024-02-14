import { withAuth } from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { handleAuth } from '@/authMiddleware';
import { handleLanguage } from '@/languageMiddleware';

const authRoutes: string[] = ['/dashboard'];
const verifyRoutes: string[] = ['/reset-password', '/verify-email'];
const guestRoutes: string[] = ['/forgot-password', '/login', '/password-reset', '/register'];

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)'],
};

export default withAuth(
  async (request: NextRequest): Promise<NextResponse | undefined> => {
    await handleAuth(request, authRoutes, verifyRoutes, guestRoutes);
    // console.log('Запрос:', request.headers);
    // const response = handleLanguage(request, 'i18next', 'lng');
    // if (response) {
    //   console.log('Ответ:', response.headers);
    // }
    // return response;
    return handleLanguage(request, 'i18next', 'lng');
  },
  {
    callbacks: {
      async authorized(): Promise<boolean> {
        return true;
      },
    },
  },
);
