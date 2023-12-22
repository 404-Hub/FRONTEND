import { Container } from '@mui/material';
import { Footer as AnyFooter } from '@/components/Footer';
import { useTranslation } from '@/app/i18n';
import { Navigation } from '@/components/layout/Navigation';
import { MainCover as AnyMainCover } from '../components/MainCover';

const Footer = AnyFooter as any;
const MainCover = AnyMainCover as any;

export default async function Page() {
  const { t } = await useTranslation('translation');
  console.log(t('h4'));
  return (
    <>
      <Navigation/>
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
        <MainCover />
      </Container>
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
        <Footer path="/"/>
      </Container>
    </>
  );
}
