'use client';

import { useCallback, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import NextLink from 'next/link';
import Link from '@mui/material/Link';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Iconify } from '@/components/base/iconify/Iconify';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignInDto, signInDtoSchema } from '@/api/auth/signIn';

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

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInDto>({
    resolver: yupResolver(signInDtoSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = useCallback(async (data: SignInDto) => {
    const callbackUrl = searchParams.get('callbackUrl') || '/';

    await signIn('credentials', { ...data, callbackUrl });
  }, [searchParams]);

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
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              name="password"
              label="Пароль"
              type={showPassword ? 'text' : 'password'}
              value={field.value}
              onChange={field.onChange}
              error={!!errors.password?.message}
              helperText={errors.password?.message}
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
          )}
        />
      </Stack>

      <FormError error={error} />

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
        Войти
      </LoadingButton>
    </form>
  );
}
