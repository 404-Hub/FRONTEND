'use client';

import FoundApp from '@/app/[lang]/find-project/_components/FoundProject';
import findPageStyles from '@/styles/findProjectStyles/pageStyles';
import { Box } from '@mui/material';

function FoundProjectPage() {
  return (
    <Box sx={findPageStyles.mainContainer}>
      <FoundApp />
    </Box>
  );
}

export default FoundProjectPage;
