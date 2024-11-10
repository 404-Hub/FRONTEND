import { Button, ButtonGroup, Grid, Paper, Typography } from '@mui/material';
import { TProject } from '@/types/findProjects';
import { useRouter } from 'next/navigation';

type TProjectsListProps = {
  projects: TProject[];
};
const ProjectsList = (props: TProjectsListProps) => {
  const router = useRouter();
  const { projects } = props;
  return (
    <Grid
      container
      rowSpacing={2}
      spacing={2}
    >
      <Grid
        item
        xs={12}
      >
        <Paper
          elevation={2}
          sx={{ padding: '0.5rem 1rem' }}
        >
          <Grid container>
            <Grid
              item
              xs={8}
            >
              <Typography variant={'body1'}>Проект</Typography>
            </Grid>
            <Grid
              item
              xs={4}
              sx={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              <Typography variant={'body1'}>Действия</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      {projects.length === 0 && (
        <Grid
          item
          xs={12}
        >
          <Paper
            elevation={2}
            sx={{ padding: '1rem' }}
          >
            <Typography variant={'body1'}>Проектов нет</Typography>
          </Paper>
        </Grid>
      )}
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
                xs={8}
              >
                <Typography variant={'body1'}>{project.idea.title}</Typography>
                <Typography variant={'body2'}>{project.id}</Typography>
              </Grid>
              <Grid
                item
                xs={4}
                sx={{ display: 'flex', justifyContent: 'flex-end' }}
              >
                <ButtonGroup>
                  {project.party && (
                    <Button
                      onClick={() => {
                        router.push(`/projects/${project.id}/party`);
                      }}
                    >
                      В группу
                    </Button>
                  )}
                  <Button
                    onClick={() => {
                      router.push(`/projects/${project.id}`);
                    }}
                  >
                    В проект
                  </Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProjectsList;
