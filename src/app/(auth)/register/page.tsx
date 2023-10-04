import Link from 'next/link';
import RegisterForm from '@/containers/register-form';

export default function Page() {
  return (
    <>
      <h1>Register</h1>

      <RegisterForm />

      <ul>
        <li>
          <Link href="/login">Login</Link>
        </li>
      </ul>
    </>
  );
}
