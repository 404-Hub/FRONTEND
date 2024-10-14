import { Avatar, Box, Grid, Typography } from '@mui/material';

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
      <Grid
        container
        spacing={0}
      >
        <Grid
          item
          xs={2}
          sx={{ display: 'flex', paddingRight: 0 }} //! Не могу убрать отступ
        >
          {/* left (avatar)  */}
          <Avatar
            alt="Your avatar"
            src={message.user?.avatar}
            sx={{ width: 56, height: 56, padding: 0 }}
          />
        </Grid>
        {/** right name, description and etc */}
        <Grid
          item
          xs={10}
        >
          <Box
            sx={{
              backgroundColor: '#F4F6F8',
              padding: '0.5rem 0.5rem 0.5rem 1rem',
              borderRadius: '8px',
              marginBottom: '1.5rem',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
              <Typography
                variant="subtitle2"
                sx={{ fontSize: '1rem', marginRight: 1 }}
              >
                {message.user.name}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ fontSize: '0.9rem', color: '#647380' }}
              >
                {message.date}
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{ fontSize: '0.9rem' }}
            >
              {message.text}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
