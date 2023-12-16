import NextLink from 'next/link';
import Link from '@mui/material/Link';
import { Typography } from '@mui/material';
import RegisterForm from '@/components/auth/RegisterForm';

export default function Page() {
  return (
    <>
      <Typography
        variant="h4"
        gutterBottom
      >
        Регистрация | 404 Hub
      </Typography>

      <Typography
        component={'div'}
        variant="body2"
        sx={{ mb: 5 }}
      >
        Уже зарегистрированы? {''}
        <NextLink href={'/login'}>
          <Link
            component={'span'}
            variant="subtitle2"
          >
            Войти
          </Link>
        </NextLink>
      </Typography>

      <RegisterForm />
    </>
  );
}
