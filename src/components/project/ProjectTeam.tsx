'use client';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import ActionButtons from '@/components/project/ProjectTeam/ActionButtons';
import { cancelRequest } from '@/api/client/party';
import Requests from '@/components/project/ProjectTeam/Requests';
import React from 'react';

type TProjectTeamMember = {
  id: number;
  user: any;
  role: string;
};

export default function ProjectTeam({ party, project }: any) {
  const { partyMembers } = party;
  const { creator } = project;

  const { data: session, status } = useSession();

  const router = useRouter();

  const filteredMembers = partyMembers.filter((member: TProjectTeamMember) => member.user?.id !== creator.id);

  const userHasRequest = party.request !== null;

  const isCreator = creator.id === session?.user.id;

  const handleJoin = (role: string) => {
    if (!session) {
      router.push('/login');
    }
    router.push(`/projects/${project.id}/party/join?role=${role}`);
  };

  const handleEditRequest = () => {
    router.push(`/projects/${project.id}/party/request/edit`);
  };

  const handleCancel = () => {
    cancelRequest(project.id).then(() => {
      alert('Request canceled');
    });
  };

  return (
    <Paper
      sx={{ marginBottom: 4, padding: '1.5rem' }}
      elevation={8}
    >
      <div>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
        >
          <Typography
            variant="h6"
            sx={{ paddingBottom: '1.5rem' }}
          >
            Команда
          </Typography>
          <Box>
            {isCreator && (
              <>
                <Requests projectId={project.id} />
              </>
            )}
          </Box>
        </Box>

        {filteredMembers.map((member: TProjectTeamMember) => (
          <Box
            key={member.id}
            sx={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#F4F6F8',
              marginBottom: '1rem',
              borderRadius: '8px',
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontSize: '1rem', paddingLeft: '1.5rem', padding: '1rem' }}
            >
              {member.role} {member.user?.id}
            </Typography>
            <Box sx={{ flex: 1, padding: '1rem' }}>
              <Link href="#">
                <Typography
                  component="span"
                  sx={{
                    color: 'blue',
                    '&:hover': {
                      cursor: 'pointer',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Who is that?
                </Typography>
              </Link>
            </Box>
            <ActionButtons
              member={member.user.id}
              role={member.role}
              request={party.request}
              handleJoin={handleJoin}
              handleCancel={handleCancel}
              handleEditRequest={handleEditRequest}
            />
          </Box>
        ))}
      </div>
    </Paper>
  );
}
