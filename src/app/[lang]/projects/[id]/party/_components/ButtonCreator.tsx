'use client';

import { Grid, Button } from '@mui/material';
import React from 'react';
import DialogCreator from './DialogCreator';

interface ButtonCreatorProps {
  currentUser: { id: string; name: string };
  currentParty: { project: { creator: { id: string } } };
}

export default function ButtonCreator({ currentUser, currentParty }: ButtonCreatorProps) {
  const handleStartProject = () => {
    // Logic to start the project
  };

  const handleConfirmClose = () => {
    // Logic to close the request
  };

  return (
    <>
      {currentUser && currentUser.id && currentUser.id === currentParty.project.creator.id && (
        <Grid
          container
          justifyContent="center"
          spacing={3}
        >
          <Grid item>
            <DialogCreator onConfirm={handleConfirmClose} />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              sx={{
                width: '264px',
                height: '48px',
                padding: '12px 16px',
                gap: '16px',
                borderRadius: '6px 0px 0px 0px',
                opacity: 1,
                background: '#18A670',
                color: '#fff',
                '&:hover': {
                  background: '#18A670',
                },
              }}
              onClick={handleStartProject}
            >
              Начать проект
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
}
