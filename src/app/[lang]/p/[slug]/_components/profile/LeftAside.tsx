import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ReactNode } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import TelegramIcon from '@mui/icons-material/Telegram';
import GitIcon from '@/components/icons/GitIcon';
import LinkIcon from '@mui/icons-material/Link';
import { TContacts, TProfileInfo, TProfileProject } from '@/types/profile';
import Projects from '@/app/[lang]/p/[slug]/_components/profile/Projects';

type TLeftAsideProps = {
  profile: TProfileInfo;
  contacts: TContacts[];
  projects: TProfileProject[];
  isOwner: boolean;
  isLogged: boolean;
};

const LeftAside = (props: TLeftAsideProps) => {
  const iconsMap: Record<string, ReactNode> = {
    location: <LocationOnIcon />,
    email: <MailOutlineIcon />,
    telegram: <TelegramIcon />,
    git: <GitIcon />,
    website: <LinkIcon />,
  };

  return (
    <Grid
      item
      xs={12}
      md={4}
    >
      <Paper
        elevation={6}
        sx={{
          padding: '1rem',
        }}
      >
        <Typography variant="h6">Описание</Typography>
        <Box>
          <Typography variant="body2">{props.profile?.about}</Typography>
          {props.profile?.availability && (
            <Typography variant="body2">Доступен: {props.profile?.availability ?? 'None'}</Typography>
          )}
        </Box>
        <Box>
          {props.contacts.map((contact) => (
            <Box
              key={contact.icon}
              display={'flex'}
              gap={'1rem'}
              sx={{ marginTop: '1rem' }}
            >
              {iconsMap[contact.icon]}
              <Typography>{contact.text}</Typography>
            </Box>
          ))}
        </Box>
      </Paper>
      <Projects
        projects={props.projects}
        userId={props.profile.user_id}
        isOwner={props.isOwner}
        isLogged={props.isLogged}
      />
    </Grid>
  );
};

export default LeftAside;
