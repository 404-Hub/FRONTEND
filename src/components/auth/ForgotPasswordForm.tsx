'use client';

import fetchClient from '@/lib/fetch-client';
import { FormEvent } from 'react';
import TextField from '@mui/material/TextField';

export function ForgotPasswordForm() {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetchClient({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/forgot-password`,
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      if (!response.ok) {
        throw response;
      }

      localStorage.setItem('UserEmail', formData.get('email') as string);
    } catch (error) {
      if (error instanceof Response) {
        const response = await error.json();

        if (!response.errors) {
          throw error;
        }

        return Object.keys(response.errors).map((errorKey) => {
          const input = document.querySelector(`[name="${errorKey}"]`) as HTMLInputElement;
          input.setCustomValidity(response.errors[errorKey]);
          input.reportValidity();
        });
      }

      throw new Error('An error has occurred during forgot password request');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <TextField
        id="email"
        name="email"
        type="email"
        placeholder="john@avocado-media.nl"
      />

      <button type="submit">Send</button>
    </form>
  );
}
