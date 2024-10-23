import { ButtonGroup, Container, Grid, Paper, Typography, Tabs, Tab, Button } from '@mui/material';
import { getProjects } from '@/api/server/project';

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <Container>
      <div>
        <h1>Projects Page</h1>
        <Tabs>
          <Tab label={'Активные'} />
          <Tab label={'Архив'} />
          <Tab label={'Созданные'} />
        </Tabs>
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
            >
              <Paper
                elevation={2}
                sx={{ padding: '1rem' }}
              >
                <Grid container>
                  <Grid
                    item
                    xs={4}
                  >
                    <Typography variant={'body1'}>{project.idea.title}</Typography>
                    <Typography variant={'body2'}>{project.id}</Typography>
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    sx={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <Typography variant={'body1'}>Active</Typography>
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    sx={{ display: 'flex', justifyContent: 'flex-end' }}
                  >
                    <ButtonGroup>
                      <Button>Сдать</Button>
                      <Button>Принять</Button>
                    </ButtonGroup>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>
    </Container>
  );
}
