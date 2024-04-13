'use client';

import filtersStyles from '@/styles/findProjectStyles/filtersStyles';
import { Filters, Filter, FilterBlockProps } from '@/types/findProjects';
import { ArrowBack } from '@mui/icons-material';
import { Box, Button, Icon, IconButton, Paper, Typography } from '@mui/material';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import findPageStyles from '@/styles/findProjectStyles/pageStyles';
import RenderFilters from '@/components/findProject/RenderFilters';

const FilterBlock: React.FC<FilterBlockProps> = (props) => {
  const { handleChange, setShowFilters, resetFilters, showFilters, allFilters } = props;

  const [isFilterExist, setIsFilterExist] = useState(false);
  const [isSlideEffect, setIsSlideEffect] = useState(showFilters);
  const [isShowFilter, setIsShowFilter] = useState(showFilters);

  const hasOptionsChecked = useCallback(
    (filters: Filters) => {
      return filters.some((filter: Filter) =>
        filter.options.some((option: { checked: boolean }) => option.checked)
      );
    },
    [allFilters]
  );

  const handleUpVoteClick = useCallback(() => {
    console.log('upvote');
  }, []);

  const cancel = useCallback(() => {
    setShowFilters(false);
    resetFilters();
  }, [showFilters]);

  useEffect(() => {
    const msInSlideEffect = showFilters ? 0 : 300;
    setIsSlideEffect((prev) => !prev);
    setTimeout(() => setIsShowFilter((prev) => !prev), msInSlideEffect);
  }, [showFilters]);

  useEffect(() => {
    const hasCheckedOptions = hasOptionsChecked(allFilters);
    setIsFilterExist(hasCheckedOptions);
  }, [allFilters]);

  return (
    <Paper
      sx={{
        padding: 2,
        whiteSpace: 'nowrap',
        height: '90%',
        width: '100vw',
        maxWidth: { md: '25%' },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Typography
          variant={'h6'}
          sx={{ display: { xs: 'none', sm: 'block' }, paddingRight: 2 }}
        >
          Фильтры
        </Typography>
        {isFilterExist && (
          <Button
            onClick={resetFilters}
            variant="outlined"
            color="error"
            sx={{ display: { xs: 'none', md: 'block' } }}
          >
            Сбросить
          </Button>
        )}
      </Box>
      <Box sx={{ display: { md: 'none', xs: 'flex' }, alignItems: 'center' }}>
        <Link
          href={{ pathname: '/find-project' }}
          passHref
        >
          <Icon
            sx={findPageStyles.icon}
            aria-label="back"
          >
            <ArrowBack sx={findPageStyles.arrowBack} />
          </Icon>
        </Link>
        <Typography
          variant={'h6'}
          sx={findPageStyles.title}
        >
          Поиск проекта
        </Typography>
      </Box>
      <Box>
        <Box
          sx={{
            transform: {
              xs: isSlideEffect ? 'translateX(0)' : 'translateX(100%)',
              md: 'translateX(0)',
            },
            transition: 'transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
            width: { xs: '100vw', md: '20%' },
            position: { md: 'static', xs: 'fixed' },
            left: { xs: 0, md: 'none' },
            top: { xs: '10%', md: 'none' },
            zIndex: 1000,
            backgroundColor: { xs: '#F9FAFB', md: 'transparent' },
            display: 'flex',
            flexDirection: 'column',
            height: { xs: '90%', md: 'auto' },
          }}
        >
          <Box
            sx={{
              backgroundColor: '#ffffff',
              display: { xs: 'flex', md: 'none' },
              alignItems: 'center',
              padding: 2,
            }}
          >
            <IconButton
              onClick={() => {
                setShowFilters(false);
              }}
              color="inherit"
              aria-label="back"
              sx={filtersStyles.iconButton}
            >
              <ArrowBack sx={findPageStyles.arrowBack} />
            </IconButton>
            <Typography
              variant={'h6'}
              sx={findPageStyles.title}
            >
              Фильтр
            </Typography>
          </Box>
          <RenderFilters
            showFilters={showFilters}
            handleChange={handleChange}
            allFilters={allFilters}
          ></RenderFilters>
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 2,
              gap: 2,
            }}
          >
            <Button
              onClick={cancel}
              variant="outlined"
              color="success"
              sx={{
                width: '48%',
              }}
            >
              <Typography
                sx={{
                  textTransform: 'capitalize',
                }}
              >
                Отмена
              </Typography>
            </Button>
            <Button
              onClick={handleUpVoteClick}
              variant="contained"
              color="success"
              sx={{
                width: '48%',
              }}
            >
              <Typography
                sx={{
                  textTransform: 'capitalize',
                }}
              >
                Сохранить
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default FilterBlock;
