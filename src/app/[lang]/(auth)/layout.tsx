'use client';

import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
import { PropsWithChildren } from 'react';
import { AuthProvider } from '@/providers/AuthProvider';

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
      <Container maxWidth="sm">
        <StyledContent>
          <AuthProvider>{children}</AuthProvider>
        </StyledContent>
      </Container>
    </StyledRoot>
  );
}
