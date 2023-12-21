import Container from '@mui/material/Container';
import { MainCover } from '@/components/MainCover';
import { useTranslation } from '@/app/i18n';

export default async function Page(): Promise<any> {
  const { t } = await useTranslation();
  // console.log('Page t(\'h1\')=>', t('h1'));
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
        <MainCover/>
      </Container>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 1,
          padding: 4,
        }}>
        {t('h1')}
      </Container>
    </>
  );
}
