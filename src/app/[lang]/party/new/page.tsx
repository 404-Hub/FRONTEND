import { Container } from '@mui/material';
import { redirect } from 'next/navigation';
import NewParty from './_components/NewParty';

export default function NewPartyPage({ searchParams }: { searchParams: Record<string, string> }) {
  const { ideaId } = searchParams;
  if (!ideaId) {
    redirect('/categories/new');
  }
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
      <NewParty ideaId={ideaId} />
    </Container>
  );
}
