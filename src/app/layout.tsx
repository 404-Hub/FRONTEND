import { PropsWithChildren } from 'react';
import { AuthProvider } from '@/providers/AuthProvider';
import { ViewportProvider } from '@/providers/ViewportProvider';
import '@/styles/index.scss';
import { ThemeProvider } from '@/theme';
import { dir } from 'i18next';
import { detectLanguage } from './i18n';

export const metadata = {
  title: '404 Hub',
  description: '',
};

export default function RootLayout({ children }: PropsWithChildren) {
  // console.log('Вызов DL в RootLayout=>');
  const lng = detectLanguage();
  // console.log('RootLayout lng=>', lng);
  // setTimeout(() => {
  //   console.log('обновление языка из кукп время>', new Date());
  //   console.log('обновление языка из куки язык=>', detectLanguage());
  // }, 10000);
  return (
    <html lang={lng} dir={dir(lng)}>
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
