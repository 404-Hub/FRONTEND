import { Navigation } from '@/components/layout/Navigation';
import { Box, Container } from '@mui/material';
import Categories from '@/components/findProject/Categories';
import PageTitle from '@/components/findProject/PageTitle';

export default function FindProject() {
  return (
    <Box>
      <Navigation />
      <Container maxWidth="lg" disableGutters>
        <PageTitle />
        <Categories />
      </Container >
    </Box>
  );
}
