import { Container } from '@mui/material';
import { Footer as AnyFooter } from '@/components/Footer';
import { useTranslation } from '@/app/i18n';

const Footer = AnyFooter as any;

export default async function Page() {
  const { t } = await useTranslation('translation');
  console.log(t('h1'));
  return (
    <>
      <Container
        component="main"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 12,
          padding: 4,
        }}
      >
      </Container>
      <Footer path="/"/>
    </>
  );
}
