'use client';

import fetchClient from '@/lib/fetch-client';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function VerifyEmailForm() {
  const router = useRouter();
  const { update } = useSession();
  const searchParams = useSearchParams();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const pathname = '/api/email/verification-notification';
      const response = await fetchClient({
        method: 'post',
        url: process.env.NEXT_PUBLIC_BACKEND_API_URL + pathname,
      });

      if (!response.ok) {
        throw response;
      }

      await update({ type: 'MANUAL' });

      router.push('/dashboard');
    } catch (error) {
      throw new Error('Could not verify email', { cause: error });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Verify</button>
    </form>
  );
}
