import { PropsWithChildren } from 'react';
import { Navigation } from '@/components/layout/Navigation';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
}
