'use client';

import { TIdea, TVote } from '@/types/findProjects';
import { Paper, Box, Typography, Button, Icon, Skeleton } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ArrowBack } from '@mui/icons-material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { assignApp, getIdea, voteIdea } from '@/api/client/idea';
import { useSession, signIn } from 'next-auth/react'; //! Импорт доп.библиотек
import { createProject } from '@/api/client/project';
import RegisterModal from './RegisterModal';

const IdeaDetails = (props: { id: number }) => {
  const [projectInf, setProjectInf] = useState<TIdea>();
  const [rating, setRating] = useState<number>(0);
  const [ratingColor, setRatingColor] = useState<string>();
  const [isTaken, setIsTaken] = useState(false);
  const [vote, setVote] = useState<TVote>({ type: 'none' });
  const [showModal, setShowModal] = useState(false); //! Отображение модального окна
  const [partyCreated, setPartyCreated] = useState<{ [key: number]: boolean }>({}); //! Состояние для созданной пати
  const [partyLink, setPartyLink] = useState<{ [key: number]: string | null }>({}); //! Ссылка на созданную пати

  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session, status } = useSession(); //! Данные по сессии

  const PAGE_TITLE = 'назад';
  const RATING = 'Рейтинг';
  const ADDITIONAL = 'Для кого';
  const DETAILS = 'Детали';
  const BACK = 'Назад';
  const REJECTION = 'Отказаться';
  const TAKE_OR_PASS = isTaken ? 'Сдать задачу' : 'Взять на себя';
  const ratingColorsVariant = {
    positive: '#1C8C59',
    negative: '#B52020',
  };

  const fetchProject = useCallback(
    async (ideaId: number) => {
      try {
        const ideaInf: TIdea = await getIdea(ideaId);
        setProjectInf(ideaInf);
        if (ideaInf.vote) {
          setVote(ideaInf.vote);
        }
        if (ideaInf.is_assigned) {
          setIsTaken(true);
        }
        setRating(ideaInf.upvotes - ideaInf.downvotes);
      } catch (error) {
        throw new Error('An error occurred during try to load more ideas', { cause: error });
      }
    },
    [projectInf, vote]
  );

  const handleIsIdeaTakenChange = async () => {
    if (!session) {
      //! Проверка сессии
      setShowModal(true);
      return;
    }

    if (!projectInf) {
      return;
    }

    const res = await createProject({ idea_id: projectInf.id.toString() });
    if (res.success && projectInf) {
      projectInf.is_assigned = true;
      setIsTaken((prev) => !prev);
    }
  };

  const handleVoteClick = useCallback(
    async (isUpvote: boolean) => {
      if (!session) {
        setShowModal(true);
        return;
      }

      if (!projectInf) {
        console.error('Project information is undefined');
        return;
      }

      try {
        const voteType: 'up' | 'down' = isUpvote ? 'up' : 'down';
        await voteIdea(String(projectInf.id), voteType);

        await fetchProject(projectInf.id);
      } catch (error) {
        console.error('Произошла ошибка во время голосования:', error);
      }
    },
    [session, fetchProject]
  );

  const handleCreateParty = async () => {
    if (!session) {
      setShowModal(true);
      return;
    }

    const ideaId = Number(props.id ?? searchParams.get('ideaId'));

    // Логика для создания пати
    // После успешного создания пати, обновите состояние
    setPartyCreated((prev) => ({ ...prev, [ideaId]: true }));
    setPartyLink((prev) => ({ ...prev, [ideaId]: 'https://take.ms/atcmO' })); // Замените на реальную ссылку
  };

  console.log(vote);

  useEffect(() => {
    const ideaId = Number(props.id ?? searchParams.get('ideaId'));
    fetchProject(ideaId);
    setPartyCreated((prev) => ({ ...prev, [ideaId]: false })); // Сброс состояния при изменении идеи
    setPartyLink((prev) => ({ ...prev, [ideaId]: null })); // Сброс ссылки при изменении идеи
  }, [props.id, searchParams]);

  useEffect(() => {
    setRatingColor(() => (rating >= 0 ? ratingColorsVariant.positive : ratingColorsVariant.negative));
  }, [projectInf, vote]);

  const ideaId = Number(props.id ?? searchParams.get('ideaId'));

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
          {projectInf ? (
            projectInf.title
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
              sx={{ color: ratingColor }}
            >
              {/* eslint-disable-next-line no-nested-ternary */}
              {projectInf ? (
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
              {projectInf ? (
                projectInf.additional
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
              {projectInf ? (
                projectInf.description
              ) : (
                <Skeleton
                  animation="wave"
                  sx={{ height: 120 }}
                />
              )}
            </Typography>
          </Box>
        </Paper>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 1,
            background: '#F9FAFB',
          }}
        >
          {!partyCreated[ideaId] ? (
            <Button onClick={handleCreateParty}>Request A Party for this task</Button>
          ) : (
            <Box>
              <Typography>
                Your party link:{' '}
                <a
                  href={partyLink[ideaId]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {partyLink[ideaId]}
                </a>
              </Typography>
              <Typography>
                Other active parties:{' '}
                <a
                  href="https://take.ms/atcmO"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://take.ms/atcmO
                </a>
              </Typography>
            </Box>
          )}
        </Box>
        <Box
          sx={{
            backgroundColor: 'transparent',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 1,
            background: '#F9FAFB',
          }}
        >
          <Button
            variant="outlined"
            color={`${isTaken ? 'error' : 'success'}`}
            sx={{ textTransform: 'none', width: '48%', fontWeight: 200 }}
            onClick={() => (isTaken ? handleIsIdeaTakenChange() : router.back())}
          >
            {`${isTaken ? REJECTION : BACK}`}
          </Button>
          <Button
            variant="contained"
            color="success"
            sx={{ textTransform: 'none', width: '48%', fontWeight: 200 }}
            onClick={() => {
              if (isTaken) {
                router.push(`/tasks/${props.id ?? searchParams.get('ideaId')}/submit`);
              } else {
                handleIsIdeaTakenChange();
              }
            }}
          >
            {TAKE_OR_PASS}
          </Button>
        </Box>
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
