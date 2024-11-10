'use client';

import { Typography, Box, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { TProject } from '@/types/findProjects';
import CancelDialog from '@/app/[lang]/projects/[id]/party/_components/Dialogs/CancelDialog';
import { useMemo, useState } from 'react';
import StartDialog from '@/app/[lang]/projects/[id]/party/_components/Dialogs/StartDialog';
import { useRouter } from 'next/navigation';
import { closeParty } from '@/api/client/party';
import { startProject } from '@/api/client/project';
import { useSession } from 'next-auth/react';

export default function ProjectHeader({
  project,
  isCreator,
  party,
}: {
  project: TProject;
  isCreator: boolean;
  party: any;
}) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const [openStartProject, setOpenStartProject] = useState(false);

  const isMember = useMemo(() => {
    if (party.partyMembers) {
      return party.partyMembers.some((member: any) => member.user.id === session?.user.id);
    }
    return false;
  }, [party, session]);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
      <Typography
        variant="h4"
        sx={{ fontSize: '2.125rem', paddingTop: '1.5rem', paddingBottom: '1.5rem', fontWeight: 600 }}
      >
        {project.idea.title}
      </Typography>

      {isCreator && (
        <Box sx={{ display: 'flex', gap: '1rem', marginLeft: 'auto' }}>
          {party.status !== 'hidden' && (
            <Button
              onClick={() => router.push(`/projects/${project.id}/party/edit`)}
              sx={{
                width: '44px',
                height: '44px',
                borderRadius: '8px',
                border: '1px solid #F4F6F8',
                background: '#FFFFFF',
                minWidth: 'auto',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <EditIcon sx={{ color: '#161C24' }} />
            </Button>
          )}

          <Button
            onClick={() => setOpen(true)}
            sx={{
              width: '44px',
              height: '44px',
              borderRadius: '8px',
              border: '1px solid #F4F6F8',
              background: '#FFFFFF',
              minWidth: 'auto',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CloseIcon sx={{ color: '#161C24' }} />
          </Button>
          <Button
            onClick={() => {
              if (party.status === 'hidden') {
                router.push(`/projects/${project.id}`);
              } else {
                setOpenStartProject(true);
              }
            }}
            sx={{
              width: '44px',
              height: '44px',
              borderRadius: '8px',
              border: '1px solid #F4F6F8',
              background: '#FFFFFF',
              minWidth: 'auto',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ArrowForwardIcon sx={{ color: '#161C24' }} />
          </Button>
          <CancelDialog
            open={open}
            setOpen={setOpen}
            onClose={(value) => {
              if (value) {
                closeParty(project.id).then(() => {
                  router.push(`/projects/${project.id}`);
                });
              }
            }}
          />
          <StartDialog
            openStartProject={openStartProject}
            setOpenStartProject={setOpenStartProject}
            onClose={(value) => {
              if (value) {
                startProject(project.id).then(() => {
                  router.push(`/projects/${project.id}`);
                });
              }
            }}
          />
        </Box>
      )}
      {isMember && !isCreator && (
        <Box sx={{ display: 'flex', gap: '1rem', marginLeft: 'auto' }}>
          <Button
            onClick={() => {
              router.push(`/projects/${project.id}`);
            }}
            variant={'outlined'}
          >
            В проект
          </Button>
        </Box>
      )}
    </Box>
  );
}
