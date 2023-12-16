import React from 'react';
import Container from '@mui/material/Container';
import { useTranslations } from 'next-intl';

function MyTasks() {
  const t = useTranslations('my-tasks');
  return (
    <Container
      component="main"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 1.5,
        padding: 0,
      }}
    >
      <h1>{t('title')}</h1>
    </Container>
  );
}

export default MyTasks;
