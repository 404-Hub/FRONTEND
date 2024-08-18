import { Breadcrumbs, Container, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import Header from '@/app/[lang]/profile/_components/profile/Header';
import LeftAside from '@/app/[lang]/profile/_components/profile/LeftAside';
import Content from '@/app/[lang]/profile/_components/profile/Content';

export default function ProfilePage() {
  const a = 1;

  return (
    <Container>
      <Breadcrumbs>
        <Link href={'/'}>Home</Link>
        <Typography color="text.primary">Profile</Typography>
      </Breadcrumbs>
      <Typography
        sx={{ marginTop: '1rem' }}
        variant="h5"
      >
        Profile
      </Typography>
      <Grid
        container
        rowSpacing={'1.5rem'}
        spacing={'1.5rem'}
      >
        <Header />
        <LeftAside />
        <Content />
      </Grid>
    </Container>
  );
}
