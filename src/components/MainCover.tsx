'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';

export function MainCover(props: { translations: any }) {
  const { translations } = props;
  const router = useRouter();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          maxWidth: 500,
        }}
      >
        <Typography variant={'h4'}>{translations.title}</Typography>
        <Typography variant={'body1'}>{translations.description}</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant={'contained'}
            sx={{ flexGrow: 1 }}
            onClick={() => router.push('/categories')}
          >
            {translations.buttons.findProjectMain}
          </Button>
          <Button
            sx={{ flexGrow: 1 }}
            onClick={() => router.push('/projects/new')}
          >
            {translations.buttons.proposeIdeaMain}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
