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
    <Paper sx={filtersStyles.filtersBox}>
      <Box sx={filtersStyles.filtersReset}>
        <Typography variant={'h6'}>фильтр</Typography>
        {isFilterExist && (
          <Button
            onClick={resetFilters}
            sx={[filtersStyles.button, filtersStyles.buttonReset]}
          >
            Сбросить
          </Button>
        )}
      </Box>
      <Box sx={{ ...findPageStyles.container, display: { md: 'none', xs: 'flex' } }}>
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
      <Box
        sx={{
          ...filtersStyles.filterMainContainer,
          display: { xs: isShowFilter ? 'block' : 'none', md: 'block' },
        }}
      >
        <Box
          sx={{
            transform: {
              xs: isSlideEffect ? 'translateX(0)' : 'translateX(100%)',
              md: 'translateX(0)',
            },
            transition: 'transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            height: {
              xs: '100%',
              md: 'auto',
            },
          }}
        >
          <Box sx={[findPageStyles.container, filtersStyles.filterTitle]}>
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
          <Box sx={filtersStyles.buttonBox}>
            <Button
              onClick={cancel}
              sx={[filtersStyles.button, filtersStyles.buttonCancel]}
            >
              Отмена
            </Button>
            <Button sx={[filtersStyles.button, filtersStyles.buttonConfirm]}>Сохранить</Button>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default FilterBlock;
