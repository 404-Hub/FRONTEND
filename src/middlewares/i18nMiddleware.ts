import createMiddleware from 'next-intl/middleware';

export const i18nMiddleware = createMiddleware({
  locales: ['en', 'ru'],
  defaultLocale: 'en',
});
