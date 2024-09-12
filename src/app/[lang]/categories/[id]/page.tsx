import findPageStyles from '@/styles/findProjectStyles/pageStyles';
import { Box } from '@mui/material';
import { getCategory } from '@/api/server/idea';
import List from './_components/List';

export default async function CategoryPage({ params }: { params: { id: string } }) {
  // @todo loaf category info from the server
  const categoryId = params.id;
  const category = await getCategory(categoryId);
  return (
    <Box sx={findPageStyles.mainContainer}>
      <List categoryId={categoryId} />
    </Box>
  );
}
