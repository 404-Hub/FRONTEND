import { getParty } from '@/api/server/party';
import { getCurrentUser } from '@/lib/session';
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from '@mui/material';
import React from 'react';
import ProjectDescription from '@/components/project/ProjectDescription';
import ProjectCreator from '@/components/project/ProjectCreator';
import ProjectTeam from '@/components/project/ProjectTeam';
import Chat from './_components/Chat';
import ButtonCreator from './_components/ButtonCreator';
import ProjectHeader from './_components/ProjectHeader';

// Define the types for currentParty and currentUser
interface User {
  id: string;
  name: string;
  // Add other properties as needed
}

interface Project {
  creator: User;
  // Add other properties as needed
}

interface Party {
  project: Project;
  // Add other properties as needed
}

interface PageProps {
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
  const { id } = params;
  const [currentParty, currentUser] = await Promise.all([getParty(id), getCurrentUser()]);

  const isCreator = Boolean(currentUser && currentUser.id && currentUser.id === currentParty.project.creator.id);

  return (
    <Container
      maxWidth="lg"
      disableGutters
      sx={{
        paddingBottom: 4,
      }}
    >
      <ProjectHeader
        project={currentParty.project}
        isCreator={isCreator ?? false}
      />
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid
          item
          xs={12}
          md={6}
        >
          {/* Left side */}
          <ProjectDescription project={currentParty.project} />
          <ProjectCreator
            project={currentParty.project}
            party={currentParty}
          />
          <ProjectTeam
            project={currentParty.project}
            party={currentParty}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
        >
          {/* Right side */}
          <Chat
            messages={[
              {
                id: 'ghagsd-jhdfuhw-khkwef',
                date: '12 Jan 2023',
                text: 'расскажем, как найти мотивацию и ресурсы для саморазвития. Поднимайте свой уровень знаний и умений вместе с нами!',
                user: {
                  name: 'Jenny Wilson',
                  avatar: 'http://link.com',
                },
              },
              {
                id: 'jgsdfygw-khdfw',
                date: '12 Jan 2023',
                text: 'ты находишься, всегда есть что учить, и мир полон удивительных знаний. В нашем новом посте мы поделимся с вами несколькими',
                user: {
                  name: 'Darlene Robertson',
                  avatar: 'http://link2.com',
                },
              },
            ]}
          />
        </Grid>
        {isCreator && (
          <>
            <ButtonCreator
              currentUser={currentUser ?? { id: '', name: '' }}
              currentParty={currentParty}
            />
          </>
        )}
      </Grid>
    </Container>
  );
}
