'use client';

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import React, { useState } from 'react';

interface DialogCreatorProps {
  onConfirm: () => void;
}

export default function DialogCreator({ onConfirm }: DialogCreatorProps) {
  const [open, setOpen] = useState(false);

  const handleCloseRequest = () => {
    setOpen(true);
  };

  const handleConfirmClose = () => {
    onConfirm();
    setOpen(false);
  };

  const handleCancelClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{
          width: '264px',
          height: '48px',
          padding: '12px 16px',
          gap: '16px',
          borderRadius: '6px 0px 0px 0px',
          border: '1px solid #FDAC86',
          opacity: 1,
          background: '#fff',
          color: '#000',
          '&:hover': {
            background: '#fff',
          },
        }}
        onClick={handleCloseRequest}
      >
        Закрыть запрос
      </Button>
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
