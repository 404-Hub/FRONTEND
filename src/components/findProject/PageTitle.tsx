'use client';

import { ArrowBack } from '@mui/icons-material';
import { Box, Icon, Typography } from '@mui/material';
import Link from 'next/link';
import findPageStyles from '@/styles/findProjectStyles/pageStyles';

export default function PageTitle() {
  return (
        <Box sx={{ marginTop: '32px' }}>
            <Box sx={findPageStyles.backlLink}>
                <Link href={{ pathname: '/' }} passHref>
                    <Icon sx={findPageStyles.icon} aria-label="back">
                        <ArrowBack sx={findPageStyles.arrowBack}/>
                    </Icon>
                </Link>
            </Box>
            <Typography variant={'h6'} sx={findPageStyles.title}>Поиск проекта</Typography>
        </Box>
  );
}
