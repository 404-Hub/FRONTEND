import ClearIcon from '@mui/icons-material/Clear';
import TuneIcon from '@mui/icons-material/Tune';
import { Badge, Box, Button, Typography } from '@mui/material';
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { ActualFilter, Filters, SelectedFilters, SelectFiltersProps } from '@/types/findProjects';

const SelectFilters: React.FC<SelectFiltersProps> = (props) => {
  const { actualFilters, showFilters, handleChange, setShowFilters } = props;
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters[]>([]);

  const getCheckedOptFilters = useCallback(
    (filters: ActualFilter[]) => {
      const filtersWithCheckedOpt: SelectedFilters[] = [];
      filters.forEach((filter) => {
        const { filterName, filterType, actualCheckboxOptions, actualRadioOption, actualLabel } =
          filter;
        if (filterType === 'radio') {
          filtersWithCheckedOpt.push({
            label: actualLabel,
            name: filterName,
            type: filterType,
            filter: actualRadioOption,
          });
        } else if (filterType === 'checkbox') {
          actualCheckboxOptions.forEach((option) => {
            filtersWithCheckedOpt.push({
              label: actualLabel,
              name: filterName,
              type: filterType,
              filter: option,
            });
          });
        }
      });
      return filtersWithCheckedOpt;
    },
    [actualFilters]
  );
  useEffect(() => {
    const filtersWithCheckedOpt = getCheckedOptFilters(actualFilters);
    setSelectedFilters(() => {
      return filtersWithCheckedOpt;
    });
    return () => {
      setSelectedFilters([]);
    };
  }, [actualFilters]);

  return (
    <>
      <Box
        sx={{
          padding: '16px',
          display: {
            xs: 'flex',
            md: 'none',
          },
          flexDirection: 'row',
          justifyContent: selectedFilters.length > 0 ? 'space-between' : 'flex-end',
        }}
      >
        <>
          {selectedFilters.length > 0 && (
            <Box
              sx={{
                display: !showFilters ? 'flex' : 'none',
                gap: '12px',
                overflow: 'auto',
                justifyContent: 'flex-start',
              }}
            >
              {selectedFilters.map((selectedFilter) => {
                const { filter, name, type, label } = selectedFilter;
                return (
                  <Box
                    key={label}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      border: '1px solid #DFE3E8',
                      borderRadius: '8px',
                      paddingX: '4px',
                      paddingY: '3px',
                    }}
                  >
                    <Typography sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                      {label}
                    </Typography>
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        handleChange({
                          value: filter,
                          name: name,
                          type: type,
                          checked: false,
                          label: label,
                        });
                      }}
                      sx={{ paddingLeft: 1, minWidth: 23, margin: 0 }}
                    >
                      <ClearIcon
                        sx={{
                          alignItems: 'center',
                          borderRadius: '100%',
                          backgroundColor: '#919EAA',
                          color: '#FFFFFF',
                          padding: '4px',
                          height: 22,
                          width: 22,
                        }}
                      />
                    </Button>
                  </Box>
                );
              })}
            </Box>
          )}
        </>
        <Button
          onClick={() => setShowFilters(true)}
          color="inherit"
          sx={{
            border: '1px solid #DFE3E8',
            borderRadius: '8px',
            minWidth: 44,
          }}
        >
          <Badge
            color="error"
            variant="dot"
            invisible={!(selectedFilters.length > 0)}
          >
            <TuneIcon sx={{ width: 18 }} />
          </Badge>
        </Button>
      </Box>
    </>
  );
};

export default SelectFilters;
