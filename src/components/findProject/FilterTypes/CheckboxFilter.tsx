import React from 'react';
import {
  Box, Checkbox, FormControlLabel, Typography,
} from '@mui/material';
import filtersStyles from '@/styles/findProjectStyles/filtersStyles';
import { FilterProps, Filter } from '@/types/findProjects';

const CheckBoxFilter = (props: FilterProps) => {
  const { filter, handleChange } = props;
  const {
    type, name, label, options,
  } = filter as Filter;
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
              onChange={() => handleChange({
                name,
                value: option.name,
                type,
                checked: !option.checked,
                label: option.label,
              })
              }
            />
          }
        />
      ))}
    </Box>
  );
};

export default CheckBoxFilter;
