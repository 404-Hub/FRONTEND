'use client';

import { useState } from 'react';
import { Snackbar } from '@mui/material';
import { useRouter } from 'next/navigation';
import RoleStep from '@/app/[lang]/party/new/_components/steps/RoleStep';
import MembersStep from '@/app/[lang]/party/new/_components/steps/MembersStep';
import { storeParty } from '@/api/client/party';
import MultiStepProcess from '@/components/layout/multi-step-process/MultiStepProcess';
import FinalStep from '@/app/[lang]/party/new/_components/steps/FinalStep';
import { TStep } from '@/types/propose-idea.types';

const steps: TStep[] = [
  {
    label: '1',
    title: '',
    buttons: {
      back: { label: 'Cancel', variant: 'outlined' },
      next: 'Next',
    },
  },
  {
    label: '2',
    title: '',
    buttons: {
      back: { label: 'Back', variant: 'outlined' },
      next: 'Next',
    },
  },
  {
    label: '3',
    title: '',
    buttons: {
      back: { label: 'Back', variant: 'outlined' },
      next: 'Create Party',
    },
  },
];

type TRole = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

interface TNewPartyProps {
  ideaId: string;
  rolesInfo: TRole[];
}

const NewParty = (props: TNewPartyProps) => {
  const { ideaId, rolesInfo } = props;
  const [activeStep, setActiveStep] = useState(0);
  const [role, setRole] = useState('0');
  const [roles, setRoles] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [hours, setHours] = useState(0);
  const [requirements, setRequirements] = useState('');
  const [duration, setDuration] = useState('30');
  const [isCreated, setIsCreated] = useState(false);
  const router = useRouter();

  const handleNext = () => {
    if (steps.length === activeStep + 1) {
      const formData = {
        idea_id: ideaId,
        requirements,
        duration,
        creator_role: {
          role_id: role,
          time: hours,
          info: description,
        },
        party_members: roles.map((roleId) => ({
          role_id: roleId,
        })),
      };

      storeParty(formData).then((resp) => {
        if (resp.success) {
          setIsCreated(true);
          setRole('0');
          setRoles([]);
          setDescription('');
          setHours(0);
          setRequirements('');
          setDuration('30');
          setActiveStep(0);
        }
      });

      return;
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    if (activeStep === 0) {
      router.push(`/ideas/${ideaId}`);
      return;
    }
    setActiveStep(activeStep - 1);
  };

  return (
    <MultiStepProcess
      activeStep={activeStep}
      steps={steps}
      title={'New Party'}
      handleBack={handleBack}
      handleNext={handleNext}
    >
      {activeStep === 0 && (
        <RoleStep
          rolesInfo={rolesInfo}
          role={role}
          setRole={setRole}
          description={description}
          hours={hours}
          setDescription={setDescription}
          setHours={setHours}
        />
      )}
      {activeStep === 1 && (
        <MembersStep
          rolesInfo={rolesInfo}
          roles={roles}
          setRoles={setRoles}
          requirements={requirements}
          setRequirements={setRequirements}
        />
      )}
      {activeStep === 2 && (
        <FinalStep
          duration={duration}
          setDuration={setDuration}
        />
      )}
      <Snackbar
        open={isCreated}
        message="Party created"
        autoHideDuration={6000}
      />
    </MultiStepProcess>
  );
};

export default NewParty;
