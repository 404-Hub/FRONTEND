import { getParty } from '@/api/server/party';
import { getCurrentUser } from '@/lib/session';
import PageClient from './PageClient';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const currentParty = await getParty(id);
  const currentUser = await getCurrentUser();

  console.log('Fetched currentParty:', currentParty);
  console.log('Fetched currentUser:', currentUser);

  return (
    <PageClient
      currentParty={currentParty}
      currentUser={currentUser}
    />
  );
}
