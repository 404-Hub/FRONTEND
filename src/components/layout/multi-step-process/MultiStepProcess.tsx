import React from 'react';

import MultiStepHeader from '@/components/layout/multi-step-process/MultiStepHeader';
import MultiStepFooter from '@/components/layout/multi-step-process/MultiStepFooter';
import { Container } from '@mui/material';
import { TStep } from '@/types/propose-idea.types';

interface TMultiStepProcess {
  activeStep: number;
  steps: TStep[];
  title: string;
  handleBack: () => void;
  handleNext: () => void;
  children: React.ReactNode;
}

const MultiStepProcess = (props: TMultiStepProcess) => {
  const { title, activeStep, steps, handleBack, handleNext, children } = props;
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <MultiStepHeader
        steps={steps}
        activeStep={activeStep}
        title={title}
      />
      {children}
      <MultiStepFooter
        activeStep={activeStep}
        steps={steps}
        handleBack={handleBack}
        handleNext={handleNext}
      />
    </Container>
  );
};

export default MultiStepProcess;
