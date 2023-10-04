import Link from 'next/link';
import { ForgotPasswordForm } from '@/containers/forgot-password-form';

export default function Page() {
  return (
    <>
      <h1>Forgot password</h1>

      <ForgotPasswordForm />

      <ul>
        <li>
          <Link href="/login">Login</Link>
        </li>
      </ul>
    </>
  );
}
