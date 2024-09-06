'use client';

import { TFoundAppProps, TFoundProject } from '@/types/findProjects';
import { Paper, Box, Typography, Button, Icon, Skeleton } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ArrowBack } from '@mui/icons-material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { assignApp, getApp, voteApp } from '@/api/client/apps';
import { useSession, signIn } from 'next-auth/react'; //! Импорт доп.библиотек
import RegisterModal from './RegisterModal';

const ProjectDetails = (props: TFoundAppProps) => {
  // пока передаю пропсами, дальше переделаю на данные из стейт-менеджера
  const { isAppTaken = false, voteByThisUser = 0 } = props;
  const [projectInf, setProjectInf] = useState<TFoundProject>();
  const [rating, setRating] = useState<number>(0);
  const [ratingColor, setRatingColor] = useState<string>();
  const [isTaken, setIsTaken] = useState(isAppTaken);
  const [vote, setVote] = useState(voteByThisUser);
  const [showModal, setShowModal] = useState(false); //! Отображение модального окна

  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session, status } = useSession(); //! Данные по сессии

  const PAGE_TITLE = 'Детали проекта';
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
    async (appId: number) => {
      try {
        const appInf: TFoundProject = await getApp(appId);
        setProjectInf(appInf);
        if (appInf.is_assigned) {
          setIsTaken(true);
        }
        setRating(appInf.upvotes - appInf.downvotes + vote);
      } catch (error) {
        throw new Error('An error occurred during try to load more projects', { cause: error });
      }
    },
    [projectInf, vote]
  );
  const handleIsAppTakenChange = async () => {
    if (!session) {
      //! Проверка сессии
      setShowModal(true);
      return;
    }

    const res = await assignApp(Number(props.id ?? searchParams.get('appid')));
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
        let voteType: 'up' | 'down';

        if (isUpvote) {
          voteType = 'up';
        } else {
          voteType = 'down';
        }

        await voteApp(String(projectInf.id), voteType);

        await fetchProject(projectInf.id);
      } catch (error) {
        console.error('Произошла ошибка во время голосования:', error);
      }
    },
    [projectInf, session, fetchProject]
  );

  useEffect(() => {
    fetchProject(Number(props.id ?? searchParams.get('appid')));
  }, []);

  useEffect(() => {
    setRatingColor(() => (rating + vote >= 0 ? ratingColorsVariant.positive : ratingColorsVariant.negative));
  }, [projectInf, vote]);

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
                color: projectInf.vote === 1 ? 'black' : 'grey',
                background: projectInf.vote === 1 ? '#F4F6F8' : 'transparent',
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
                rating + vote <= 0 ? (
                  rating + vote
                ) : (
                  `+${rating + vote}`
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
                color: projectInf.vote === -1 ? 'black' : 'grey',
                background: projectInf.vote === -1 ? '#F4F6F8' : 'transparent',
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
          <Button
            onClick={() => {
              router.push(`/party/new?appId=${projectInf?.id.toString()}`);
            }}
          >
            Request A Party for this task
          </Button>
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
            onClick={() => (isTaken ? handleIsAppTakenChange() : router.back())}
          >
            {`${isTaken ? REJECTION : BACK}`}
          </Button>
          <Button
            variant="contained"
            color="success"
            sx={{ textTransform: 'none', width: '48%', fontWeight: 200 }}
            onClick={() => {
              if (isTaken) {
                router.push(`/tasks/${props.id ?? searchParams.get('appid')}/submit`);
              } else {
                handleIsAppTakenChange();
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

export default ProjectDetails;
