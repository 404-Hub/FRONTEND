'use client';

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
        <Link variant="subtitle2">Зарегистрироваться</Link>
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
