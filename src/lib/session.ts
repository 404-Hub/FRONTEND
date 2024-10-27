import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth/next';

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  return session?.user;
}

export async function checkIsOwner(userId: number) {
  const session = await getServerSession(authOptions);
  const sessionUserId: number | undefined = session?.user?.id as number | undefined;

  if (!sessionUserId) return false;

  return sessionUserId === userId;
}
