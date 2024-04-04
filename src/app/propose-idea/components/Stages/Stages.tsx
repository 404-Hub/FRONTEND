'use client';

import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useTranslation } from '@/app/i18n/client';
import { LangSwitcher } from '@/app/propose-idea/components/LangSwitcher/LangSwitcher';
import { Stage } from '@/app/propose-idea/components/Stage/Stage';
import { StageSummary } from '@/app/propose-idea/components/StageSummary/StageSummary';
import { Stepper } from '@/app/propose-idea/components/Stepper/Stepper';
import { getSession, signOut } from 'next-auth/react';

interface ButtonType {
  [key: string]: string | undefined;
}

export interface OneStepData {
  label: string;
  header: string;
  title: string;
  fieldName: string;
  labelTitle: string;
  isMultiline?: boolean;
  showExample: string;
  exampleText: string;
  descriptionTitle?: string;
  additionalTitle?: string;
  projectTitle?: string;
  isCorrectTitle?: string;
  buttons: ButtonType[];
}

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
  const { t } = useTranslation('translation');

  const stages: OneStepData[] = t('proposePage.stages', { returnObjects: true });

  const getCurrentStageData = (): OneStepData => {
    return stages[activeStep];
  };

  const currentStageData: OneStepData = getCurrentStageData();

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

  const handleApproveData = async () => {
    const session = await getSession();
    const accessToken = session?.accessToken;
    if (!accessToken) {
      console.error('No access token available. User must be logged in.');
      return;
    }

    const formData = new FormData();
    formData.append('category_id', '1');
    formData.append('title', userInputs.title);
    formData.append('description', userInputs.description);
    formData.append('additional', userInputs.additional);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/apps/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Success:', data);
      } else {
        const errorData = await response.json();
        console.error('Server Error:', errorData);
      }
    } catch (error) {
      if (error instanceof Response) {
        const errorData = await error.json();
        console.error('Server responded with status:', error.status, 'and message:', errorData);
        if (error.status === 401) {
          signOut();
        }

        if (error.status === 409) {
          window.location.href = '/verify-email';
        }

        throw error;
      }

      throw new Error('Failed to fetch data', { cause: error });
    }
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

  const renderButtons = (buttons: ButtonType[]): JSX.Element => (
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
        <LangSwitcher />
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
