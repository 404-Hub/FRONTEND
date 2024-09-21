'use client';

import { TIdea, TVote } from '@/types/findProjects';
import { Paper, Box, Typography, Button, Icon, Skeleton } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { assignApp, getIdea, voteIdea } from '@/api/client/idea';
import { useSession, signIn } from 'next-auth/react';
import { createProject } from '@/api/client/project';
import Link from 'next/link';
import RegisterModal from './RegisterModal';

const IdeaDetails = (props: { id: number }) => {
  const [projectInf, setProjectInf] = useState<TIdea>();
  const [rating, setRating] = useState<number>(0);
  const [ratingColor, setRatingColor] = useState<string>();
  const [isTaken, setIsTaken] = useState(false);
  const [vote, setVote] = useState<TVote>({ type: 'none' });
  const [showModal, setShowModal] = useState(false);
  const [partyLink, setPartyLink] = useState<string | null>(null); // Store the link to the created party

  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session, status } = useSession();

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

  const fetchIdea = useCallback(async (ideaId: number) => {
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

      // Check if a party has been created for the idea
      if (ideaInf.party) {
        setPartyLink(`/projects/${ideaInf.id}/party`);
      } else {
        setPartyLink(null);
      }
    } catch (error) {
      throw new Error('An error occurred during try to load more ideas', { cause: error });
    }
  }, []);

  const handleIsIdeaTakenChange = async () => {
    if (!session) {
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

        await fetchIdea(projectInf.id);
      } catch (error) {
        console.error('Произошла ошибка во время голосования:', error);
      }
    },
    [session, fetchIdea, projectInf]
  );

  useEffect(() => {
    fetchIdea(Number(props.id ?? searchParams.get('ideaId')));
  }, [props.id, searchParams, fetchIdea]);

  useEffect(() => {
    setRatingColor(() => (rating >= 0 ? ratingColorsVariant.positive : ratingColorsVariant.negative));
  }, [rating, ratingColorsVariant.positive, ratingColorsVariant.negative]);

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
                color: vote.type === 'up' ? 'black' : 'grey',
                background: vote.type === 'up' ? '#F4F6F8' : 'transparent',
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
                rating > 0 ? (
                  `+${rating}`
                ) : (
                  rating
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
                color: vote.type === 'down' ? 'black' : 'grey',
                background: vote.type === 'down' ? '#F4F6F8' : 'transparent',
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
                projectInf.additional_info
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
            flexDirection: 'column',
            alignItems: 'center',
            padding: 2,
            background: '#F9FAFB',
          }}
        >
          {!partyLink ? (
            <>
              <Typography
                variant="h6"
                sx={{ marginBottom: 2 }}
              >
                Хочешь попробовать совместную разработку?
              </Typography>
              <Button
                variant="contained"
                sx={{ backgroundColor: 'orange', '&:hover': { backgroundColor: 'darkorange' }, marginBottom: 2 }}
                onClick={() => {
                  router.push(`/party/new?ideaId=${projectInf?.id.toString()}`);
                }}
              >
                Создать запрос
              </Button>
              <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography
                    variant="body1"
                    sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                  >
                    Смотреть запросы от других пользователей
                  </Typography>
                  <ArrowForward sx={{ marginLeft: 1 }} />
                </Box>
              </Link>
            </>
          ) : (
            <>
              <Typography>Ваша ссылка на пати:</Typography>
              <Link
                href={partyLink ?? ''}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Typography
                  variant="body1"
                  sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                >
                  {partyLink}
                </Typography>
              </Link>
              <Typography>Список активных пати:</Typography>
              <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Typography
                  variant="body1"
                  sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                >
                  Посмотреть активные пати
                </Typography>
              </Link>
            </>
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
            color={isTaken ? 'error' : 'success'}
            sx={{ textTransform: 'none', width: '48%', fontWeight: 200 }}
            onClick={() => (isTaken ? handleIsIdeaTakenChange() : router.back())}
          >
            {isTaken ? REJECTION : BACK}
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
