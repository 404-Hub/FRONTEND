'use client';

import {
  Avatar,
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
import { acceptRequest, cancelRequest, rejectRequest } from '@/api/client/party';
import Requests from '@/components/project/ProjectTeam/Requests';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import FilledMember from '@/components/project/ProjectTeam/FilledMember';
import EmptyMember from '@/components/project/ProjectTeam/EmptyMember';

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

  const isAlreadyMember = filteredMembers.some((member: TProjectTeamMember) => member.user?.id === session?.user.id);

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

  const handleAcceptRequest = () => {
    acceptRequest(project.id, party.request.id).then((res) => {
      if (res.success) {
        router.push(`/projects/${project.id}`);
      }
    });
  };

  const handleDeclineRequest = () => {
    rejectRequest(project.id, party.request.id).then((res) => {
      if (res.success) {
        if (window) {
          window.location.reload();
        }
      }
    });
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
          <Box key={member.id}>
            {member.user.id ? (
              <FilledMember
                member={member}
                projectId={project.id}
              />
            ) : (
              <EmptyMember member={member}>
                <ActionButtons
                  member={member.user.id}
                  isAlreadyMember={isAlreadyMember}
                  role={member.role}
                  isCreator={isCreator}
                  request={party.request}
                  handleJoin={handleJoin}
                  handleCancel={handleCancel}
                  handleEditRequest={handleEditRequest}
                  handleAcceptRequest={handleAcceptRequest}
                  handleDeclineRequest={handleDeclineRequest}
                />
              </EmptyMember>
            )}
          </Box>
        ))}
      </div>
    </Paper>
  );
}
