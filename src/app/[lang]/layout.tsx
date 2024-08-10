import React from 'react';
import { AuthProvider } from '@/providers/AuthProvider';
import { ViewportProvider } from '@/providers/ViewportProvider';
import '@/styles/index.scss';
import { ThemeProvider } from '@/theme';
import { Navigation } from '@/components/layout/Navigation';
import ContextProvider from '@/providers/ContextProvider';
import Box from '@mui/material/Box';

export const metadata = {
  title: '404 Hub',
  description: '',
};

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale}>
      <ThemeProvider>
        <ViewportProvider>
          <AuthProvider>
            <ContextProvider>
              <body>
                <Box sx={{ height: '100dvh' }}>
                  <Navigation />
                  {children}
                </Box>
              </body>
            </ContextProvider>
          </AuthProvider>
        </ViewportProvider>
      </ThemeProvider>
    </html>
  );
}
