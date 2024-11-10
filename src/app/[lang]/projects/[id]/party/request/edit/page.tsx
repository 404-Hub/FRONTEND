import { Container, Typography } from '@mui/material';
import { getRoles } from '@/api/server/roles';
import { getPartyRequest } from '@/api/server/party';
import EditRequestClient from './_components/EditRequestClient';

interface PageProps {
  params: { id: string };
}

export default async function EditRequestPage({ params }: PageProps) {
  const { id } = params;

  const [roles, currentRequest] = await Promise.all([getRoles(), getPartyRequest(id)]);

  return (
    <Container>
      <Typography> Header blabla </Typography>
      <EditRequestClient
        rolesInfo={roles}
        request={currentRequest}
        projectId={id}
      />
    </Container>
  );
}
