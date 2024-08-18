import { getSession, signOut } from 'next-auth/react';

interface fetchClientProps {
  method?: string;
  url: string;
  body?: string | FormData;
  contentType?: string;
  token?: string;
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

async function fetchClient({ method = 'GET', url, body = '', token }: fetchClientProps) {
  try {
    const session = await getSession();
    const accessToken = token || session?.accessToken;

    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };

    if (typeof body === 'string') {
      Object.assign(headers, { 'Content-Type': 'application/json' });
    }

    const response = await fetch(url.toString(), {
      method,
      headers,
      body: body || undefined,
    });

    if (!response.ok) {
      throw response;
    }

    return response;
  } catch (error) {
    console.log('inside catch');
    console.log(error);
    if (error instanceof Response) {
      if (error.status === 401) {
        signOut();
      }

      if (error.status === 409) {
        window.location.href = '/verify-email';
      }

      throw error;
    }

    throw new Error('Failed to fetch data', { cause: error });
  }
}

export default fetchClient;
