'use client';

import { Box } from '@mui/material';
import React from 'react';
import { RenderFiltersProps } from '@/types/findProjects';
import filtersStyles from '@/styles/findProjectStyles/filtersStyles';
import { CheckboxGroup, RadioItemsGroup } from './Filter';

const RenderFilters: React.FC<RenderFiltersProps> = (props) => {
  const { handleChange, filtersState } = props;
  return (
    <Box sx={filtersStyles.filterContainer}>
      {props.allFilters.map((filter) => (
        <div key={filter.name}>
          {filter.type === 'checkbox' && (
            <CheckboxGroup
              filter={filter}
              handleChange={handleChange}
              filtersState={filtersState}
            />
          )}
          {filter.type === 'radio' && (
            <RadioItemsGroup
              filter={filter}
              handleChange={handleChange}
              filtersState={filtersState}
            />
          )}
        </div>
      ))}
    </Box>
  );
};

export default RenderFilters;
