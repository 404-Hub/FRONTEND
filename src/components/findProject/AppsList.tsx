'use client';

import { Box, Typography } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import React, {
  useCallback, useState,
} from 'react';
import { Filters, ActualFilter, FilterChangeArgs } from '@/types/findProjects';
import findPageStyles from '@/styles/findProjectStyles/pageStyles';
import FilterBlock from '@/components/findProject/FilterBlock';
import ProjectsList from '@/components/findProject//ProjectsList';
import SelectFilters from '@/components/findProject//SelectFilters';
import filters from '../../mockups/filters.json';

const AppsList = () => {
  const [allFilters, setAllFilters] = useState<Filters>(filters.filters);
  const [actualFilters, setActualFilters] = useState<ActualFilter[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [defaultFilters] = useState(filters.filters);

  const resetFilters = useCallback(() => {
    setAllFilters(defaultFilters);
    setActualFilters([]);
  }, [allFilters, actualFilters]);

  const searchParams = useSearchParams();

  const projectType = searchParams.get('value');
  if (!projectType) {
    // router.push('/find-project');
  }

  const updateFilter = useCallback(
    (args: FilterChangeArgs) => {
      const {
        type, name, value, checked,
      } = args;

      const newFilters = allFilters.map((filter) => {
        const { options } = filter;

        if (filter.name === name) {
          const updatedOptions = options.map((option) => {
            if (type === 'radio' && option.name !== value) {
              return { ...option, checked: false };
            }
            if (option.name === value) {
              return { ...option, checked };
            }
            return option;
          });

          return { ...filter, options: updatedOptions };
        }
        return filter;
      });
      return newFilters;
    },
    [allFilters],
  );

  const changeFilters = useCallback(
    (filtersValues: ActualFilter[], newFilterValues: FilterChangeArgs) => {
      const {
        type, name, value, checked, label,
      } = newFilterValues;

      const newFilter: ActualFilter = {
        filterName: name,
        filterType: type,
        actualRadioOption: type === 'radio' ? value : '',
        actualCheckboxOption: type === 'checkbox' ? value : '',
        actualLabel: label,
      };
      const isInclude = !!filtersValues.find((f) => f.filterName === name);
      if (type === 'radio' && checked && isInclude) {
        return [...filtersValues.filter((f) => f.filterName !== name), newFilter];
      }
      if (!checked) {
        return filtersValues.filter((f) => f.actualLabel !== newFilter.actualLabel);
      }
      return [...filtersValues, newFilter];
    },
    [actualFilters],
  );

  const handleChange = useCallback(
    (args: FilterChangeArgs) => {
      setActualFilters((prev) => changeFilters(prev, args));
      setAllFilters(updateFilter(args));
    },
    [actualFilters, allFilters],
  );

  return (
    <Box>
      {/* <ThemeProvider theme={theme}> */}
      {projectType && (
        <Typography
          sx={findPageStyles.pageTitle}
          variant={'h5'}
        >
          {projectType}
        </Typography>
      )}
      <Box sx={findPageStyles.centralContainer}>
        <FilterBlock
          handleChange={handleChange}
          setShowFilters={setShowFilters}
          actualFilters={actualFilters}
          showFilters={showFilters}
          allFilters={allFilters}
          resetFilters={resetFilters}
        />

        <SelectFilters
          handleChange={handleChange}
          projectType={projectType}
          actualFilters={actualFilters}
          setShowFilters={setShowFilters}
          showFilters={showFilters}
        />

        <ProjectsList
          projectType={projectType}
          filters={actualFilters}
        />
      </Box>
      {/* </ThemeProvider> */}
    </Box>
  );
};

export default AppsList;
