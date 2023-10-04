'use client';

import { FC, useMemo, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TelegramIcon from '@mui/icons-material/Telegram';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Logo } from '@/components/Logo.tsx';
import { theme } from '@/providers/UiProvider.tsx';
import Link from 'next/link';

type HeaderTab = {
  label: string,
  value: string,
}

const HeaderTabs = () => {
  const [activePage, setActivePage] = useState('main');

  const tabs = useMemo<HeaderTab[]>(() => [
    {
      label: 'Главная',
      value: 'main',
    },
    {
      label: 'Мои задачи',
      value: 'myTasks',
    },
    {
      label: 'Найти проект',
      value: 'findProject',
    },
    {
      label: 'Предложить идею для проекта',
      value: 'proposeIdea',
    },
  ], []);

  return (
    <Tabs
      value={activePage}
      onChange={(_, newValue) => { setActivePage(newValue); }}
    >
      {tabs.map(({ label, value }) => (
        <Tab
          key={value}
          label={label}
          value={value}
          sx={{
            fontSize: theme.typography.pxToRem(12),
            padding: 1,
          }}
        />
      ))}
    </Tabs>
  );
};

export const Header: FC = () => (
    <Container maxWidth="lg">
      <AppBar
        position="sticky"
        color={'transparent'}
        sx={{
          boxShadow: 0,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexGrow: 1,
            maxWidth: '1440px',
          }}
        >
          <Logo />
          <HeaderTabs />
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Button color="inherit" sx={{ display: 'flex', gap: 1 }}>
              Telegram
              <TelegramIcon />
            </Button>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Link
                href={{ pathname: '/login' }}
              >
                <Button color="inherit" variant={'contained'}>
                  Войти
                </Button>
              </Link>
              <Button color="inherit" variant={'contained'}>
                Регистрация
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Container>
);
