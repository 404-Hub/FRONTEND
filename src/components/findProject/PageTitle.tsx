'use client';

import { ArrowBack } from '@mui/icons-material';
import { Box, Icon, Typography } from '@mui/material';
import Link from 'next/link';
import findPageStyles from '../../styles/findProjectStyles/pageStyles';

export default function PageTitle() {
  return (
    <Box sx={findPageStyles.container}>
      <Link href={{ pathname: '/' }} passHref style={findPageStyles.backlLink}>
        <Icon sx={findPageStyles.icon} aria-label="back">
          <ArrowBack sx={findPageStyles.arrowBack} />
        </Icon>
      </Link>
      <Typography variant={'h6'} sx={findPageStyles.title}>Поиск проекта</Typography>
    </Box>
  );
}
