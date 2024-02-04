'use client';

import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, Stepper, Step, StepLabel } from '@mui/material';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { styled, darken } from '@mui/material/styles';
import SvgIcon from '@mui/material/SvgIcon';
import LensIcon from '@mui/icons-material/Lens';
import { useTranslation } from '@/app/i18n/client';
import { LangSwitcher } from '@/app/propose-idea/components/LangSwitcher/LangSwitcher';
import { Stage } from '@/app/propose-idea/components/Stage/Stage';
import { StageSummary } from '@/app/propose-idea/components/StageSummary/StageSummary';
import stepDataRu from '@/app/propose-idea/stepDataRu.json';
import stepDataEn from '@/app/propose-idea/stepDataEn.json';

interface ButtonType {
  [key: string]: string;
}

interface OneStepData {
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

interface ColorlibStepIconProps {
  active: boolean;
  completed: boolean;
}

interface BoldCheckIcon {
  style?: React.CSSProperties;
}

function BoldCheckIcon(props: BoldCheckIcon) {
  return (
    <SvgIcon {...props}>
      <path
        d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />
    </SvgIcon>
  );
}

const activeColor = '#2FC362';
const inactiveColor = '#DFE3E8';

const ColorlibConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: activeColor,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: activeColor,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 1,
    border: 0,
    backgroundColor: inactiveColor,
    borderRadius: 1,
  },
}));

function ColorlibStepIcon(props: ColorlibStepIconProps) {
  const { active, completed } = props;

  const iconStyle = {
    color: completed || active ? activeColor : inactiveColor,
    fontSize: '12px',
  };

  if (completed) {
    return <div>{<BoldCheckIcon style={iconStyle} />}</div>;
  }
  return <div>{active ? <LensIcon style={iconStyle} /> : <LensIcon style={iconStyle} />}</div>;
}

const commonOutlinedStyle = {
  variant: 'outlined',
  sx: {
    borderColor: '#18A670',
    color: '#18A670',
    margin: '4px',
  },
};

const commonContainedStyle = {
  variant: 'contained',
  sx: {
    backgroundColor: '#18A670',
    '&:hover': { backgroundColor: darken('#18A670', 0.2) },
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
  const {
    t,
    i18n: { language },
  } = useTranslation('translation');
  const [stepData, setStepData] = useState(stepDataRu);
  const currentStageData: OneStepData = stepData[activeStep];

  useEffect(() => {
    setStepData(language === 'ru' ? stepDataRu : stepDataEn);
  }, [language]);

  const handleCreateProject = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleEditData = () => {
    setActiveStep(0);
  };

  const handleNextClick = (): void => {
    if (activeStep < stepData.length - 1) {
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

  const renderButtons = (buttons: ButtonType[]) => (
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
            {currentStageData.header}
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
              {stepData[activeStep].label}
            </Typography>
          </Box>
          <Stepper
            alternativeLabel
            activeStep={activeStep}
            connector={<ColorlibConnector />}
          >
            {stepData.map((step) => (
              <Step
                key={step.label}
                sx={{ px: 6 }}
              >
                <StepLabel StepIconComponent={ColorlibStepIcon}></StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </Box>
      {activeStep === stepData.length - 1 ? (
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
