'use client';

import { Tab, Tabs, Box } from '@mui/material';
import ProjectsList from '@/app/[lang]/projects/_components/ProjectsList';
import React, { useEffect, useState } from 'react';
import { TProject } from '@/types/findProjects';
import { getProjects } from '@/api/client/project';

type TProjectsClientProps = {
  projects: TProject[];
};
const ProjectsClient = (props: TProjectsClientProps) => {
  const [projects, setProjects] = useState(props.projects ?? []);
  const [activeTab, setActiveTab] = useState('active');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };
  const fetchProjects = async (query: string) => {
    const response = await getProjects(query);
    setProjects(response);
  };

  useEffect(() => {
    fetchProjects(activeTab);
  }, [props.projects, activeTab]);

  return (
    <Box>
      <Box>
        <Tabs
          value={activeTab}
          onChange={handleChange}
        >
          <Tab
            value={'active'}
            label={'Активные'}
          />
          <Tab
            value={'archived'}
            label={'Архив'}
          />
          <Tab
            value={'creator'}
            label={'Созданные'}
          />
        </Tabs>
      </Box>
      <Box>
        <ProjectsList projects={projects} />
      </Box>
    </Box>
  );
};

export default ProjectsClient;
