'use client';

import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ReactNode } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import TelegramIcon from '@mui/icons-material/Telegram';
import GitIcon from '@/components/icons/GitIcon';
import LinkIcon from '@mui/icons-material/Link';
import { TContacts, TProfileInfo } from '@/types/profile';

type LeftAsideProps = {
  profile: TProfileInfo;
  contacts: TContacts[];
  isOwner: boolean;
  isLogged: boolean;
};

const LeftAside = (props: LeftAsideProps) => {
  const iconsMap: Record<string, ReactNode> = {
    location: <LocationOnIcon />,
    email: <MailOutlineIcon />,
    telegram: <TelegramIcon />,
    git: <GitIcon />,
    website: <LinkIcon />,
  };

  const projects: Record<string, string>[] = [
    { id: '1', name: 'Рисовалка для детей с AI (в процессе)', link: '/' },
    { id: '2', name: 'Бот для телеги', link: '/' },
    { id: '3', name: 'Веб Магазин', link: '/' },
  ];

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
          <Typography variant="body2">Доступен: {props.profile?.availability}</Typography>
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
      <Paper
        elevation={5}
        sx={{ marginTop: '1.5rem', padding: '1rem' }}
      >
        <Typography variant="h6">Участие в проектах</Typography>
        <Box>
          {projects.map((project) => (
            <Box
              key={project.id}
              display={'flex'}
              justifyContent={'space-between'}
            >
              <Typography variant="body2">{project.name}</Typography>
              <Link href={project.link}>
                <ArrowForwardIcon />
              </Link>
            </Box>
          ))}
        </Box>
        {!props.isOwner && (
          <Box sx={{ marginTop: '1rem', textAlign: 'center' }}>
            <Button
              variant={'contained'}
              color={'success'}
            >
              Предложить участие в проекте
            </Button>
          </Box>
        )}
      </Paper>
    </Grid>
  );
};

export default LeftAside;
