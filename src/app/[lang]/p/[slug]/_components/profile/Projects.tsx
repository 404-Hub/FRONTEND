'use client';

import { TProfileProject } from '@/types/profile';
import { Box, Button, Paper, Typography } from '@mui/material';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useState } from 'react';
import SuggestProjectModal from './Modals/SuggestProjectModal';

type TProjectsProps = {
  projects: TProfileProject[];
  userId: number;
  isOwner: boolean;
  isLogged: boolean;
};

const Projects = (props: TProjectsProps) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <Paper
      elevation={5}
      sx={{ marginTop: '1.5rem', padding: '1rem' }}
    >
      <Typography variant="h6">Участие в проектах</Typography>
      <Box>
        {props.projects.length > 0 ? (
          props.projects.map((project) => (
            <Box
              key={project.id}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{ padding: '0.5rem 0' }}
            >
              <Typography variant="body2">{project.title}</Typography>
              <Link href={`/ideas/${project.idea_id}`}>
                <ArrowForwardIcon style={{ cursor: 'pointer' }} />
              </Link>
            </Box>
          ))
        ) : (
          <Box sx={{ textAlign: 'center', marginTop: '1rem' }}>
            <Typography
              variant="body2"
              gutterBottom
            >
              {props.isOwner
                ? 'Вы ещё не участвовали ни в одном проекте.'
                : 'Пользователь еще не учавствовал в проектах.'}
            </Typography>
            {props.isOwner && props.isLogged && (
              <Link
                href="/categories"
                passHref
              >
                <Button
                  variant={'contained'}
                  color={'success'}
                >
                  Найти проект
                </Button>
              </Link>
            )}
          </Box>
        )}
      </Box>
      {!props.isOwner && props.isLogged && (
        <Box sx={{ marginTop: '1rem', textAlign: 'center' }}>
          <Button
            variant={'contained'}
            color={'success'}
            onClick={() => setShowModal(true)}
          >
            Предложить участие в проекте
          </Button>
        </Box>
      )}

      {!props.isOwner && props.isLogged && showModal && (
        <SuggestProjectModal
          open={showModal}
          userId={props.userId}
          onClose={() => setShowModal(false)}
        />
      )}
    </Paper>
  );
};

export default Projects;
