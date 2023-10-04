import Link from 'next/link';
import UserNavigation from '@/containers/user-navigation';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div>
      <header>
        <div>
          <Link href="/">Logo</Link>

          <UserNavigation />
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}
