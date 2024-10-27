'use client';

import { Grid, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React, { useState } from 'react';

interface ButtonCreatorProps {
  currentUser: { id: string; name: string };
  currentParty: { project: { creator: { id: string } } };
}

export default function ButtonCreator({ currentUser, currentParty }: ButtonCreatorProps) {
  const [open, setOpen] = useState(false);

  const handleStartProject = () => {
    // Logic to start the project
  };

  const handleCloseRequest = () => {
    setOpen(true);
  };

  const handleConfirmClose = () => {
    // Logic to close the request
    setOpen(false);
  };

  const handleCancelClose = () => {
    setOpen(false);
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
            Закрыть запрос
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
            Начать проект
          </Button>
        </Grid>
      </Grid>
      <Dialog
        open={open}
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
    </>
  );
}
