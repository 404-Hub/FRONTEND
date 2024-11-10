import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react';

type TStartDialogProps = {
  openStartProject: boolean;
  setOpenStartProject: (value: boolean) => void;
  onClose: (value: boolean) => void;
};

const StartDialog = (props: TStartDialogProps) => {
  const { openStartProject, setOpenStartProject, onClose } = props;
  const handleCancelClose = () => {
    onClose(false);
    setOpenStartProject(false);
  };
  const handleConfirmClose = () => {
    onClose(true);
    setOpenStartProject(false);
  };

  return (
    <Dialog
      open={openStartProject}
      onClose={handleCancelClose}
    >
      <DialogTitle>Погнали?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          После того как вы начнете проект, группа станет скрытой. Скрытая группа не видна в общем списке групп и
          вступить в нее можно только по приглашению.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleCancelClose}
          color="primary"
        >
          Отмена!
        </Button>
        <Button
          onClick={handleConfirmClose}
          variant={'contained'}
          color="success"
        >
          Погнали!
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StartDialog;
