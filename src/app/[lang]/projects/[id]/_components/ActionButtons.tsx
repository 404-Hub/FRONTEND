import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { useRouter } from 'next/navigation';
import { TProject } from '@/types/findProjects';
import { useState } from 'react';

type TActionButtonsProps = {
  project: TProject;
  handleCloseProject: () => Promise<void>;
  handleRestoreProject: () => Promise<void>;
};

const ActionButtons = (props: TActionButtonsProps) => {
  const { project, handleCloseProject, handleRestoreProject } = props;
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {project.status === 'archived' && (
        <Button
          variant="contained"
          color="success"
          onClick={handleRestoreProject}
        >
          Восстановить проект
        </Button>
      )}
      {project.status === 'active' && (
        <Button
          variant="contained"
          color="success"
          onClick={() => router.push(`/projects/${project.id}/submit`)}
        >
          Сдать проект
        </Button>
      )}

      {project.status !== 'archived' && (
        <Button
          onClick={handleClickOpen}
          variant="outlined"
          color="info"
          sx={{ ml: 2 }}
        >
          Закрыть проект
        </Button>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Вы точно хотите закрыть проект?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Если у проекта есть незавершенные задачи, они будут автоматически завершены. Так же будет закрыта группа
            проекта.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color={'success'}
            onClick={handleClose}
          >
            Не закрывать
          </Button>
          <Button
            variant="outlined"
            color={'error'}
            onClick={() => handleCloseProject().then(() => handleClose())}
          >
            Закрыть проект
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ActionButtons;
