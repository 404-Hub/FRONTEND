import findPageStyles from '@/styles/findProjectStyles/pageStyles';
import { Box } from '@mui/material';
import AppsList from './_components/AppsList';

export default function CategoryPage({ params }: { params: { id: string } }) {
  // @todo loaf category info from the server
  const categoryId = params.id;
  return (
    <Box sx={findPageStyles.mainContainer}>
      <AppsList categoryId={categoryId} />
    </Box>
  );
}
