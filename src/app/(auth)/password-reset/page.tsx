import Link from 'next/link';
import PasswordResetForm from '@/containers/password-reset-form';

export default function Page() {
  return (
    <>
      <h1>Password reset</h1>

      <PasswordResetForm />

      <ul>
        <li>
          <Link href="/login">Login</Link>
        </li>
      </ul>
    </>
  );
}
