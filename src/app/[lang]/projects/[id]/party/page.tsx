import { Description } from '@mui/icons-material';
import { Container, Grid } from '@mui/material';
import React from 'react';
import { getParty } from '@/api/server/party';
import ProjectDescription from './_components/ProjectDescription';
import ProjectCreator from './_components/ProjectCreator';
import ProjectTeam from './_components/ProjectTeam';
import Chat from './_components/Chat';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const currentParty = await getParty(id);
  console.log(currentParty);
  return (
    <Container
      maxWidth="lg"
      disableGutters
    >
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid
          item
          xs={6}
        >
          {/* Left side */}
          <ProjectDescription project={currentParty.project} />
          <ProjectCreator project={currentParty.project} />
          <ProjectTeam partyMembers={currentParty.partyMembers} />
        </Grid>
        <Grid
          item
          xs={6}
        >
          {/* Right side */}
          <Chat />
        </Grid>
      </Grid>
    </Container>
  );
}
