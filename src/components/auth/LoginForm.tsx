'use client';

import NextLink from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FormEvent, useState } from 'react';
import { Iconify } from '@/components/base/iconify/Iconify';

function FormError({ error }: { error: string | null }) {
  if (!error) return null;

  const errorMessages: { [key: string]: string } = {
    CredentialsSignin: 'Invalid credentials',
    Default: 'Default Error Message',
  };

  return <p>{errorMessages[error]}</p>;
}

export default function LoginForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const error = searchParams.get('error');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const credentials = Object.fromEntries(formData);
    const callbackUrl = searchParams.get('callbackUrl') || '/';

    signIn('credentials', { ...credentials, callbackUrl });
  }

  const handleClick = () => {
    router.push('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email"
        />

        <TextField
          name="password"
          label="Пароль"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <FormError error={error} />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        <FormControlLabel
          label="Оставаться в системе"
          control={<Checkbox name="remember" />}
        />
        <NextLink href={'/forgot-password'}>
          <Link
            sx={{
              cursor: 'pointer',
            }}
            component={'div'}
            variant="subtitle2"
            underline="hover"
          >
            Не получается войти?
          </Link>
        </NextLink>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleClick}
      >
        Войти
      </LoadingButton>
    </form>
  );
}
