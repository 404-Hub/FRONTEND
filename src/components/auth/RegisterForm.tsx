'use client';

import { useCallback, useState } from 'react';
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
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignUpDto, signUpDtoSchema } from '@/api/auth/signUp';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const error = searchParams.get('error');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpDto>({
    resolver: yupResolver(signUpDtoSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      password_confirmation: '',
    },
  });

  const onSubmit = useCallback(
    async (data: SignUpDto) => {
      try {
        const response = await fetchClient({
          method: 'POST',
          url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/register`,
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw response;
        }

        const credentials = {
          email: data.email,
          password: data.password,
        };

        await signIn('credentials', { ...credentials, callbackUrl: '/' });
      } catch (err) {
        // todo: handle error
        if (err instanceof Response) {
          try {
            const response = await err.json();
            console.log('Response JSON:', response); // Логирование ответа
            if (response.details && response.details.email) {
              setErrorMessage(response.details.email[0]);
            } else if (response.message) {
              setErrorMessage(response.message);
            } else {
              setErrorMessage('An unexpected error occurred.');
            }
          } catch (parseError) {
            console.error('Failed to parse response JSON:', parseError);
            setErrorMessage('Failed to parse response.');
          }
        } else {
          console.error('An error occurred:', err);
          setErrorMessage('An error has occurred during registration request');
        }
      }
    },
    [router, error]
  );
  const handleCloseSnackbar = () => {
    setErrorMessage(null);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              name="email"
              label="Email"
              value={field.value}
              onChange={field.onChange}
              error={!!errors.email?.message}
              helperText={errors.email?.message}
            />
          )}
        />

        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              name="name"
              label="Name"
              value={field.value}
              onChange={field.onChange}
              error={!!errors.name?.message}
              helperText={errors.name?.message}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
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
              value={field.value}
              onChange={field.onChange}
              error={!!errors.password?.message}
              helperText={errors.password?.message}
            />
          )}
        />

        <Controller
          name="password_confirmation"
          control={control}
          render={({ field }) => (
            <TextField
              name="password_confirmation"
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
              value={field.value}
              onChange={field.onChange}
              error={!!errors.password_confirmation?.message}
              helperText={errors.password_confirmation?.message}
            />
          )}
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

      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: '100%' }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </form>
  );
}
