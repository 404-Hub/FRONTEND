import AppsList from '@/components/findProject/AppsList';
import findPageStyles from '@/styles/findProjectStyles/pageStyles';
import { Box } from '@mui/material';

function FoundProjects() {
  return (
    <Box sx={findPageStyles.mainContainer}>
      <AppsList />
    </Box>
  );
}

export default FoundProjects;
