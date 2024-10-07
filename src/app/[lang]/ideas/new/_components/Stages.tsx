'use client';

import type { TStep } from '@/types/propose-idea.types';
import React, { useState } from 'react';
import { Snackbar } from '@mui/material';
import { getSession } from 'next-auth/react';
import { createIdea } from '@/api/client/idea';
import { useRouter } from 'next/navigation';
import MultiStepProcess from '@/components/layout/multi-step-process/MultiStepProcess';
import { Stage } from './Stage';
import { StageSummary } from './StageSummary';

export const Stages = (props: { title: string }) => {
  const { title } = props;
  const [activeStep, setActiveStep] = useState<number>(0);
  const [userInputs, setUserInputs] = useState<{ [key: string]: any }>({});
  const [isCreated, setIsCreated] = useState<boolean>(false);

  const router = useRouter();

  const handleEditData = () => {
    setActiveStep(0);
  };

  const handleCancel = () => {
    setUserInputs({});
    setActiveStep(0);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const resetState = () => {
    setUserInputs({});
    setActiveStep(0);
  };

  const handleApproveData = async () => {
    const session = await getSession();
    const accessToken = session?.accessToken;
    if (!accessToken) {
      console.error('No access token available. User must be logged in.');
      return;
    }

    const resp = await createIdea({
      category_id: 1,
      title: userInputs.title,
      description: userInputs.description,
      additional_info: userInputs.additional,
    });

    if (resp.success) {
      setIsCreated(true);
      resetState();
      router.push(`/ideas/${resp.id}`);
      console.log('Idea created successfully');
    }
  };

  const stages: TStep[] = [
    {
      label: 'STEP 1',
      title: 'What needs to be done?',
      fieldName: 'description',
      isMultiline: true,
      labelTitle: 'Describe what needs to be done',
      showExample: 'Show example',
      exampleText:
        'A service where I can send a link to a track from any streaming service. In response, a list of links to the same track on all possible streaming platforms, including YouTube, is generated.',
      buttons: { back: { label: 'Cancel', variant: 'outlined' }, next: 'Next' },
    },
    {
      label: 'STEP 2',
      title: 'Who is Your Client',
      fieldName: 'additional',
      isMultiline: true,
      labelTitle: 'Describe your clients',
      showExample: 'Show example',
      exampleText: 'Example text for STEP 2.',
      buttons: { back: 'Back', next: 'Next' },
    },
    {
      label: 'STEP 3',
      title: 'Specify the Idea Name',
      fieldName: 'title',
      isMultiline: false,
      labelTitle: 'Idea Name',
      showExample: 'Show example',
      exampleText: 'Example text for STEP 3.',
      buttons: { back: 'Back', next: 'Create Idea' },
    },
    {
      label: 'STEP 4',
      title: "Let's Summarize 😊",
      descriptionTitle: 'You want to receive:',
      additionalTitle: 'For whom:',
      projectTitle: 'Idea Name:',
      isCorrectTitle: 'Is everything correct?',
      buttons: {
        customButtons: [
          { label: 'Edit Data', variant: 'outlined', action: handleEditData },
          { label: 'Cancel', variant: 'outlined', action: handleCancel },
          { label: 'Yes, all correct', variant: 'contained', action: handleApproveData },
        ],
      },
      // buttons: [{ EditData: 'Edit Data' }, { Cancel: 'Cancel' }, { Approve: 'Yes, all correct' }],
    },
  ];

  const getCurrentStageData = (): TStep => stages[activeStep];

  const currentStageData: TStep = getCurrentStageData();

  const handleNextClick = (): void => {
    if (activeStep < stages.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      console.log('Вы завершили все шаги!');
    }
  };

  const handleInputChange = (stepKey: string, value: string) => {
    setUserInputs((prevInputs) => ({
      ...prevInputs,
      [stepKey]: value,
    }));
  };

  return (
    <>
      <MultiStepProcess
        activeStep={activeStep}
        steps={stages}
        title={title}
        handleBack={handleBack}
        handleNext={handleNextClick}
      >
        {activeStep === stages.length - 1 ? (
          <StageSummary
            stageData={currentStageData}
            userInputs={userInputs}
          />
        ) : (
          <Stage
            stageData={currentStageData}
            inputValue={userInputs[currentStageData.fieldName ?? '']}
            handleInputChange={(e) => handleInputChange(currentStageData.fieldName ?? '', e.target.value)}
            activeStep={activeStep}
          >
            {/* {renderButtons(currentStageData.buttons)} */}
          </Stage>
        )}
      </MultiStepProcess>
      <Snackbar
        open={isCreated}
        color={'success'}
        message={'Idea Created'}
        autoHideDuration={3000}
      />
    </>
  );
};
