import { PropsWithChildren } from 'react';
import { Header } from '@/components/layout/Header';

export default function Layout({
  children,
}: PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
