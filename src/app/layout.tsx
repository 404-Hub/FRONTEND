import { PropsWithChildren } from 'react';
import { AuthProvider } from '@/providers/AuthProvider';
import { ViewportProvider } from '@/providers/ViewportProvider';
import '@/styles/index.scss';
import { ThemeProvider } from '@/theme';

export const metadata = {
  title: '404 Hub',
  description: '',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <ThemeProvider>
        <ViewportProvider>
          <AuthProvider>
            <body>{children}</body>
          </AuthProvider>
        </ViewportProvider>
      </ThemeProvider>
    </html>
  );
}
