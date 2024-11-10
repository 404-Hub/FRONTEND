import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react';

type TCancelDialogProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  onClose: (value: boolean) => void;
};
const CancelDialog = (props: TCancelDialogProps) => {
  const { open, setOpen, onClose } = props;
  const handleCancelClose = () => {
    onClose(false);
    setOpen(false);
  };
  const handleConfirmClose = () => {
    onClose(true);
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancelClose}
    >
      <DialogTitle>Подтверждение</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Вы уверены, что хотите закрыть запрос? Все активные заявки будут автоматически отклонены а текущие члены
          команды распущены
        </DialogContentText>
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
          variant={'contained'}
          color="error"
        >
          Закрыть запрос
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CancelDialog;
