import Container from '@mui/material/Container';
import { MainCover } from '@/components/MainCover.tsx';

export default function Page() {
  return (
    <Container
      component="main"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
      }}
    >
      <MainCover />
    </Container>
  );
}
