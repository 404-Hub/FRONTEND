import { PropsWithChildren } from 'react';
import { AuthProvider } from '@/providers/AuthProvider';
import { UiProvider } from '@/providers/UiProvider';
import '@/styles/index.scss';

export const metadata = {
  title: '404 Hub',
  description: '',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <UiProvider>
        <AuthProvider>
          <body>{children}</body>
        </AuthProvider>
      </UiProvider>
    </html>
  );
}
