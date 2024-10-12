import { Input, Paper } from '@mui/material';
import Message from './Chat/Message';

export default function Chat() {
  return (
    <Paper
      sx={{ marginBottom: 4 }}
      elevation={8}
    >
      {/* Header */}
      <div>
        <div>Chat party</div>
        <div>Members online</div>
      </div>
      {/* Section */}
      <Message />
      {/* Footer */}
      <Input></Input>
    </Paper>
  );
}
