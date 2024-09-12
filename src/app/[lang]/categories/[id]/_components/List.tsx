'use client';

import { Box, Typography } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import { ActualFilter, FilterChangeArgs, type TCategory } from '@/types/findProjects';
import findPageStyles from '@/styles/findProjectStyles/pageStyles';
import useGlobalState from '@/lib/hooks/useGlobalState';
import { TFilter } from '@/types/filter';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import FiltersPanel from './FiltersPanel';
import ProjectsList from './ProjectsList';

const filtersList: TFilter[] = [
  {
    type: 'radio',
    name: 'estimation_max',
    label: 'Время',
    options: [
      {
        label: 'до 5 часов',
        name: '5',
        checked: false,
      },
      {
        label: 'до 40 часов',
        name: '40',
        checked: false,
      },
      {
        label: 'до 80 часов',
        name: '80',
        checked: false,
      },
    ],
  },
  {
    type: 'radio',
    name: 'rate',
    label: 'Сложность',
    options: [
      {
        label: 'easy',
        name: 'easy',
        checked: false,
      },
      {
        label: 'medium',
        name: 'medium',
        checked: false,
      },
      {
        label: 'hard',
        name: 'hard',
        checked: false,
      },
    ],
  },
];

const List = (props: { categoryId?: string; category?: TCategory }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categoryId = props.categoryId ?? '1';
  const { category } = props;
  const [allFilters, setAllFilters] = useState<TFilter[]>(filtersList);
  const [filtersState, setFiltersState] = useState<Record<string, string[]>>({});

  // Обработчик изменения фильтра
  const toggleFilter = (filterName: string, optionValue: string) => {
    if (!filtersState[filterName]) {
      setFiltersState({
        ...filtersState,
        [filterName]: [optionValue],
      });
    } else {
      const newFiltersState = {
        ...filtersState,
        [filterName]: filtersState[filterName].includes(optionValue)
          ? filtersState[filterName].filter((value) => value !== optionValue)
          : [...filtersState[filterName], optionValue],
      };
      setFiltersState(newFiltersState);
    }

    // Обновление URL

    const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form

    // update as necessary
    const value = optionValue.trim();

    if (current.has(filterName) && current.get(filterName) === value) {
      current.delete(filterName);
    } else {
      current.set(filterName, value);
    }

    // cast to string
    const search = current.toString();
    // or const query = `${'?'.repeat(search.length && 1)}${search}`;
    const query = search ? `?${search}` : '';

    router.push(`${pathname}${query}`);
  };

  const resetFilters = () => {
    setFiltersState({});
  };

  return (
    <Box>
      {categoryId && (
        <Typography
          sx={findPageStyles.pageTitle}
          variant={'h5'}
        >
          {category?.title ?? 'Список проектов'}
        </Typography>
      )}
      <Box sx={findPageStyles.centralContainer}>
        <FiltersPanel
          handleChange={toggleFilter}
          filtersState={filtersState}
          allFilters={allFilters}
          resetFilters={resetFilters}
        />
        <ProjectsList
          categoryId={categoryId}
          filtersState={filtersState}
        />
      </Box>
      {/* </ThemeProvider> */}
    </Box>
  );
};

export default List;
