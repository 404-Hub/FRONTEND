// 'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useTranslations } from 'next-intl';

export function MainCover() {
  const t = useTranslations('home');
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        maxWidth: 500,
      }}
    >
      <Typography variant={'h4'}>{t('title')}</Typography>
      <Typography variant={'body1'}>{t('description')}</Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          variant={'contained'}
          sx={{ flexGrow: 1 }}
        >
          {t('buttonFindProjectMain')}
        </Button>
        <Button sx={{ flexGrow: 1 }}>{t('buttonProposeIdeaMain')}</Button>
      </Box>
    </Box>
  );
}
