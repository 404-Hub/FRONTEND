import { Button, Box, Typography } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';

type TPartyRequest = {
  id: string;
  party_id: string;
  role_id: string;
  role: string;
  info: string;
  time: number;
  status: number;
};

type TActionButtonsProps = {
  member: string | null;
  role: string;
  request: TPartyRequest | null;
  isCreator: boolean;
  isAlreadyMember: boolean;
  handleJoin: (role: string) => void;
  handleCancel: () => void;
  handleEditRequest: () => void;
  handleAcceptRequest: () => void;
  handleDeclineRequest: () => void;
};

const buttonStyle = {
  width: '3.3rem',
  height: '2.25rem',
  borderRadius: '0.375rem',
  padding: '0.375rem 0.75rem 0.375rem 0.75rem',
  marginRight: '1.5rem',
};

const ActionButtons = (props: TActionButtonsProps) => {
  const {
    member,
    role,
    request,
    isCreator,
    isAlreadyMember,
    handleJoin,
    handleCancel,
    handleEditRequest,
    handleAcceptRequest,
    handleDeclineRequest,
  } = props;

  if (request && request.role === role) {
    if (request.status === 3) {
      return (
        <>
          <Typography
            variant="body2"
            sx={{ color: '#647380' }}
          >
            Вас пригласили
          </Typography>
          <Box
            display={'flex'}
            flexDirection={'column'}
            sx={{ padding: '1rem' }}
          >
            <Button onClick={handleAcceptRequest}>
              <CheckIcon color={'success'} />
            </Button>
            <Button onClick={handleDeclineRequest}>
              <CloseIcon color={'error'} />
            </Button>
          </Box>
        </>
      );
    }

    if (request.status === 0) {
      return (
        <Box>
          <Button
            onClick={handleEditRequest}
            variant={'contained'}
            color={'warning'}
            sx={{ ...buttonStyle, marginRight: '0.5rem' }}
          >
            <EditIcon />
          </Button>
          <Button
            onClick={handleCancel}
            variant={'outlined'}
            color={'error'}
            sx={buttonStyle}
          >
            <DeleteOutlineOutlinedIcon />
          </Button>
        </Box>
      );
    }
  }

  return (
    <>
      {!member && !isCreator && !isAlreadyMember && (
        <Button
          onClick={() => {
            handleJoin(role);
          }}
          variant={'contained'}
          color={'success'}
          sx={buttonStyle}
        >
          Join
        </Button>
      )}
    </>
  );
};

export default ActionButtons;
