'use client';

import RoleStep from '@/app/[lang]/party/new/_components/steps/RoleStep';
import { useState } from 'react';
import { TRole } from '@/types/entity';
import { useSearchParams } from 'next/navigation';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { joinParty } from '@/api/client/party';

type TJoinPageClientProps = {
  partyId: string;
  projectId: string;
  rolesInfo: TRole[];
};

const JoinPageClient = (props: TJoinPageClientProps) => {
  const { rolesInfo, partyId, projectId } = props;
  const searchParams = useSearchParams();
  const defaultRole = rolesInfo.find((item) => item.title === searchParams.get('role'));
  const [role, setRole] = useState(defaultRole?.id.toString() || '0');
  const [hours, setHours] = useState(0);
  const [description, setDescription] = useState('');

  const handleSendRequest = () => {
    const data = {
      party_id: partyId,
      role_id: role,
      info: description,
      time: hours,
    };

    joinParty(projectId, data).then(() => {
      alert('Заявка отправлена');
    });
  };

  return (
    <div>
      <RoleStep
        rolesInfo={rolesInfo}
        role={role}
        setRole={setRole}
        hours={hours}
        setHours={setHours}
        description={description}
        setDescription={setDescription}
      />
      <Box>
        <Button
          variant={'contained'}
          color={'success'}
          onClick={handleSendRequest}
        >
          Отправить заявку
        </Button>
      </Box>
    </div>
  );
};

export default JoinPageClient;
