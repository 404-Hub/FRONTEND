'use client';

import { TFoundAppProps, TFoundProject } from '@/types/findProjects';
import {
  Paper, Box, Typography, Button, Icon, Skeleton,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ArrowBack } from '@mui/icons-material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { assignApp, getApp } from '@/api/client/apps';

const FoundApp = (props: TFoundAppProps) => {
  // пока передаю пропсами, дальше переделаю на данные из стейт-менеджера
  const { isAppTaken = false, voteByThisUser = 0 } = props;
  const [projectInf, setProjectInf] = useState<TFoundProject>();
  const [rating, setRating] = useState<string>();
  const [ratingColor, setRatingColor] = useState<string>();
  const [isTaken, setIsTaken] = useState(isAppTaken);
  const [vote, setVote] = useState(voteByThisUser);

  const searchParams = useSearchParams();
  const router = useRouter();

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

  // @TODO: слишком сложно. можно один раз посчитать рейтинг и обращаться к этому значению

  const changeRatingNums = useCallback(
    (upvotes: number, downvotes: number) => {
      let calculatedRating = upvotes - downvotes;
      calculatedRating += vote;
      if (calculatedRating === 0) return '0';
      return `${calculatedRating < 0 ? calculatedRating.toString() : `+${calculatedRating.toString()}`}`;
    },
    [vote, projectInf],
  );

  const changeRatingColor = useCallback(
    (upvotes: number, downvotes: number) => {
      let calculatedRating = upvotes - downvotes;
      calculatedRating += vote;
      return calculatedRating < 0 ? ratingColorsVariant.negative : ratingColorsVariant.positive;
    },
    [vote, projectInf],
  );

  const changeRatingInf = useCallback(
    (upvotes: number, downvotes: number) => {
      setRating(() => changeRatingNums(upvotes, downvotes));
      setRatingColor(() => changeRatingColor(upvotes, downvotes));
    },
    [vote, projectInf, ratingColor],
  );

  const fetchProject = useCallback(
    async (appId: number) => {
      try {
        const appInf: TFoundProject = await getApp(appId);
        setProjectInf(appInf);
        if (appInf.is_assigned) {
            setIsTaken(true);
        }
        changeRatingInf(appInf.upvotes, appInf.downvotes);
      } catch (error) {
        throw new Error('An error occurred during try to load more projects', { cause: error });
      }
    },
    [projectInf],
  );
  const handleIsAppTakenChange = async () => {
    const res = await assignApp(Number(searchParams.get('appid')));
    if (res.success) {
      if (projectInf) {
        projectInf.is_assigned = true;
        setIsTaken((prev) => !prev);
      }
    }
  };

  const handleUpVoteClick = useCallback(() => {
    console.log('upvote');
  }, []);

  useEffect(() => {
    fetchProject(Number(searchParams.get('appid')));
  }, []);

  useEffect(() => {
    if (projectInf) changeRatingInf(projectInf.upvotes, projectInf.downvotes);
  }, [vote, projectInf, ratingColor]);

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
                    <ArrowBack sx={{ width: 24, height: 24, color: '#161C24' }}/>
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
                              color: vote === 1 ? 'black' : 'grey',
                              background: vote === 1 ? '#F4F6F8' : 'transparent',
                            }}
                            color="inherit"
                            onClick={() => {
                              handleUpVoteClick();
                              setVote(1);
                            }}
                        >
                            <KeyboardArrowUpIcon/>
                        </Button>
                        <Typography
                            align="center"
                            sx={{ color: ratingColor }}
                        >
                            {projectInf ? (
                              rating
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
                              color: vote === -1 ? 'black' : 'grey',
                              background: vote === -1 ? '#F4F6F8' : 'transparent',
                            }}
                            onClick={() => {
                              handleUpVoteClick();
                              setVote(-1);
                            }}
                        >
                            <KeyboardArrowDownIcon sx={{ color: '#647380' }}/>
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
                      backgroundColor: 'transparent',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      padding: 1,
                      background: '#F9FAFB',
                    }}
                >
                    {!isTaken ? (
                        <Button
                            variant="outlined"
                            color="success"
                            sx={{ textTransform: 'none', width: '48%', fontWeight: 200 }}
                            onClick={() => {
                              router.back();
                            }}
                        >
                            {BACK}
                        </Button>
                    ) : (
                        <Button
                            variant="outlined"
                            color="error"
                            sx={{ textTransform: 'none', width: '48%', fontWeight: 200 }}
                            onClick={handleIsAppTakenChange}
                        >
                            {REJECTION}
                        </Button>
                    )}

                    <Button
                        variant="contained"
                        color="success"
                        sx={{ textTransform: 'none', width: '48%', fontWeight: 200 }}
                        onClick={handleIsAppTakenChange}
                    >
                        {TAKE_OR_PASS}
                    </Button>
                </Box>
            </Box>
        </Paper>
  );
};

export default FoundApp;
