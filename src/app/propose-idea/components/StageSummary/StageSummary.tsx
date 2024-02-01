import React from 'react';
import { Box, Typography } from '@mui/material';

interface StageProps {
  children: React.ReactNode;
  stageData: OneStepData;
  userInputs: {
    [key: string]: string;
  };
}

interface OneStepData {
  label: string;
  header: string;
  title: string;
  fieldName: string;
  labelTitle: string;
  showExample: string;
  exampleText: string;
  descriptionTitle?: string;
  additionalTitle?: string;
  projectTitle?: string;
  isCorrectTitle?: string;
}

export const StageSummary = ({ children, stageData, userInputs }: StageProps) => {
  return (
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
};
