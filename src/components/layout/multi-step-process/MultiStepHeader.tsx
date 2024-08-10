import { Grid, Typography } from '@mui/material';
import { Stepper } from '@/components/layout/Stepper';
import React from 'react';
import { TStep } from '@/types/propose-idea.types';

interface TMultiStepHeader {
  steps: TStep[];
  activeStep: number;
  title: string;
}

const MultiStepHeader = ({ steps, activeStep, title }: TMultiStepHeader) => (
  <Grid container>
    <Grid
      item
      xs={6}
      sx={{
        display: { xs: 'none', md: 'block' },
      }}
    >
      <Typography variant="h5">{title}</Typography>
    </Grid>
    <Grid
      item
      xs={12}
      md={6}
    >
      <Stepper
        activeStep={activeStep}
        steps={steps}
      />
    </Grid>
  </Grid>
);

export default MultiStepHeader;
