'use client';

import type { TButtonType, TOneStepData } from '@/types/propose-idea.types';
import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { Stage } from '@/app/[lang]/propose-idea/components/Stage/Stage';
import { StageSummary } from '@/app/[lang]/propose-idea/components/StageSummary/StageSummary';
import { Stepper } from '@/app/[lang]/propose-idea/components/Stepper/Stepper';
import { useTranslations } from 'next-intl';

const commonOutlinedStyle = {
  variant: 'outlined',
  color: 'success',
  sx: {
    margin: '4px',
  },
};

const commonContainedStyle = {
  variant: 'contained',
  color: 'success',
  sx: {
    margin: '4px',
  },
};

const buttonStyles: Record<string, any> = {
  Next: commonContainedStyle,
  Cancel: commonOutlinedStyle,
  Back: commonOutlinedStyle,
  CreateProject: commonContainedStyle,
  EditData: commonOutlinedStyle,
  Approve: commonContainedStyle,
};

export const Stages = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [userInputs, setUserInputs] = useState<{ [key: string]: any }>({});
  const t = useTranslations('translation');

  const stages: TOneStepData[] = t('proposePage.stages', { returnObjects: true });

  const getCurrentStageData = (): TOneStepData => stages[activeStep];

  const currentStageData: TOneStepData = getCurrentStageData();

  const handleCreateProject = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleEditData = () => {
    setActiveStep(0);
  };

  const handleNextClick = (): void => {
    if (activeStep < stages.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      console.log('Вы завершили все шаги!');
    }
  };

  const handleCancel = () => {
    setUserInputs({});
    setActiveStep(0);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleApproveData = () => {
    console.log('userInputs', userInputs);
  };

  const buttonActions: Record<string, () => void> = {
    Next: handleNextClick,
    Cancel: handleCancel,
    Back: handleBack,
    CreateProject: handleCreateProject,
    EditData: handleEditData,
    Approve: handleApproveData,
  };

  const handleInputChange = (stepKey: string, value: string) => {
    setUserInputs((prevInputs) => ({
      ...prevInputs,
      [stepKey]: value,
    }));
  };

  const renderButtons = (buttons: TButtonType[]): JSX.Element => (
    <Box
      sx={{
        display: 'flex',
        gap: '4',
        marginTop: '1rem',
        width: '100%',
      }}
    >
      {buttons.map((buttonObj) => {
        const [action, label] = Object.entries(buttonObj)[0];

        return (
          <Button
            key={action}
            {...buttonStyles[action]}
            onClick={buttonActions[action]}
            fullWidth
          >
            {label}
          </Button>
        );
      })}
    </Box>
  );

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          paddingBottom: '2rem',
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
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#333',
              marginBottom: '0rem',
              paddingLeft: '5rem',
            }}
          >
            {t('proposePage.title')}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 0,
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="h5"
              component="h2"
              sx={{
                fontSize: '12px',
                fontWeight: 700,
              }}
            >
              {currentStageData.label}
            </Typography>
          </Box>
          <Stepper
            activeStep={activeStep}
            steps={stages}
          />
        </Box>
      </Box>
      {activeStep === stages.length - 1 ? (
        <StageSummary
          stageData={currentStageData}
          userInputs={userInputs}
        >
          <Box
            sx={{
              paddingTop: 16,
              width: '500px',
            }}
          >
            <Box sx={{ width: '100%', marginBottom: '8px' }}>
              <Button
                {...buttonStyles.EditData}
                onClick={buttonActions.EditData}
                fullWidth
              >
                {currentStageData.buttons[0].EditData}
              </Button>
            </Box>
            <Box sx={{ width: '100%', display: 'flex', gap: '4px' }}>
              <Button
                {...buttonStyles.Cancel}
                onClick={buttonActions.Cancel}
                fullWidth
              >
                {currentStageData.buttons[1].Cancel}
              </Button>
              <Button
                {...buttonStyles.Approve}
                onClick={buttonActions.Approve}
                fullWidth
              >
                {currentStageData.buttons[2].Approve}
              </Button>
            </Box>
          </Box>
        </StageSummary>
      ) : (
        <Stage
          stageData={currentStageData}
          inputValue={userInputs[currentStageData.fieldName]}
          handleInputChange={(e) => handleInputChange(currentStageData.fieldName, e.target.value)}
          activeStep={activeStep}
        >
          {renderButtons(currentStageData.buttons)}
        </Stage>
      )}
    </>
  );
};
