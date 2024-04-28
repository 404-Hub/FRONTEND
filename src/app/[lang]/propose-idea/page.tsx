import React from 'react';
import Container from '@mui/material/Container';
import { Stages } from '@/app/[lang]/propose-idea/components/Stages/Stages';
import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations('translation');
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
        <Stages title={t('proposePage.title').toString()} />
      </Container>
    </>
  );
}
