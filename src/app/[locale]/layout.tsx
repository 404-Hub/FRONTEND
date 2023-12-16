import { PropsWithChildren } from 'react';
import { AuthProvider } from '@/providers/AuthProvider';
import { ViewportProvider } from '@/providers/ViewportProvider';
import '@/styles/index.scss';
import { ThemeProvider } from '@/theme';
import { notFound } from 'next/navigation';
import { LocaleProvider } from '@/providers/LocaleProvider';

export const metadata = {
  title: '404 Hub',
  description: '',
};

export default function RootLayout({ children, params: { locale } }: PropsWithChildren) {
  const locales = ['en', 'ru'];
  if (!locales.includes(locale as any)) notFound();
  return (
    <html lang={locale}>
    <ThemeProvider>
      <ViewportProvider>
        <AuthProvider>
          <LocaleProvider locale={locale}>
            <body>{children}</body>
          </LocaleProvider>
        </AuthProvider>
      </ViewportProvider>
    </ThemeProvider>
    </html>
  );
}
