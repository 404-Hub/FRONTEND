import React from 'react';
import Container from '@mui/material/Container';
import { Stages } from '@/app/propose-idea/components/Stages/Stages';

export default function Page() {
  return (
    <>
      <Container
        component="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 1.5,
          padding: 0,
        }}
      >
        <Stages />
      </Container>
    </>
  );
}
