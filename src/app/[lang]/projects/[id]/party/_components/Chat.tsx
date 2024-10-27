import { Box, IconButton, Input, InputAdornment, Paper, TextField, Typography } from '@mui/material';
import { AccountCircle, AttachFile, Send } from '@mui/icons-material';
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
      sx={{ marginBottom: 4, padding: '1rem 1.5rem 1.5rem 1.5rem' }}
      elevation={8}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'space-between',
          paddingBottom: '1rem',
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{ fontSize: '1rem' }}
        >
          Чат пати
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ fontSize: '1rem' }}
        >
          3 онлайн
        </Typography>
      </Box>
      {/* Line */}
      <Box
        sx={{
          borderBottom: '1px solid #DFE3E8',
          width: 'calc(100% + 3rem)',
          marginLeft: '-1.5rem',
          marginRight: '-1.5rem',
          marginBottom: '1.5rem',
        }}
      />
      {/* Section */}
      <Box sx={{ marginBottom: '10rem' }}>
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
        label="write a message"
        sx={{
          width: '100%',
          borderColor: '#18A670', // Цвет границы при фокусе
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <AttachFile sx={{ fontSize: '1.5rem', rotate: '45deg' }} />
              </IconButton>
              <IconButton>
                <Send sx={{ fontSize: '1.5rem' }} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        variant="outlined"
      />
    </Paper>
  );
}
