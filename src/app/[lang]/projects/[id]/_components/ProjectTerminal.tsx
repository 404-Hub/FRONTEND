'use client';

import { Box, Tabs, Tab, Grid, Typography, Button, Card, CardContent, Chip, AvatarGroup, Avatar } from '@mui/material';
import React, { useState } from 'react';
import ProjectKanban from '@/app/[lang]/projects/[id]/_components/Tabs/ProjectKanban';
import ProjectInfo from '@/app/[lang]/projects/[id]/_components/Tabs/ProjectInfo';

type TProjectTerminalProps = {
  project: any;
};

const ProjectTerminal = (props: TProjectTerminalProps) => {
  const { project } = props;

  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Left Panel */}
      <Tabs
        value={activeTab}
        onChange={handleChange}
        orientation="vertical"
        sx={{ borderRight: 1, borderColor: 'divider', minWidth: 100 }}
      >
        <Tab label="Kanban" />
        <Tab label="Info" />
        <Tab label="Chat" />
      </Tabs>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Grid
          container
          justifyContent="space-between"
        >
          <Typography variant="h4">{project.idea.title}</Typography>
          <Box>
            <Button
              variant="contained"
              color="success"
            >
              Сдать проект
            </Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{ ml: 2 }}
            >
              Закрыть проект
            </Button>
          </Box>
        </Grid>
        {activeTab === 0 && <ProjectKanban />}
        {activeTab === 1 && <ProjectInfo project={project} />}
      </Box>
    </Box>
  );
};

export default ProjectTerminal;
