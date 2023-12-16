import { NextRequest } from 'next/server';
import { i18nMiddleware } from './middlewares/i18nMiddleware';
import { authMiddleware } from './middlewares/authMiddleware';

export default async function middleware(request: NextRequest) {
  const i18nResponse = await i18nMiddleware(request);
  const authResponse = await authMiddleware(request);
  return authResponse || i18nResponse;
}

export const config = {
  matcher: [
    '/', '/(ru|en)/:path*',
  ],
};
