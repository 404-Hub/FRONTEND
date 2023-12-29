'use client';

import { ArrowBack } from '@mui/icons-material';
import {
  Box, Button, Icon, IconButton, Typography,
} from '@mui/material';
import Link from 'next/link';
import React, {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import { AllFilters } from '../../../Types/Types';
import filtersStyles from '../../../styles/findProjectStyles/filtersStyles';
import findPageStyles from '../../../styles/findProjectStyles/pageStyles';
import RenderFilters from './RenderFilters';

type Props = {
  setFormData: Dispatch<SetStateAction<{ name: string; value: string; type: string; checked: boolean }[]>>;
  handleChange: (name: string, value: string, type: string, checked: boolean) => any;
  setShowFilters: Dispatch<SetStateAction<boolean>>;
  resetFilters: () => void;
  showFilters: boolean;
  allFilters: AllFilters;
}

const FilterBlock: React.FC<Props> = (props) => {
  const [filterExist, setFilterExist] = useState(false);
  const [isSlideEffect, setSlideEffect] = useState(false);
  const [isShowFilter, setShowFilter] = useState(false);

  const showFilter = () => {
    setShowFilter(true);
    setTimeout(() => setSlideEffect(true), 0);
  };
  const hideFilter = () => {
    setSlideEffect(false);
    setTimeout(() => setShowFilter(false), 300);
  };

  const toggleFilter = () => {
    if (props.showFilters) {
      showFilter();
    } else {
      hideFilter();
    }
  };
  const hasCheckedTrue = (obj: string | any[]) => {
    for (let i = 0; i < obj.length; i += 1) {
      const item = obj[i];
      for (let j = 0; j < item.options.length; j += 1) {
        const option = item.options[j];
        if (option.checked) {
          return true;
        }
      }
    }
    return false;
  };
  const cancel = () => {
    props.setShowFilters(false);
    props.resetFilters();
  };

  useEffect(toggleFilter, [props.showFilters]);
  useEffect(() => {
    setFilterExist(hasCheckedTrue(props.allFilters));
  }, [props.allFilters]);

  return (
    <Box>
      <Box >
        <Box sx={filtersStyles.filtersBox}>
          <Box sx={filtersStyles.filtersReset}>
            <Typography variant={'h6'}>фильтр</Typography>
            {filterExist ? <Button
              onClick={props.resetFilters}
              sx={[filtersStyles.button, filtersStyles.buttonReset]}>
              Сбросить</Button>
              : ''}
          </Box>

          <Box sx={{ ...findPageStyles.container, display: { md: 'none', xs: 'flex' } }}>
            <Link href={{ pathname: '/find-project' }} passHref>
              <Icon sx={findPageStyles.icon} aria-label="back" style={findPageStyles.backlLink}>
                <ArrowBack sx={findPageStyles.arrowBack} />
              </Icon>
            </Link>
            <Typography variant={'h6'} sx={findPageStyles.title}>Поиск проекта</Typography>
          </Box>
          <Box
            sx={{ ...filtersStyles.filterMainContainer, display: { xs: isShowFilter ? 'block' : 'none', md: 'block' } }}
          >
            <Box sx={{
              transform: { xs: isSlideEffect ? 'translateX(0)' : 'translateX(100%)', md: 'translateX(0)' },
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
                <IconButton onClick={() => { props.setShowFilters(false); }}
                  color='inherit' aria-label="back" sx={filtersStyles.iconButton} >
                  <ArrowBack sx={findPageStyles.arrowBack} />
                </IconButton>
                <Typography variant={'h6'} sx={findPageStyles.title}>Фильтр</Typography>
              </Box>

              <RenderFilters
                showFilters={props.showFilters}
                handleChange={props.handleChange}
                allFilters={props.allFilters}></RenderFilters>

              <Box sx={filtersStyles.buttonBox}>
                <Button
                  onClick={cancel}
                  sx={[filtersStyles.button, filtersStyles.buttonCancel]}
                >Отмена</Button>
                <Button sx={[filtersStyles.button, filtersStyles.buttonConfirm]} >Сохранить</Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FilterBlock;
