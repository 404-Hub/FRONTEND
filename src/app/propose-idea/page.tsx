'use client';

import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
  Stepper,
  Step,
  StepLabel, Paper,
} from '@mui/material';
import Container from '@mui/material/Container';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { styled, darken } from '@mui/material/styles';
import SvgIcon from '@mui/material/SvgIcon';
import AddIcon from '@mui/icons-material/Add';
import LensIcon from '@mui/icons-material/Lens';
import RemoveIcon from '@mui/icons-material/Remove';
import stepDataRu from './stepDataRu.json';
import stepDataEn from './stepDataEn.json';

interface OneStepData {
  label: string;
  header: string;
  title: string;
  fieldName: string;
  labelTitle: string;
  showExample: string;
  exampleText: string;
  descriptionTitle: string;
  additionalTitle: string;
  projectTitle: string;
  isCorrectTitle: string;
  buttons: object[];
}

function BoldCheckIcon(props) {
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

const buttonStyles = {
  Next: commonContainedStyle,
  Cancel: commonOutlinedStyle,
  Back: commonOutlinedStyle,
  CreateProject: commonContainedStyle,
  EditData: commonOutlinedStyle,
  Approve: commonContainedStyle,
};

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

function ColorlibStepIcon(props) {
  const { active, completed } = props;

  const iconStyle = {
    color: completed || active ? activeColor : inactiveColor,
    fontSize: '12px',
  };

  if (completed) {
    return (
      <div>
        {<BoldCheckIcon style={iconStyle}/>}
      </div>
    );
  }
  return (
    <div>
      {active ? <LensIcon style={iconStyle}/>
        : <LensIcon style={iconStyle}/>}
    </div>
  );
}

export default function Page() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [showExample, setShowExample] = useState<boolean>(false);
  const [userInputs, setUserInputs] = useState<{ [key: string]: any }>({});
  const [language, setLanguage] = useState('ru');
  const [stepData, setStepData] = useState(stepDataRu);
  const currentStep: OneStepData = stepData[activeStep];

  useEffect(() => {
    setStepData(language === 'ru' ? stepDataRu : stepDataEn);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'ru' ? 'en' : 'ru'));
  };

  const handleInputChange = (stepKey: string, value: string) => {
    setUserInputs((prevInputs) => ({
      ...prevInputs,
      [stepKey]: value,
    }));
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

  const handleCreateProject = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleEditData = () => {
    setActiveStep(0);
  };

  const handleApproveData = () => {
    console.log('userInputs', userInputs);
  };

  const toggleExample = (): void => {
    setShowExample(!showExample);
  };

  const buttonActions = {
    Next: handleNextClick,
    Cancel: handleCancel,
    Back: handleBack,
    CreateProject: handleCreateProject,
    EditData: handleEditData,
    Approve: handleApproveData,
  };

  const renderSummary = () => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        width: 500,
        position: 'relative',
      }}>
      <Typography variant="h5" gutterBottom>
        {currentStep.title}
      </Typography>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
        {currentStep.descriptionTitle}
      </Typography>
      <Typography variant="subtitle1">
        {userInputs.description}
      </Typography>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
        {currentStep.additionalTitle}
      </Typography>
      <Typography variant="subtitle1">
        {userInputs.additional}
      </Typography>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
        {currentStep.projectTitle}
      </Typography>
      <Typography variant="subtitle1">
        {userInputs.title}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {currentStep.isCorrectTitle}
      </Typography>
      <Box sx={{
        position: 'absolute',
        bottom: -227,
        width: '500px',
      }}>
        <Box sx={{ width: '100%', marginBottom: '8px' }}>
          <Button
            {...buttonStyles.EditData}
            onClick={buttonActions.EditData}
            fullWidth
          >
            {currentStep.buttons[0].EditData}
          </Button>
        </Box>
        <Box sx={{ width: '100%', display: 'flex', gap: '4px' }}>
          <Button
            {...buttonStyles.Cancel}
            onClick={buttonActions.Cancel}
            fullWidth
          >
            {currentStep.buttons[1].Cancel}
          </Button>
          <Button
            {...buttonStyles.Approve}
            onClick={buttonActions.Approve}
            fullWidth
          >
            {currentStep.buttons[2].Approve}
          </Button>
        </Box>
      </Box>
    </Box>
  );

  const renderButtons = (buttons) => (
    <Box sx={{
      display: 'flex', gap: '4', marginTop: '1rem', width: '100%',
    }}>
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
      <Container
        component="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 1.5,
          padding: 0,
        }}
      >
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
              {currentStep.header}
            </Typography>
          </Box>
          <Button onClick={toggleLanguage}>
            {language === 'ru' ? 'Switch to English' : 'Переключить на русский'}
          </Button>
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
              <Typography variant="h5" component="h2"
                          sx={{
                            fontSize: '12px',
                            fontWeight: 700,
                          }}>
                {stepData[activeStep].label}
              </Typography>
            </Box>
            <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector/>}>
              {stepData.map((step) => (
                <Step key={step.label} sx={{ px: 6 }}>
                  <StepLabel StepIconComponent={ColorlibStepIcon}></StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Box>
        {activeStep === 3 ? renderSummary()
          : <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 0,
              maxWidth: 500,
              width: '100%',
            }}
          >
            <Typography variant="h6" component="h2"
                        sx={{
                          fontSize: '32px',
                          marginBottom: '0rem',
                        }}
            >
              {currentStep.title}
            </Typography>
            {activeStep === 0 || activeStep === 1
              ? <TextField
                multiline
                fullWidth
                label={currentStep.labelTitle}
                margin="normal"
                value={userInputs[currentStep.fieldName] || ''}
                onChange={(e) => handleInputChange(currentStep.fieldName, e.target.value)}
              />
              : <TextField
                fullWidth
                label={currentStep.labelTitle}
                margin="normal"
                value={userInputs[currentStep.fieldName] || ''}
                onChange={(e) => handleInputChange(currentStep.fieldName, e.target.value)}
              />
            }
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Paper elevation={1} sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '8px',
              }}>
                <Typography variant="body1" sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
                  {currentStep.showExample}
                </Typography>
                <IconButton onClick={toggleExample} sx={{ color: 'action.active' }}>
                  {showExample ? <RemoveIcon/> : <AddIcon/>}
                </IconButton>
              </Paper>
            </Box>
            {showExample && (
              <Paper elevation={1} sx={{ marginTop: '0.1rem', padding: '8px' }}>
                <Typography variant="body1" sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
                  {currentStep.exampleText}
                </Typography>
              </Paper>
            )}
            <Box sx={{
              position: 'absolute',
              bottom: 20,
              width: '500px',
            }}>
              {renderButtons(currentStep.buttons)}
            </Box>
          </Box>
        }
      </Container>
    </>
  );
}
