import { Button, Box } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditIcon from '@mui/icons-material/Edit';

type TPartyRequest = {
  id: string;
  party_id: string;
  role_id: string;
  role: string;
  info: string;
  time: number;
  status: string;
};

type TActionButtonsProps = {
  member: string | null;
  role: string;
  request: TPartyRequest | null;
  handleJoin: (role: string) => void;
  handleCancel: () => void;
  handleEditRequest: () => void;
};

const buttonStyle = {
  width: '3.3rem',
  height: '2.25rem',
  borderRadius: '0.375rem',
  padding: '0.375rem 0.75rem 0.375rem 0.75rem',
  marginRight: '1.5rem',
};

const ActionButtons = (props: TActionButtonsProps) => {
  const { member, role, request, handleJoin, handleCancel, handleEditRequest } = props;

  if (request && request.role === role) {
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

  return (
    <>
      {!member && (
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
