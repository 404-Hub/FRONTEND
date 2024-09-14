import { useMemo } from 'react';
import { Box, Container } from '@mui/material';
import { getCategories } from '@/api/server/idea';
import { TCategory } from '@/types/findProjects';
import Categories from './_components/Categories';
import PageTitle from './_components/PageTitle';

export default async function CategoriesPage() {
  const categories = (await useMemo(() => getCategories(), [])) ?? ([] as TCategory[]);

  return (
    <Box>
      <Container
        maxWidth="lg"
        disableGutters
      >
        <PageTitle />
        <Categories categories={categories} />
      </Container>
    </Box>
  );
}
