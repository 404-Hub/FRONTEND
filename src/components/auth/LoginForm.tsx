'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import TextField from '@mui/material/TextField';
import { FormEvent } from 'react';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const credentials = Object.fromEntries(formData);
    const callbackUrl = searchParams.get('callbackUrl') || '/';

    signIn('credentials', { ...credentials, callbackUrl });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          id="email"
          name="email"
          type="email"
          defaultValue="john@avocado-media.nl"
          label={'email'}
        />

        <TextField
          id="password"
          name="password"
          type="password"
          defaultValue="password"
          label={'Password'}
        />

        <button type="submit">Login</button>
      </form>

      <FormError error={error} />
    </>
  );
}

function FormError({ error }: { error: string | null }) {
  if (!error) return null;

  const errorMessages: { [key: string]: string } = {
    CredentialsSignin: 'Invalid credentials',
    Default: 'Default Error Message',
  };

  return <p>{errorMessages[error]}</p>;
}
