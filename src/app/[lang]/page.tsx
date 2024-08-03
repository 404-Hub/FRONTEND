import { MainCover } from '@/components/MainCover';
import { Container } from '@mui/material';
import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations('home');
  const translations = {
    title: t('title'),
    description: t('description'),
    buttons: {
      findProjectMain: t('buttonFindProjectMain'),
      proposeIdeaMain: t('buttonProposeIdeaMain'),
    },
  };
  return (
        <Container sx={{
          marginTop: '12px',
          marginBottom: '120px',
        }}>
            <div>
                <MainCover translations={translations}/>
            </div>
        </Container>
  );
}
