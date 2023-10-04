import { PropsWithChildren } from 'react';
import { AuthProvider } from '@/providers/AuthProvider.tsx';
import { UiProvider } from '@/providers/UiProvider.tsx';
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
