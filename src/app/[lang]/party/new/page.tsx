import { Container } from '@mui/material';
import { redirect } from 'next/navigation';
import { getRoles } from '@/api/server/roles';
import NewParty from './_components/NewParty';

export default async function NewPartyPage({ searchParams }: { searchParams: Record<string, string> }) {
  const { ideaId } = searchParams;
  if (!ideaId) {
    redirect('/categories/new');
  }

  const roles = await getRoles();

  return (
    <Container
      component="main"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 1.5,
        padding: 0,
        height: 'calc(100% - 74px)',
      }}
    >
      <NewParty
        rolesInfo={roles}
        ideaId={ideaId}
      />
    </Container>
  );
}
