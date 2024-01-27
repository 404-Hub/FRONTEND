import selectFiltersStyles from '@/styles/findProjectStyles/selectFiltersStyles';
import ClearIcon from '@mui/icons-material/Clear';
import TuneIcon from '@mui/icons-material/Tune';
import { Box, Button } from '@mui/material';
import React, {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import {
  AllFilters, FormDataValue, HandleValueType, SelectedFilters,
} from '@/types/findProjects';

type Props = {
  projectType: string | null;
  allFilters: AllFilters;
  showFilters: boolean;
  allValues: FormDataValue[];
  handleChange: HandleValueType;
  setShowFilters: Dispatch<SetStateAction<boolean>>;
};
const getCheckedOptions = (ob: AllFilters) => {
  const checkedOptions = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const item of ob) {
    const filteredOptions = item.options.filter((option) => option.checked === true);
    const options = filteredOptions.map((el) => ({ ...el, filter: item.name, type: item.type }));

    checkedOptions.push(...options);
  }
  return checkedOptions;
};

const SelectFilters: React.FC<Props> = (props) => {
  const [filtersExist, setFiltersExist] = useState<boolean>(false);
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters[]>([]);

  useEffect(() => {
    setFiltersExist(selectedFilters.length > 0);
    setSelectedFilters(getCheckedOptions(props.allFilters));
  }, [props.allFilters]);
  useEffect(() => {
    setFiltersExist(selectedFilters.length > 0);
  }, [selectedFilters]);

  return (
    <>
      <Box sx={selectFiltersStyles.filtersContainer} style={{ justifyContent: filtersExist ? 'space-between' : 'flex-end' }}>
        {selectedFilters.length ? (
          <Box sx={{ display: !props.showFilters ? 'flex' : 'none', gap: '12px', overflow: 'auto' }}>
            {selectedFilters.map((item, index) => <Box
              key={index}
              sx={selectFiltersStyles.selectedFilters}
            >
              {item.label}
              <Button
                onClick={() => props.handleChange(item.filter, item.name, item.type, !item.checked)}
                sx={selectFiltersStyles.clearButton}>
                <ClearIcon sx={selectFiltersStyles.clearIcon} />
              </Button>
            </Box>)}
          </Box>)
          : ''}
        <Button
          onClick={() => props.setShowFilters(true)}
          color='inherit'
          sx={selectFiltersStyles.filtersButton}
        >
          <TuneIcon sx={selectFiltersStyles.tuneIcon} />
          {filtersExist ? <Box sx={selectFiltersStyles.filtersIndicator} /> : ''}
        </Button>
      </Box>
    </>
  );
};

export default SelectFilters;
