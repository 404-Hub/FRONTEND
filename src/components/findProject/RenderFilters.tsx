'use client';

import { Box, Checkbox, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import React from 'react';
import { AllFilters, HandleValueType } from '@/types/findProjects';
import filtersStyles from '@/styles/findProjectStyles/filtersStyles';

type Props = {
  showFilters: boolean;
  allFilters: AllFilters[];
  handleChange: HandleValueType;
};

const RenderFilters: React.FC<Props> = (props) => (
  <Box sx={filtersStyles.filterContainer}>
    {props.allFilters.map((filter) => {
      if (filter.type === 'checkbox') {
        return (
          <Box
            key={filter.name}
            sx={filtersStyles.filterBlock}
          >
            <Typography
              variant={'h6'}
              sx={filtersStyles.filterBlockLabel}
            >
              {filter.label}
            </Typography>
            {filter.options.map((option) => (
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
                    onChange={() =>
                      props.handleChange(filter.name, option.name, filter.type, !option.checked)
                    }
                  />
                }
              />
            ))}
          </Box>
        );
      }
      if (filter.type === 'radio') {
        return (
          <Box
            key={filter.name}
            sx={filtersStyles.filterBlock}
          >
            <Typography
              variant={'h6'}
              sx={filtersStyles.filterBlockLabel}
            >
              {filter.label}
            </Typography>
            <RadioGroup name={filter.name}>
              {filter.options.map((option) => (
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
                  onChange={() =>
                    props.handleChange(filter.name, option.name, filter.type, !option.checked)
                  }
                />
              ))}
            </RadioGroup>
          </Box>
        );
      }
      return null;
    })}
  </Box>
);

export default RenderFilters;
