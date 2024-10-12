import { Box, Input, InputAdornment, Paper, TextField } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import Message from './Chat/Message';

type TMessageInfo = {
  id: string;
  date: string;
  text: string;
  user: {
    name: string;
    avatar: string;
  };
};

export default function Chat(props: { messages: TMessageInfo[] }) {
  return (
    <Paper
      sx={{ marginBottom: 4 }}
      elevation={8}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'space-between',
        }}
      >
        <div>Chat party</div>
        <div>Members online</div>
      </Box>
      {/* Section */}
      <Box>
        {props.messages.map((message) => (
          <Message
            key={message.id}
            message={message}
          />
        ))}
      </Box>
      {/* Footer */}
      <TextField
        id="input-with-icon-textfield"
        label="TextField"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
    </Paper>
  );
}
