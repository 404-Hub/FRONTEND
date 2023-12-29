import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useTranslation } from '@/app/i18n';

export async function MainCover(): Promise<any> {
  const { t } = await useTranslation('translation');
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        maxWidth: 500,
      }}
    >
      <Typography variant={'h4'}>{t('h4Main')}</Typography>
      <Typography variant={'body1'}>{t('descriptionMain')}
      </Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          variant={'contained'}
          sx={{ flexGrow: 1 }}
        >
          {t('buttonFindProjectMain')}
        </Button>
        <Button sx={{ flexGrow: 1 }}>{t('buttonProposeIdeaMain')}</Button>
      </Box>
    </Box>);
}
