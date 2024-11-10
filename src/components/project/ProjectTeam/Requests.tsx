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
import React, { useEffect, useMemo } from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { acceptRequest, getPartyRequests, rejectRequest } from '@/api/client/party';

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

  const fetchRequests = (id: string) => {
    getPartyRequests(id).then((response) => {
      setRequests(response);
    });
  };

  const handleRejectRequest = (id: string) => () => {
    rejectRequest(projectId, id).then((req) => {
      setRequests(req.data);
    });
  };

  const handleAcceptRequest = (id: string) => () => {
    acceptRequest(projectId, id).then((req) => {
      setRequests(req.data);
    });
  };

  const newRequests = useMemo(() => requests.filter((request: any) => request.status === 0), [requests]);

  const requestsHistory = useMemo(() => requests.filter((request: any) => request.status !== 0), [requests]);

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
        Заявки {newRequests.length > 0 && `(${newRequests.length})`}
      </Button>
      <Dialog
        sx={{ '& .MuiDialog-paper': { width: '100%', maxWidth: { sm: 320, md: 800 } } }}
        open={open}
        onClose={handleCancelClose}
      >
        <DialogTitle>Заявки {newRequests.length > 0 && `(${newRequests.length})`}</DialogTitle>
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
          {newRequests.map((request: any) => (
            <Box
              key={request.id}
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
                  src={request.user?.profile?.avatar}
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
                    <Typography variant={'h5'}>{request.user?.name}</Typography>
                    <Typography variant={'subtitle2'}>{request.role}</Typography>
                  </Box>
                  <Box sx={{ marginY: '12px' }}>
                    <Typography variant={'body2'}>{request.info}</Typography>
                  </Box>
                  <Box>
                    <Typography variant={'body2'}>
                      <strong>Готов уделять: </strong>
                      {request.time} часов в неделю
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Box display={'flex'}>
                    <Button onClick={handleRejectRequest(request.id)}>
                      <CloseIcon color={'error'} />
                    </Button>
                    <Button onClick={handleAcceptRequest(request.id)}>
                      <CheckIcon color={'success'} />
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
          <Box sx={{ borderBottom: '1px solid #DFE3E8', marginBottom: '1rem' }}>
            <Typography variant={'h6'}>История заявок</Typography>
          </Box>
          {requestsHistory.map((request: any) => (
            <Box
              key={request.id}
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
                  src={request.user?.profile?.avatar}
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
                    <Typography variant={'h5'}>{request.user?.name}</Typography>
                    <Typography variant={'subtitle2'}>{request.role}</Typography>
                  </Box>
                  <Box sx={{ marginY: '12px' }}>
                    <Typography variant={'body2'}>{request.info}</Typography>
                  </Box>
                  <Box>
                    <Typography variant={'body2'}>
                      <strong>Готов уделять: </strong>
                      {request.time} часов в неделю
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography variant={'body2'}>{request.status === 1 ? 'Принято' : 'Отклонено'}</Typography>
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
