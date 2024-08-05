import React from 'react';
import Container from '@mui/material/Container';
import { useTranslations } from 'next-intl';
import { Stages } from './_components/Stages';

export default function Page() {
  const t = useTranslations('proposePage');
  return (
    <>
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
        <Stages title={t('title').toString()} />
      </Container>
    </>
  );
}
