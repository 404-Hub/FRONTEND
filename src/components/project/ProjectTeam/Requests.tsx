import {
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Avatar,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { getPartyRequests } from '@/api/client/party';

type TRequestsProps = {
  projectId: string;
};
const Requests = (props: TRequestsProps) => {
  const { projectId } = props;

  const [open, setOpen] = React.useState(false);
  const [requests, setRequests] = React.useState([]);

  const handleCancelClose = () => {
    setOpen(false);
  };
  const handleConfirmClose = () => {
    setOpen(false);
  };

  const fetchRequests = (id: string) => {
    getPartyRequests(id).then((response) => {
      setRequests(response);
    });
  };

  useEffect(() => {
    if (open || requests.length === 0) {
      fetchRequests(projectId);
    }
  }, [projectId, open, requests.length]);

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
        variant={'text'}
      >
        Заявки
      </Button>
      <Dialog
        sx={{ '& .MuiDialog-paper': { width: '100%', maxWidth: { sm: 320, md: 800 } } }}
        open={open}
        onClose={handleCancelClose}
      >
        <DialogTitle>Заявки</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCancelClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          {requests.map((request: any) => (
            <Box
              key={request.id}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
                gap: '1rem',
              }}
            >
              <Box>
                <Avatar
                  alt="Remy Sharp"
                  src={request.user?.profile?.avatar}
                  sx={{ width: 56, height: 56, padding: 0 }}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ backgroundColor: '#F4F6F8', borderRadius: '8px', padding: '1rem' }}>
                  <Box
                    display={'flex'}
                    gap={'1rem'}
                    alignItems={'center'}
                  >
                    <Typography variant={'h5'}>{request.user?.name}</Typography>
                    <Typography variant={'subtitle2'}>{request.role}</Typography>
                  </Box>
                  <Box>
                    <Typography variant={'body2'}>{request.info}</Typography>
                  </Box>
                  <Box>
                    <Typography variant={'body2'}>{request.time}</Typography>
                  </Box>
                </Box>
              </Box>
              <Box>
                <Box display={'flex'}>
                  <Button>
                    <CloseIcon color={'error'} />
                  </Button>
                  <Button>
                    <CheckIcon color={'success'} />
                  </Button>
                </Box>
              </Box>
            </Box>
          ))}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Requests;
