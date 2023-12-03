'use client';
import Container from '@mui/material/Container';

export default function Page() {
  return (
    <>
      <Container
        component="main"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 12,
          padding: 4,
        }}
      >
        <h1>Propose</h1>
      </Container>
    </>
  );
}
