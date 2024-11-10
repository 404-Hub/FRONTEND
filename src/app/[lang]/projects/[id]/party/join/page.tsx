import { Container, Typography } from '@mui/material';
import { getParty } from '@/api/server/party';
import { getCurrentUser } from '@/lib/session';
import { getRoles } from '@/api/server/roles';
import JoinPageClient from '@/app/[lang]/projects/[id]/party/join/_components/JoinPageClient';

interface PageProps {
  params: { id: string };
}

export default async function JoinPage({ params }: PageProps) {
  const { id } = params;
  const [currentParty, currentUser, roles] = await Promise.all([getParty(id), getCurrentUser(), getRoles()]);

  return (
    <Container>
      <Typography> Header blabla </Typography>
      <JoinPageClient
        rolesInfo={roles}
        partyId={currentParty.id}
        projectId={currentParty.project.id}
      />
    </Container>
  );
}
