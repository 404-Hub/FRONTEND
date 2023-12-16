'use client';

import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
import { Logo } from '@/components/base/logo/Logo';
import { PropsWithChildren } from 'react';

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

export default function Layout({ children }: PropsWithChildren) {
  return (
    <StyledRoot>
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, sm: 24, md: 40 },
          left: { xs: 16, sm: 24, md: 40 },
        }}
      />

      <Container maxWidth="sm">
        <StyledContent>{children}</StyledContent>
      </Container>
    </StyledRoot>
  );
}
