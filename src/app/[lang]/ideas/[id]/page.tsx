import findPageStyles from '@/styles/findProjectStyles/pageStyles';
import { Box } from '@mui/material';
import IdeaDetails from './_components/IdeaDetails';

export default function ProjectPage({ params }: { params: { id: string } }) {
  return (
    <Box sx={findPageStyles.mainContainer}>
      <IdeaDetails id={params.id} />
    </Box>
  );
}
