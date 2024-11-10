'use client';

import {
  Box,
  Tabs,
  Tab,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import React, { useState } from 'react';
import ProjectKanban from '@/app/[lang]/projects/[id]/_components/Tabs/ProjectKanban';
import ProjectInfo from '@/app/[lang]/projects/[id]/_components/Tabs/ProjectInfo';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';
import { closeProject, updateProjectStatus } from '@/api/client/project';
import Soon from '@/components/base/Soon';
import ActionButtons from '@/app/[lang]/projects/[id]/_components/ActionButtons';

type TProjectTerminalProps = {
  project: any;
};

const ProjectTerminal = (props: TProjectTerminalProps) => {
  const router = useRouter();

  const [project, setProject] = useState(props.project ?? {});
  const [activeTab, setActiveTab] = useState(0);

  const handleCloseProject = async () => {
    const response = await closeProject(project.id);
    setProject(response.data);
  };

  const handleRestoreProject = async () => {
    const response = await updateProjectStatus(project.id, 'active');
    setProject(response.data);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box>
      <Box>
        <Grid
          container
          justifyContent="space-between"
          sx={{ padding: '2rem', backgroundColor: 'white', borderBottom: '1px solid #E0E0E0' }}
        >
          <Box
            display={'flex'}
            alignItems={'center'}
            gap={'1rem'}
          >
            <ArrowBackIcon
              onClick={() => router.back()}
              sx={{ ':hover': { cursor: 'pointer' } }}
            />
            <Typography variant="h4">
              {project.idea.title}({project.status})
            </Typography>
          </Box>
          <Box>
            <ActionButtons
              project={project}
              handleCloseProject={handleCloseProject}
              handleRestoreProject={handleRestoreProject}
            />
          </Box>
        </Grid>
      </Box>
      <Box sx={{ display: 'flex' }}>
        {/* Left Panel */}
        <Tabs
          value={activeTab}
          onChange={handleChange}
          orientation="vertical"
          sx={{ borderRight: 1, borderColor: 'divider', minWidth: 100 }}
        >
          <Tab label="Info" />
          <Tab label="Kanban" />
          <Tab label="Chat" />
        </Tabs>

        {/* Main Content */}
        <Box sx={{ flexGrow: 1, p: 3 }}>
          {activeTab === 1 && <ProjectKanban />}
          {activeTab === 0 && <ProjectInfo project={project} />}
          {activeTab === 2 && <Soon />}
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectTerminal;
