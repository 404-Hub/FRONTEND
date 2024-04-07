'use client';

import { Box, Typography } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { SetStateAction, useEffect, useState } from 'react';
import { Filters, ActualFilter, FilterChangeArgs } from '@/types/findProjects';
import filters from '../../mockups/filters.json';
import findPageStyles from '@/styles/findProjectStyles/pageStyles';
import FilterBlock from '@/components/findProject/FilterBlock';
import ProjectsList from '@/components/findProject//ProjectsList';
import SelectFilters from '@/components/findProject//SelectFilters';

const ProjectsAndFilters = () => {
  const [allFilters, setAllFilters] = useState<Filters>([]);
  const [actualFilters, setActualFilters] = useState<ActualFilter[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [defaultFilters, setDefaultFilters] = useState(filters.filters);

  const fetchAllFilters = () => {
    try {
      const filtersFromJSON = filters.filters;
      setAllFilters(filtersFromJSON);
    } catch (error) {
      throw new Error('An error occurred during try to display the filters', { cause: error });
    }
  };

  useEffect(() => {
    fetchAllFilters();
  }, []);

  const resetFilters = () => {
    setAllFilters(defaultFilters);
    setActualFilters([]);
  };

  const router = useRouter();
  const searchParams = useSearchParams();

  const projectType = searchParams.get('value');
  if (!projectType) {
    // router.push('/find-project');
  }

  const onSetActualFilters = (value: SetStateAction<ActualFilter[]>) => {
    if (value.length) {
      setActualFilters(value);
    }
  };
  const updateFilter = (args: FilterChangeArgs) => {
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
  };

  const handleChange = (args: FilterChangeArgs) => {
    const { type, name, value, checked } = args;

    setActualFilters((prev) => {
      let newPrev: ActualFilter | ActualFilter[] = {
        filterName: name,
        filterType: type,
        actualRadioOptions: type === 'radio' ? value : '',
        actualCheckboxOptions: type === 'checkbox' ? [value] : [''],
      };
      const filterInd = prev.findIndex((filter) => {
        return filter.filterName === name;
      });
      const hasFilter = filterInd !== -1;

      if (prev.length === 0) {
        return [newPrev];
      } else if (!hasFilter) {
        newPrev = [...prev, newPrev];
      } else {
        newPrev = prev.map((filter) => {
          if (filter.filterName === name) {
            if (type === 'radio') {
              filter.actualRadioOptions = value;
            }
            if (type === 'checkbox') {
              console.log(checked, value);
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
      console.log([...newPrev]);
      return [...newPrev];
    });

    setAllFilters(updateFilter(args));
  };

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
          allFilters={allFilters}
          setShowFilters={setShowFilters}
          showFilters={showFilters}
        />
      </Box>
      {/* </ThemeProvider> */}
    </Box>
  );
};

export default ProjectsAndFilters;
