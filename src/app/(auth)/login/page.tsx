import Link from 'next/link';
import Typography from '@mui/material/Typography';
import LoginForm from '@/components/auth/LoginForm';

export default function Page() {
  return (
    <>
      <Typography variant="h3">
        Login
      </Typography>

      <LoginForm />

      <ul>
        <li>
          <Link href="/register">Register</Link>
        </li>
        <li>
          <Link href="/forgot-password">Forgot password</Link>
        </li>
      </ul>
    </>
  );
}
