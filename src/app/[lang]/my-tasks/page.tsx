import { useTranslations } from 'next-intl';
import { Container } from '@mui/material';

export default function Page() {
  const t = useTranslations('home');
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
    </>
  );
}
