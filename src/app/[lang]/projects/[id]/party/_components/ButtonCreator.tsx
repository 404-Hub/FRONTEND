'use client';

import { Grid, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React, { useState } from 'react';
import CancelDialog from '@/app/[lang]/projects/[id]/party/_components/Dialogs/CancelDialog';
import StartDialog from '@/app/[lang]/projects/[id]/party/_components/Dialogs/StartDialog';
import { closeParty } from '@/api/client/party';
import { useRouter } from 'next/navigation';
import { startProject } from '@/api/client/project';

interface ButtonCreatorProps {
  currentUser: { id: string; name: string };
  currentParty: { status: string; project: { id: string; creator: { id: string } } };
}

export default function ButtonCreator({ currentUser, currentParty }: ButtonCreatorProps) {
  const [open, setOpen] = useState(false);
  const [openStartProject, setOpenStartProject] = useState(false);
  const router = useRouter();

  console.log('currentParty:', currentParty);

  const isHidden = currentParty.status === 'hidden';

  const handleStartProject = () => {
    if (isHidden) {
      router.push(`/projects/${currentParty.project.id}`);
    } else {
      setOpenStartProject(true);
    }
  };

  const handleCloseRequest = () => {
    setOpen(true);
  };

  return (
    <>
      <Grid
        container
        justifyContent="center"
        spacing={3}
      >
        <Grid item>
          <Button
            variant="outlined"
            color={'error'}
            sx={{
              width: '264px',
            }}
            onClick={handleCloseRequest}
          >
            {isHidden ? 'Распустить группу' : 'Закрыть запрос'}
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color={'success'}
            sx={{
              width: '264px',
              opacity: 1,
              background: '#18A670',
              color: '#fff',
              '&:hover': {
                background: '#18A670',
              },
            }}
            onClick={handleStartProject}
          >
            {isHidden ? 'В проект' : 'Начать проект'}
          </Button>
        </Grid>
      </Grid>
      <CancelDialog
        open={open}
        setOpen={setOpen}
        onClose={(value) => {
          if (value) {
            closeParty(currentParty.project.id).then(() => {
              router.push(`/projects/${currentParty.project.id}`);
            });
          }
        }}
      />
      <StartDialog
        openStartProject={openStartProject}
        setOpenStartProject={setOpenStartProject}
        onClose={(value) => {
          if (value) {
            startProject(currentParty.project.id).then(() => {
              router.push(`/projects/${currentParty.project.id}`);
            });
          }
        }}
      />
    </>
  );
}
