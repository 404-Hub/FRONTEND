'use client';

import { FormEvent, useState } from 'react';
import fetchClient from '@/lib/fetch-client';
import { signIn } from 'next-auth/react';
import TextField from '@mui/material/TextField';

import NextLink from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import LoadingButton from '@mui/lab/LoadingButton';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetchClient({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/register`,
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      if (!response.ok) {
        throw response;
      }

      const credentials = {
        email: formData.get('email'),
        password: formData.get('password'),
      };

      await signIn('credentials', credentials);

      router.push('/');
    } catch (err) {
      // todo: handle error
      if (err instanceof Response) {
        const response = await err.json();

        if (!response.errors) {
          throw error;
        }
      }

      throw new Error('An error has occurred during registration request');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email"
        />

        <TextField
          name="name"
          label="Name"
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

        <TextField
          name="passwordConfirmation"
          label="Подтверждение пароля"
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
      >
        Зарегистрироваться
      </LoadingButton>
    </form>
  );
}
