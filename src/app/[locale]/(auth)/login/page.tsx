'use client';

import NextLink from 'next/link';
import { Link, Typography } from '@mui/material';
import LoginForm from '@/components/auth/LoginForm';

export default function Page() {
  return (
    <>
      <Typography
        variant="h4"
        gutterBottom
      >
        Войти | 404 Hub
      </Typography>

      <Typography
        component={'div'}
        variant="body2"
        sx={{ mb: 5 }}
      >
        Нет аккаунта? {''}
        <NextLink href={'/register'}>
          <Link
            component={'span'}
            variant="subtitle2"
            sx={{
              cursor: 'pointer',
            }}
          >
            Зарегистрироваться
          </Link>
        </NextLink>
      </Typography>

      {/* <Divider sx={{ my: 3 }}> */}
      {/*  <Typography variant="body2" sx={{ color: 'text.secondary' }}> */}
      {/*    ИЛИ */}
      {/*  </Typography> */}
      {/* </Divider> */}

      <LoginForm />
    </>
  );
}
