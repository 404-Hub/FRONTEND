'use client';

import { FilterBlockProps } from '@/types/findProjects';
import { ArrowBack } from '@mui/icons-material';
import { Box, Button, Icon, IconButton, Paper, Typography } from '@mui/material';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import findPageStyles from '@/styles/findProjectStyles/pageStyles';
import { useIsMobile } from '@/lib/hooks/useIsMobile';
import RenderFilters from './RenderFilters';

const FiltersPanel: React.FC<FilterBlockProps> = (props) => {
  const { handleChange, resetFilters, allFilters, filtersState } = props;

  const isMobile = useIsMobile();

  const [showFilters, setShowFilters] = useState(false);

  const [isFilterExist, setIsFilterExist] = useState(false);

  const cancel = useCallback(() => {
    setShowFilters(false);
    resetFilters();
  }, [resetFilters, setShowFilters]);

  useEffect(() => {
    setIsFilterExist(Object.keys(filtersState).length > 0);
  }, [filtersState]);

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
          sx={{ display: { xs: 'none', md: 'block' }, paddingRight: 2 }}
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
          href={{ pathname: '/categories' }}
          passHref
        >
          <Icon aria-label="back">
            <ArrowBack sx={{ width: 24, height: 24, color: '#161C24' }} />
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
        {((isMobile && showFilters) || !isMobile) && (
          <Box
            sx={{
              ...findPageStyles.container,
            }}
          >
            <Box
              sx={{
                backgroundColor: '#ffffff',
                display: { xs: 'flex', md: 'none' },
                alignItems: 'center',
                padding: 2,
              }}
              onClick={() => {
                setShowFilters(false);
              }}
            >
              <IconButton
                color="inherit"
                aria-label="back"
              >
                <ArrowBack />
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
              filtersState={filtersState}
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
                onClick={() => {
                  setShowFilters(false);
                }}
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
        )}
      </Box>
    </Paper>
  );
};

export default FiltersPanel;
