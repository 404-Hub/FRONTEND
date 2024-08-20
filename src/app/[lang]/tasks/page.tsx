import { useTranslations } from 'next-intl';
import { Container, Box } from '@mui/material';
import React from 'react';
import { TasksList } from '@/components/my-tasks/TasksList';

export default function TasksPage() {
  const t = useTranslations('home');
  return (
    <>
      <Container
        component="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20.8,
          padding: 4,
        }}
      >
        <h4>{t('h4MyTasks')}</h4>
        <Box>
          <TasksList />
        </Box>
      </Container>
    </>
  );
}
