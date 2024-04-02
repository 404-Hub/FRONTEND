import { useMemo } from 'react';
import { Box, Container } from '@mui/material';
import Categories from '@/components/findProject/Categories';
import PageTitle from '@/components/findProject/PageTitle';
import { getCategories } from '@/api/server/apps';
import { TCategory } from '@/types/findProjects';

export default async function FindProject() {
  const categories = await useMemo(() => getCategories(), []) ?? [] as TCategory[];
  return (
    <Box>
      <Container maxWidth="lg" disableGutters>
        <PageTitle />
        <Categories categories={categories}/>
      </Container >
    </Box>
  );
}
