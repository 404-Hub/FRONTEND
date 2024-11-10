import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSession } from 'next-auth/react';
import { leaveParty } from '@/api/client/party';

type TFilledMemberProps = {
  member: any;
  projectId: string;
};
const FilledMember = (props: TFilledMemberProps) => {
  const { member, projectId } = props;

  const { data: session, status } = useSession();

  const [open, setOpen] = React.useState(false);

  const handleCancelClose = () => {
    setOpen(false);
  };

  const handleConfirmClose = () => {
    leaveParty(projectId).then((res) => {
      if (res.success) {
        setOpen(false);
        if (window) {
          window.location.reload();
        }
      }
    });
  };
  const handleLeave = () => {
    setOpen(true);
  };
  return (
    <Box
      key={member.id}
      sx={{
        marginBottom: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        gap: '1rem',
      }}
    >
      <Box>
        <Avatar
          alt="Remy Sharp"
          src={member.user?.profile?.avatar}
          sx={{ width: 56, height: 56, padding: 0 }}
        />
      </Box>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: '#F4F6F8',
          borderRadius: '8px',
          padding: '1rem',
        }}
      >
        <Box>
          <Box
            display={'flex'}
            gap={'1rem'}
            alignItems={'center'}
          >
            <Typography variant={'h5'}>{member.user?.name}</Typography>
            <Typography variant={'subtitle2'}>{member.role}</Typography>
          </Box>
        </Box>
        {member.user.id === session?.user.id && (
          <Box>
            <Button onClick={handleLeave}>
              <LogoutIcon color={'info'} />
            </Button>
            <Dialog
              open={open}
              onClose={handleCancelClose}
            >
              <DialogTitle>Подтверждение</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Вы уверены, что хотите выйти из группы? Вы так же потеряете доступ к проекту.
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
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default FilledMember;
