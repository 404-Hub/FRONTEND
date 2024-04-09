'use client';

import { Box, Typography } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { SetStateAction, useCallback, useEffect, useState } from 'react';
import { Filters, ActualFilter, FilterChangeArgs } from '@/types/findProjects';
import filters from '../../mockups/filters.json';
import findPageStyles from '@/styles/findProjectStyles/pageStyles';
import FilterBlock from '@/components/findProject/FilterBlock';
import ProjectsList from '@/components/findProject//ProjectsList';
import SelectFilters from '@/components/findProject//SelectFilters';

const AppsList = () => {
  const [allFilters, setAllFilters] = useState<Filters>(filters.filters);
  const [actualFilters, setActualFilters] = useState<ActualFilter[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [defaultFilters, setDefaultFilters] = useState(filters.filters);

  const resetFilters = useCallback(() => {
    setAllFilters(defaultFilters);
    setActualFilters([]);
  }, [allFilters, actualFilters]);

  const router = useRouter();
  const searchParams = useSearchParams();

  const projectType = searchParams.get('value');
  if (!projectType) {
    // router.push('/find-project');
  }

  const onSetActualFilters = useCallback(
    (value: SetStateAction<ActualFilter[]>) => {
      if (value.length) {
        setActualFilters(value);
      }
    },
    [actualFilters]
  );

  const updateFilter = useCallback(
    (args: FilterChangeArgs) => {
      const { type, name, value, checked } = args;

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
    [actualFilters]
  );

  const changeFilters = useCallback(
    (filtersValues: ActualFilter[], newFilterValues: FilterChangeArgs) => {
      const { type, name, value, checked } = newFilterValues;
      let newFilter: ActualFilter | ActualFilter[] = {
        filterName: name,
        filterType: type,
        actualRadioOptions: type === 'radio' ? value : '',
        actualCheckboxOptions: type === 'checkbox' ? [value] : [''],
      };
      const filterInd = filtersValues.findIndex((filter) => {
        return filter.filterName === name;
      });
      const hasFilter = filterInd !== -1;

      if (filtersValues.length === 0) {
        return [newFilter];
      } else if (!hasFilter) {
        newFilter = [...filtersValues, newFilter];
      } else {
        newFilter = filtersValues.map((filter) => {
          if (filter.filterName === name) {
            if (type === 'radio') {
              filter.actualRadioOptions = value;
            }
            if (type === 'checkbox') {
              if (checked) {
                if (!filter.actualCheckboxOptions.includes(value)) {
                  filter.actualCheckboxOptions.push(value);
                }
              } else {
                if (filter.actualCheckboxOptions.includes(value)) {
                  filter.actualCheckboxOptions.splice(
                    filter.actualCheckboxOptions.indexOf(value),
                    1
                  );
                }
              }
            }
          }
          return filter;
        });
      }
      return [...newFilter];
    },
    [actualFilters, allFilters]
  );

  const handleChange = useCallback(
    (args: FilterChangeArgs) => {
      setActualFilters((prev) => changeFilters(prev, args));
      setAllFilters(updateFilter(args));
    },
    [actualFilters, allFilters]
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
          setFormData={onSetActualFilters}
          setShowFilters={setShowFilters}
          resetFilters={resetFilters}
          showFilters={showFilters}
          allFilters={allFilters}
        />

        <SelectFilters
          handleChange={handleChange}
          projectType={projectType}
          allFilters={allFilters}
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
