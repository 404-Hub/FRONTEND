import 'next-auth';
import type { User as UserNext } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  interface User extends UserNext {
    name: string;
    email: string;
    email_verified_at: string;
  }
  interface Session {
    user: User;
    accessToken?: string;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends UserNext {
    accessToken: string;
    accessTokenExpires: number;
  }
}
