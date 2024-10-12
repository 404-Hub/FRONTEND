import { Box } from '@mui/material';

type TMessageInfo = {
  id: string;
  date: string;
  text: string;
  user: {
    name: string;
    avatar: string;
  };
};

export default function Message({ message }: { message: TMessageInfo }) {
  return (
    <Box>
      <div>
        <div>
          {/* left (avatar)  */}
          <img
            src={message.user.avatar}
            alt="Your avatar"
          />
        </div>
        <div>
          {/** right name, description and etc */}
          <div>
            <div>{message.user.name}</div>
            <div>{message.date}</div>
          </div>
          <div>{message.text}</div>
        </div>
      </div>
    </Box>
  );
}
