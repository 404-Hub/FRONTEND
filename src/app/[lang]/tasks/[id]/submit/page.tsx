'use client';

import {
  Box, Typography, Icon, Container,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import TaskSubmit from '@/components/taskSubmit/TaskSubmit';

export default function Page() {
  const PAGE_TITLE = 'Детали проекта';
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
        <Container
            component="main"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: {
                sx: '100vw',
                md: '80%',
              },
              paddingX: 0,
              marginTop: 2,
            }}
        >
            <Box
                sx={{
                  display: { xs: 'flex', md: 'none' },
                  width: '100vw',
                  flexDirection: 'row',
                  paddingX: 2,
                  alignItems: 'center',
                  background: '#FFFFFF',
                }}
                onClick={() => {
                  router.push(`/find-project/project-page?appid=${Number(searchParams.get('appId'))}`);
                }}
            >
                <Icon aria-label="back">
                    <ArrowBack sx={{ width: 24, height: 24, color: '#161C24' }}/>
                </Icon>
                <Typography
                    variant={'h6'}
                    sx={{ padding: 2 }}
                >
                    {PAGE_TITLE}
                </Typography>
            </Box>
            <TaskSubmit/>
        </Container>
  );
}
