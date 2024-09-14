import type { TStep } from '@/types/propose-idea.types';
import React, { ChangeEvent } from 'react';
import { TextField, Box, Typography } from '@mui/material';
import { ShowExample } from './ShowExample';

interface StageProps {
  children: React.ReactNode;
  stageData: TStep;
  inputValue: string;
  // eslint-disable-next-line no-unused-vars
  handleInputChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  activeStep: number;
}

export const Stage = ({ children, stageData, inputValue, handleInputChange }: StageProps) => {
  const { title, labelTitle, isMultiline, showExample, exampleText } = stageData;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '3rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
          maxWidth: 500,
          width: '100%',
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          sx={{
            fontSize: '32px',
            marginBottom: '0rem',
          }}
        >
          {title}
        </Typography>
        <TextField
          multiline={isMultiline}
          fullWidth
          label={labelTitle}
          margin="normal"
          value={inputValue || ''}
          onChange={handleInputChange}
        />
        <ShowExample
          title={showExample ?? ''}
          content={exampleText ?? ''}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 20,
            width: '500px',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};
