'use client';

import { Container } from '@mui/material';
import { useTranslation } from '@/app/i18n/client';
import { Footer } from '@/components/Footer/client';

export default function Page() {
  const { t } = useTranslation('translation');
  return (
    <>
      <Container
        component="main"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20.8,
          padding: 4,
        }}
      >
        <h4>{t('h4MyTasks')}</h4>
      </Container>
      <Container
        component="footer"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 12,
          padding: 4,
        }}
      >
        <Footer path="/my-tasks"/>
      </Container>
    </>
  );
}
