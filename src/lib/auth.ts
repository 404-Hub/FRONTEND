import fetchClient from '@/lib/fetch-client';
import { jwt } from '@/lib/utils';
import type { NextAuthOptions, User } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

async function refreshAccessToken(token: JWT) {
  try {
    const response = await fetchClient({
      method: 'POST',
      url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/refresh`,
      token: token.accessToken,
    });

    if (!response.ok) throw response;

    const refreshedAccessToken: { access_token: string } = await response.json();
    const { exp } = jwt.decode(refreshedAccessToken.access_token);

    return {
      ...token,
      accessToken: refreshedAccessToken.access_token,
      exp,
    };
  } catch (error) {
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: parseInt(process.env.NEXTAUTH_JWT_AGE!, 10) || 1209600,
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        try {
          const response = await fetchClient({
            method: 'POST',
            url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/login`,
            body: JSON.stringify(credentials),
          });

          if (!response.ok) {
            throw response;
          }

          const data: { user: User; access_token: string } = await response.json();

          if (!data?.access_token) {
            throw response;
          }

          return { ...data.user, accessToken: data?.access_token };
        } catch (error) {
          if (error instanceof Response) {
            return null;
          }

          throw new Error('An error has occurred during login request');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({
      token, user, trigger, session,
    }) {
      if (trigger === 'update') {
        if (session.type === 'MANUAL') {
          const response = await fetchClient({
            url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/user`,
            token: token.accessToken,
          });
          const fetchedUser = await response.json();

          return { ...token, ...fetchedUser };
        }

        return { ...token, ...session };
      }

      if (user) {
        return { ...token, ...user };
      }

      const { exp: accessTokenExpires } = jwt.decode(token.accessToken);

      if (!accessTokenExpires) {
        return token;
      }

      const currentUnixTimestamp = Math.floor(Date.now() / 1000);
      const accessTokenHasExpired = currentUnixTimestamp > accessTokenExpires;

      if (accessTokenHasExpired) {
        // eslint-disable-next-line no-return-await
        return await refreshAccessToken(token);
      }

      return token;
    },
    async session({ session, token }) {
      if (token.error) {
        throw new Error('Refresh token has expired');
      }

      // @todo: разобраться с ошибками eslint
      // eslint-disable-next-line no-param-reassign
      session.accessToken = token.accessToken;
      // eslint-disable-next-line no-param-reassign
      session.user.name = token.name || '';
      // eslint-disable-next-line no-param-reassign
      session.user.email = token.email || '';
      // eslint-disable-next-line no-param-reassign
      session.user.email_verified_at = token.email_verified_at;

      return session;
    },
  },
  events: {
    async signOut({ token }) {
      await fetchClient({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/logout`,
        token: token.accessToken,
      });
    },
  },
};
