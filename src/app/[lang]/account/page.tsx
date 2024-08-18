import { Container, Box, Typography } from '@mui/material';
import Account from '@/app/[lang]/account/_components/Account';

export default function Page() {
  return (
    <Container>
      <Box>
        <Typography variant="h1">Account</Typography>
      </Box>
      <Account />
    </Container>
  );
}
