import { Avatar, AvatarGroup, Card, CardContent, Chip, Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Description from '@/app/[lang]/projects/[id]/_components/Tabs/ProjectInfo/Description';
import Team from '@/app/[lang]/projects/[id]/_components/Tabs/ProjectInfo/Team';
import Author from '@/app/[lang]/projects/[id]/_components/Tabs/ProjectInfo/Author';

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
          <Description project={project} />
        </Grid>
        <Grid
          item
          xs={12}
        >
          <Author project={project} />
        </Grid>
        {project.party && (
          <Grid
            item
            xs={12}
          >
            <Team project={project} />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ProjectInfo;
