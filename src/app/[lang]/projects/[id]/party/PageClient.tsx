'use client';

import { Description } from '@mui/icons-material';
import {
  Container,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React, { useState } from 'react';
import ProjectDescription from './_components/ProjectDescription';
import ProjectCreator from './_components/ProjectCreator';
import ProjectTeam from './_components/ProjectTeam';
import Chat from './_components/Chat';

export default function PageClient({ currentParty, currentUser }) {
  const [openConfirmation, setOpenConfirmation] = useState(false);

  console.log('currentUser:', currentUser);
  console.log('currentParty.project.creator.id:', currentParty.project.creator.id);
  console.log(
    'currentUser.id === currentParty.project.creator.id:',
    currentUser.id === currentParty.project.creator.id
  );

  const handleCloseRequest = () => {
    setOpenConfirmation(true);
  };

  const handleConfirmClose = () => {
    // Logic to close the request
    setOpenConfirmation(false);
  };

  const handleCancelClose = () => {
    setOpenConfirmation(false);
  };

  const handleStartProject = () => {
    // Logic to start the project
  };

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
          xs={12}
          md={6}
        >
          {/* Left side */}
          <ProjectDescription project={currentParty.project} />
          <ProjectCreator party={currentParty} />
          <ProjectTeam party={currentParty} />
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
        {currentUser && currentUser.id && currentUser.id === currentParty.project.creator.id && (
          <Grid
            item
            xs={12}
            md={6}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleCloseRequest}
            >
              Закрыть запрос
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleStartProject}
            >
              Начать проект
            </Button>
          </Grid>
        )}
      </Grid>
      <Dialog
        open={openConfirmation}
        onClose={handleCancelClose}
      >
        <DialogTitle>Подтверждение</DialogTitle>
        <DialogContent>
          <DialogContentText>Вы уверены, что хотите закрыть запрос?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCancelClose}
            color="primary"
          >
            Отмена
          </Button>
          <Button
            onClick={handleConfirmClose}
            color="primary"
            autoFocus
          >
            Подтвердить
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
