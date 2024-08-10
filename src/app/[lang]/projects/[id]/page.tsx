import findPageStyles from '@/styles/findProjectStyles/pageStyles';
import { Box } from '@mui/material';
import ProjectDetails from './_components/ProjectDetails';

export default function ProjectPage({ params }: { params: { id: string } }) {
  return (
    <Box sx={findPageStyles.mainContainer}>
      <ProjectDetails id={params.id} />
    </Box>
  );
}
