import { ButtonGroup, Container, Grid, Paper, Typography, Tabs, Tab, Button } from '@mui/material';
import { getProjects } from '@/api/server/project';
import ProjectsList from '@/app/[lang]/projects/_components/ProjectsList';
import ProjectsClient from '@/app/[lang]/projects/_components/ProjectsClient';

export default async function ProjectsPage() {
  const projects = await getProjects('active');

  return (
    <Container>
      <div>
        <h1>Projects Page</h1>
        <ProjectsClient projects={projects} />
      </div>
    </Container>
  );
}
