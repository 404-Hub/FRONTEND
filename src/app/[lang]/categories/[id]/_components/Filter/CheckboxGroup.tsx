import React from 'react';
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import filtersStyles from '@/styles/findProjectStyles/filtersStyles';
import { FilterProps } from '@/types/findProjects';

const CheckboxGroup = (props: FilterProps) => {
  const { filter, handleChange } = props;
  const { type, name, label, options } = filter;
  return (
    <Box sx={filtersStyles.filterBlock}>
      <Typography
        variant={'h6'}
        sx={filtersStyles.filterBlockLabel}
      >
        {label}
      </Typography>
      {options.map((option) => (
        <FormControlLabel
          key={option.name}
          label={option.label}
          sx={filtersStyles.filterLabel}
          control={
            <Checkbox
              key={option.name}
              checked={option.checked}
              sx={[filtersStyles.formControlLabel, filtersStyles.formSelect]}
              // eslint-disable-next-line max-len
              onChange={() => handleChange(filter.name, option.name)}
            />
          }
        />
      ))}
    </Box>
  );
};

export default CheckboxGroup;
