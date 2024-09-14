import { Container, Grid, Paper } from '@mui/material';
import { getProjects } from '@/api/server/project';

export default async function ProjectsPage() {
  const projects = await getProjects();

  console.log(projects);

  return (
    <Container>
      <div>
        <h1>Projects Page</h1>
        <Grid
          container
          rowSpacing={2}
          spacing={2}
        >
          {projects.map((project: any) => (
            <Grid
              item
              key={project.id}
              xs={12}
              md={6}
            >
              <Paper
                elevation={2}
                sx={{ padding: '1rem' }}
              >
                <h2>{project.idea.title}</h2>
                <p>{project.idea.description}</p>
                <p>project_id {project.id}</p>
                <p>idea_id {project.idea.id}</p>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>
    </Container>
  );
}
