import React from 'react';
import { Stepper as MUIStepper, Step, StepLabel } from '@mui/material';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { styled } from '@mui/material/styles';
import SvgIcon from '@mui/material/SvgIcon';
import LensIcon from '@mui/icons-material/Lens';
import type { TOneStepData } from '@/types/propose-idea.types';

interface ColorlibStepIconProps {
  active: boolean;
  completed: boolean;
}

interface TBoldCheckIcon {
  style?: React.CSSProperties;
}

function BoldCheckIcon(props: TBoldCheckIcon) {
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

export const Stepper = ({ activeStep, steps }: { activeStep: number; steps: TOneStepData[] }) => (
    <MUIStepper
      alternativeLabel
      activeStep={activeStep}
      connector={<ColorlibConnector />}
    >
      {steps.map((step) => (
        <Step
          key={step.label}
          sx={{ px: 6 }}
        >
          <StepLabel StepIconComponent={ColorlibStepIcon}></StepLabel>
        </Step>
      ))}
    </MUIStepper>
);
