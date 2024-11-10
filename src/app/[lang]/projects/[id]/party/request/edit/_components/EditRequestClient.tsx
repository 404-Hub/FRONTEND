'use client';

import RoleStep from '@/app/[lang]/party/new/_components/steps/RoleStep';
import { TRole } from '@/types/entity';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { joinParty } from '@/api/client/party';

type TEditRequestClientProps = {
  rolesInfo: TRole[];
  request: any;
  projectId: string;
};
const EditRequestClient = (props: TEditRequestClientProps) => {
  const { rolesInfo, projectId } = props;
  const [role, setRole] = useState(props.request.role_id.toString());
  const [hours, setHours] = useState(props.request.time);
  const [description, setDescription] = useState(props.request.info);
  const handleUpdateRequest = () => {
    const data = {
      id: props.request.id,
      party_id: props.request.party_id,
      role_id: role,
      info: description,
      time: hours,
    };

    joinParty(projectId, data).then(() => {
      alert('Заявка обновлена');
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
          onClick={handleUpdateRequest}
        >
          Обновить заявку
        </Button>
      </Box>
    </div>
  );
};

export default EditRequestClient;
