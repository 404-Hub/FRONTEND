import React from 'react';
import { Box, Typography } from '@mui/material';
import type { TOneStepData } from '@/types/propose-idea.types';

interface StageProps {
  children: React.ReactNode;
  stageData: TOneStepData;
  userInputs: {
    [key: string]: string;
  };
}

export const StageSummary = ({ children, stageData, userInputs }: StageProps) => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        width: 500,
        position: 'relative',
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
      >
        {stageData.title}
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: 'bold' }}
      >
        {stageData.descriptionTitle}
      </Typography>
      <Typography variant="subtitle1">{userInputs.description}</Typography>
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: 'bold' }}
      >
        {stageData.additionalTitle}
      </Typography>
      <Typography variant="subtitle1">{userInputs.additional}</Typography>
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: 'bold' }}
      >
        {stageData.projectTitle}
      </Typography>
      <Typography variant="subtitle1">{userInputs.title}</Typography>
      <Typography
        variant="subtitle1"
        gutterBottom
      >
        {stageData.isCorrectTitle}
      </Typography>
      {children}
    </Box>
);
