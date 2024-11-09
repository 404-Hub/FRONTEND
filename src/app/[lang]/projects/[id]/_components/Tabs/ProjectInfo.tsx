import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import ProjectDescription from '@/components/project/ProjectDescription';
import ProjectCreator from '@/components/project/ProjectCreator';
import ProjectTeam from '@/components/project/ProjectTeam';

type TProjectInfoProps = {
  project: any;
};

const ProjectInfo = (props: TProjectInfoProps) => {
  const { project } = props;
  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
    >
      <Grid
        container
        sx={{ maxWidth: { xs: '100%', md: '50%' } }}
      >
        <Grid
          item
          xs={12}
        >
          <ProjectDescription project={project} />
        </Grid>
        <Grid
          item
          xs={12}
        >
          {project.party && <ProjectCreator party={project.party} />}
        </Grid>
        {project.party && (
          <Grid
            item
            xs={12}
          >
            {project.party && <ProjectTeam party={project.party} />}
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ProjectInfo;
