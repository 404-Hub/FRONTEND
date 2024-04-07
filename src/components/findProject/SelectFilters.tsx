import selectFiltersStyles from '@/styles/findProjectStyles/selectFiltersStyles';
import ClearIcon from '@mui/icons-material/Clear';
import TuneIcon from '@mui/icons-material/Tune';
import { Box, Button } from '@mui/material';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Filters, SelectedFilters, SelectFiltersProps } from '@/types/findProjects';

const SelectFilters: React.FC<SelectFiltersProps> = (props) => {
  const { allFilters, showFilters, handleChange, setShowFilters } = props;
  const [filtersExist, setFiltersExist] = useState<boolean>(false);
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters[]>([]);

  const getCheckedOptFilters = (filters: Filters) => {
    const filtersWithCheckedOpt: SelectedFilters[] = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const filter of filters) {
      const options = filter.options;
      options.map((option) => {
        if (option.checked) {
          filtersWithCheckedOpt.push({ ...option, filter: filter.name, type: filter.type });
        }
      });
    }
    return filtersWithCheckedOpt;
  };

  useEffect(() => {
    const filtersWithCheckedOpt = getCheckedOptFilters(allFilters);
    setSelectedFilters(() => {
      return filtersWithCheckedOpt;
    });
    setFiltersExist(selectedFilters.length > 0);
  }, [allFilters]);

  return (
    <>
      <Box
        sx={selectFiltersStyles.filtersContainer}
        style={{ justifyContent: filtersExist ? 'space-between' : 'flex-end' }}
      >
        {selectedFilters.length && (
          <Box sx={{ display: !showFilters ? 'flex' : 'none', gap: '12px', overflow: 'auto' }}>
            {selectedFilters.map((item) => {
              const { filter, name, type, checked, label } = item;
              return (
                <Box
                  key={`${name}_${type}`}
                  sx={selectFiltersStyles.selectedFilters}
                >
                  {label}
                  <Button
                    onClick={() =>
                      handleChange({
                        value: filter,
                        name: name,
                        type: type,
                        checked: !checked,
                      })
                    }
                    sx={selectFiltersStyles.clearButton}
                  >
                    <ClearIcon sx={selectFiltersStyles.clearIcon} />
                  </Button>
                </Box>
              );
            })}
          </Box>
        )}
        <Button
          onClick={() => setShowFilters(true)}
          color="inherit"
          sx={selectFiltersStyles.filtersButton}
        >
          <TuneIcon sx={selectFiltersStyles.tuneIcon} />
          {filtersExist && <Box sx={selectFiltersStyles.filtersIndicator} />}
        </Button>
      </Box>
    </>
  );
};

export default SelectFilters;
