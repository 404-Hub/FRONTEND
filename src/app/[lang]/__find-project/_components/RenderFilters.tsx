'use client';

import { Box } from '@mui/material';
import React from 'react';
import { RenderFiltersProps } from '@/types/findProjects';
import filtersStyles from '@/styles/findProjectStyles/filtersStyles';
import { CheckBoxFilter, RadioFilter } from './FilterTypes';

const RenderFilters: React.FC<RenderFiltersProps> = (props) => {
  const { handleChange } = props;
  return (
    <Box sx={filtersStyles.filterContainer}>
      {props.allFilters.map((filter) => (
        <div key={filter.name}>
          {filter.type === 'checkbox' && (
            <CheckBoxFilter
              filter={filter}
              handleChange={handleChange}
            />
          )}
          {filter.type === 'radio' && (
            <RadioFilter
              filter={filter}
              handleChange={handleChange}
            />
          )}
        </div>
      ))}
    </Box>
  );
};

export default RenderFilters;
