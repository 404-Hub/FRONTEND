import { Container, Box, Typography } from '@mui/material';
import { Logo } from '@/components/base/logo/Logo';

export default function NotFound() {
  return (
    <Container>
      <Box>
        <Typography variant={'h1'}>Ничего не нашлось :(</Typography>
      </Box>
      <Box>
        <Logo />
      </Box>
      <Box></Box>
    </Container>
  );
}
