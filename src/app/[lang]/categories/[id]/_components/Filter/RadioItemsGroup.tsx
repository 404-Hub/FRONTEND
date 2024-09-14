import React from 'react';
import { Box, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import filtersStyles from '@/styles/findProjectStyles/filtersStyles';
import { FilterProps } from '@/types/findProjects';

const RadioItemsGroup = (props: FilterProps) => {
  const { filter, handleChange, filtersState } = props;
  const { type, name, label, options } = filter;
  return (
    <Box sx={filtersStyles.filterBlock}>
      <Typography
        variant={'h6'}
        sx={filtersStyles.filterBlockLabel}
      >
        {label}
      </Typography>
      <RadioGroup name={filter.name}>
        {options.map((option) => (
          <FormControlLabel
            key={option.name}
            sx={filtersStyles.filterLabel}
            control={
              <Radio
                checked={filtersState[filter.name]?.includes(option.name)}
                sx={filtersStyles.formSelect}
              />
            }
            value={option.name}
            label={option.label}
            onChange={() => handleChange(filter.name, option.name)}
          />
        ))}
      </RadioGroup>
    </Box>
  );
};

export default RadioItemsGroup;
