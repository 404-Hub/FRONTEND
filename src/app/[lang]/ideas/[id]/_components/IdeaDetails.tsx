'use client';

import { TIdea, TVote } from '@/types/findProjects';
import { Paper, Box, Typography, Button, Icon, Skeleton } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ArrowBack } from '@mui/icons-material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { assignApp, getIdea, voteIdea } from '@/api/client/idea';
import { useSession, signIn } from 'next-auth/react'; //! Импорт доп.библиотек
import { createProject } from '@/api/client/project';
import Buttons from '@/app/[lang]/ideas/[id]/_components/IdeaDetails/Buttons';
import RegisterModal from './RegisterModal';

const IdeaDetails = (props: { id: number }) => {
  const [idea, setIdea] = useState<TIdea>();
  const [vote, setVote] = useState<TVote>({ type: 'none' });
  const [showModal, setShowModal] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session, status } = useSession();

  const PAGE_TITLE = 'назад';
  const RATING = 'Рейтинг';
  const ADDITIONAL = 'Для кого';
  const DETAILS = 'Детали';
  const ratingColorsVariant = {
    positive: '#1C8C59',
    negative: '#B52020',
  };

  const rating = useMemo(() => {
    if (idea) {
      return idea.upvotes - idea.downvotes;
    }
    return 0;
  }, [idea]);

  const fetchProject = async (ideaId: number) => {
    try {
      const ideaInf: TIdea = await getIdea(ideaId);
      setIdea(ideaInf);
      if (ideaInf.vote) {
        setVote(ideaInf.vote);
      }
    } catch (error) {
      throw new Error('An error occurred during try to load more ideas', { cause: error });
    }
  };
  const handleProjectCreate = async () => {
    if (!session) {
      setShowModal(true);
      return;
    }

    if (!idea) {
      return;
    }

    const res = await createProject({ idea_id: idea.id.toString() });
    if (res.success) {
      router.push(`/projects/${res.data.id}`);
    }
  };

  const handleVoteClick = async (isUpvote: boolean) => {
    if (!session) {
      setShowModal(true);
      return;
    }

    if (!idea) {
      console.error('Project information is undefined');
      return;
    }

    try {
      const voteType: 'up' | 'down' = isUpvote ? 'up' : 'down';
      await voteIdea(String(idea.id), voteType);
      await fetchProject(idea.id);
    } catch (error) {
      console.error('Произошла ошибка во время голосования:', error);
    }
  };

  useEffect(() => {
    fetchProject(Number(props.id));
  }, [props.id]);

  return (
    <Paper
      sx={{
        backgroundColor: '#F9FAFB',
        display: 'flex',
        flexDirection: 'column',
        padding: 2,
        height: '90vh',
        maxWidth: { xs: '100%', md: '70%' },
        marginX: 'auto',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          paddingX: 2,
          alignItems: 'center',
          cursor: 'pointer',
        }}
        onClick={() => {
          router.back();
        }}
      >
        <Icon aria-label="back">
          <ArrowBack sx={{ width: 24, height: 24, color: '#161C24' }} />
        </Icon>
        <Typography
          variant={'h6'}
          sx={{ padding: 2 }}
        >
          {PAGE_TITLE}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '90%',
        }}
      >
        <Typography
          variant={'h4'}
          sx={{ padding: 2, fontWeight: '500' }}
        >
          {idea ? (
            idea.title
          ) : (
            <Skeleton
              animation="wave"
              sx={{ height: 80 }}
            />
          )}
        </Typography>
        <Paper
          sx={{
            backgroundColor: '#F9FAFB',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            height: '100%',
            overflowY: 'auto',
          }}
        >
          <Paper
            sx={{
              backgroundColor: 'transparent',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Typography
              variant={'h6'}
              sx={{ padding: 2 }}
            >
              {`${RATING}:`}
            </Typography>
            <Button
              sx={{
                width: '28px',
                height: '28px',
                minWidth: '28px',
                color: vote.type === 'up' ? 'black' : 'grey', // должен был быть projectInf?.vote но не смог запушить
                background: vote.type === 'up' ? '#F4F6F8' : 'transparent', // должен был быть projectInf?.vote но не смог запушить
              }}
              color="inherit"
              onClick={() => {
                handleVoteClick(true);
              }}
            >
              <KeyboardArrowUpIcon />
            </Button>
            <Typography
              align="center"
              sx={{ color: rating >= 0 ? ratingColorsVariant.positive : ratingColorsVariant.negative }}
            >
              {/* eslint-disable-next-line no-nested-ternary */}
              {idea ? (
                rating <= 0 ? (
                  rating
                ) : (
                  `+${rating}`
                )
              ) : (
                <Skeleton
                  animation="wave"
                  sx={{ height: 40, width: 40 }}
                />
              )}
            </Typography>
            <Button
              sx={{
                width: '28px',
                height: '28px',
                minWidth: '28px',
                margin: 0,
                color: vote.type === 'down' ? 'black' : 'grey', // должен был быть projectInf?.vote но не смог запушить
                background: vote.type === 'down' ? '#F4F6F8' : 'transparent', // должен был быть projectInf?.vote но не смог запушить
              }}
              onClick={() => {
                handleVoteClick(false);
              }}
            >
              <KeyboardArrowDownIcon sx={{ color: '#647380' }} />
            </Button>
          </Paper>
          <Box>
            <Typography
              variant={'h6'}
              sx={{ paddingX: 2 }}
            >
              {`${ADDITIONAL}:`}
            </Typography>
            <Typography
              variant="inherit"
              sx={{ padding: 2 }}
            >
              {idea ? (
                idea.additional
              ) : (
                <Skeleton
                  animation="wave"
                  sx={{ height: 120 }}
                />
              )}
            </Typography>
          </Box>
          <Box>
            <Typography
              variant={'h6'}
              sx={{ paddingX: 2 }}
            >
              {`${DETAILS}:`}
            </Typography>
            <Typography
              variant="inherit"
              sx={{ padding: 2 }}
            >
              {idea ? (
                idea.description
              ) : (
                <Skeleton
                  animation="wave"
                  sx={{ height: 120 }}
                />
              )}
            </Typography>
          </Box>
        </Paper>
        <Buttons
          idea={idea}
          handleIsIdeaTakenChange={handleProjectCreate}
        />
        {showModal && (
          <RegisterModal
            open={showModal}
            onClose={() => setShowModal(false)}
          />
        )}
      </Box>
    </Paper>
  );
};

export default IdeaDetails;
