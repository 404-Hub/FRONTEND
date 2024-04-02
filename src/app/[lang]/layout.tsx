import React from 'react';
import { AuthProvider } from '@/providers/AuthProvider';
import { ViewportProvider } from '@/providers/ViewportProvider';
import '@/styles/index.scss';
import { ThemeProvider } from '@/theme';
import { Navigation } from '@/components/layout/Navigation';

export const metadata = {
  title: '404 Hub',
  description: '',
};

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  return (
    <html lang={locale}>
    <ThemeProvider>
      <ViewportProvider>
        <AuthProvider>
            <body>
              <Navigation />
              {children}
            </body>
          </AuthProvider>
        </ViewportProvider>
      </ThemeProvider>
    </html>
  );
}
