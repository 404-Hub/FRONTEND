import React from 'react';
import {
  Box, FormControlLabel, Radio, RadioGroup, Typography,
} from '@mui/material';
import filtersStyles from '@/styles/findProjectStyles/filtersStyles';
import { FilterProps, Filter } from '@/types/findProjects';

const RadioFilter = (props: FilterProps) => {
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
      <RadioGroup name={filter.name}>
        {options.map((option) => (
          <FormControlLabel
            key={option.name}
            sx={filtersStyles.filterLabel}
            control={
              <Radio
                checked={option.checked}
                sx={filtersStyles.formSelect}
              />
            }
            value={option.name}
            label={option.label}
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
        ))}
      </RadioGroup>
    </Box>
  );
};

export default RadioFilter;
