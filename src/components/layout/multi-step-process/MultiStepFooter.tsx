import { Button, Grid } from '@mui/material';
import React from 'react';
import type { TButtonVariant, TExtendButtonProps, TStep } from '@/types/propose-idea.types';

interface TMultiStepFooter {
  activeStep: number;
  steps: TStep[];
  handleNext: () => void;
  handleBack: () => void;
}

const MultiStepFooter = ({ activeStep, steps, handleNext, handleBack }: TMultiStepFooter) => {
  const currentStep = steps[activeStep];
  let buttons: TExtendButtonProps[] = [];
  if (currentStep.buttons.customButtons) {
    buttons = currentStep.buttons.customButtons;
  } else {
    let backButtonLabel = '';
    let buttonBackVariant: TButtonVariant = 'contained';
    if (typeof currentStep.buttons.back === 'object') {
      backButtonLabel = currentStep.buttons.back.label;
      buttonBackVariant = currentStep.buttons.back.variant as TButtonVariant;
    } else {
      backButtonLabel = currentStep.buttons.back ?? 'Back';
      buttonBackVariant = 'outlined';
    }
    buttons.push({
      label: backButtonLabel,
      variant: buttonBackVariant,
      action: handleBack,
    });
    let nextButtonLabel = '';
    if (typeof currentStep.buttons.next === 'object') {
      nextButtonLabel = currentStep.buttons?.next?.label;
    } else {
      nextButtonLabel = currentStep.buttons.next ?? 'Next';
    }
    buttons.push({
      label: nextButtonLabel,
      variant: 'contained',
      action: handleNext,
    });
  }

  return (
    <Grid
      container
      justifyContent={'center'}
      sx={{
        marginTop: 'auto',
        paddingBottom: '20px',
      }}
    >
      <Grid
        item
        xs={12}
        md={8}
        gap={4}
        display={'flex'}
        justifyContent={'space-around'}
      >
        {buttons.map((button) => (
          <Button
            key={button.label}
            variant={button.variant ?? 'contained'}
            color={'success'}
            sx={{ padding: '12px 0' }}
            fullWidth
            onClick={() => (typeof button.action === 'function' ? button.action() : '')}
          >
            {button.label}
          </Button>
        ))}
      </Grid>
    </Grid>
  );
};

export default MultiStepFooter;
