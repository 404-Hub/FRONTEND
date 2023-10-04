'use client';

import { FormEvent } from 'react';
import fetchClient from '@/lib/fetch-client';
import TextField from '@mui/material/TextField';

export function ChangePasswordForm() {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetchClient({
        method: 'PATCH',
        url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/user/change-password`,
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      if (!response.ok) {
        throw response;
      }
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
      <label htmlFor="password">Password</label>
      <TextField
        id="password"
        name="password"
        type="password"
        defaultValue="password"
      />

      <label htmlFor="password_confirmation">Password confirmation</label>
      <TextField
        id="password_confirmation"
        name="password_confirmation"
        type="password"
        defaultValue="password"
      />

      <button type="submit">Change password</button>
    </form>
  );
}
