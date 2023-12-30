'use client';

import {
  Box, ThemeProvider, Typography, createTheme,
} from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { SetStateAction, useEffect, useState } from 'react';
import { AllFilters, FormDataValue, Options } from '../../../types/findProjects';
import filters from '../../mockups/filters.json';
import findPageStyles from '../../styles/findProjectStyles/pageStyles';
import FilterBlock from './FilterBlock';
import ProjectsList from './ProjectsList';
import SelectFilters from './SelectFilters';
import { Theme } from '../../styles/findProjectStyles/theme';

const theme = createTheme(Theme);
type Props = {
  options: Options;
};

const ProjectsAndFilters: React.FC<Props> = (props) => {
  const [allFilters, setAllFilters] = useState<AllFilters>([]);
  const [formData, setFormData] = useState<FormDataValue[]>([]);

  const fetchAllFilters = () => {
    try {
      setAllFilters(filters.filters);
    } catch (error) {
      throw new Error('An error occurred during try to display the filters', { cause: error });
    }
  };

  useEffect(() => {
    fetchAllFilters();
  }, []);

  const uncheckAll = () => {
    const newObj = allFilters.map((item) => {
      const newOptions = item.options.map((option) => ({ ...option, checked: false }));
      return { ...item, options: newOptions };
    });
    return newObj;
  };
  const resetFilters = () => {
    setAllFilters(uncheckAll());
    setFormData([]);
  };

  const router = useRouter();
  const searchParams = useSearchParams();

  const projectType = searchParams.get('value');
  if (!projectType) {
    router.push('/find-project');
  }
  // const handleSubmit = (event: { preventDefault: () => void; }) => {
  //   event.preventDefault();
  // };

  const onSetFormData = (value: SetStateAction<FormDataValue[]>) => {
    if (value.length) {
      setFormData(value);
    } else {
      // fetchAllFilters()s
    }
  };
  const updateFilter = (name: string, value: string, checked: boolean) => {
    const updatedOb = allFilters.map((item) => {
      if (item.name === name) {
        const updatedOptions = item.options.map((option) => {
          if (option.name === value) {
            return { ...option, checked };
          }
          return option;
        });

        return { ...item, options: updatedOptions };
      }
      return item;
    });
    return updatedOb;
  };

  const handleChange = (name: string, value: string, type: string, checked: boolean) => {
    if (type === 'checkbox') {
      let nameIn: any;
      if ([name] in formData) {
        nameIn = formData[name].includes(value) ? {
          [name]: formData[name].filter((item: any) => item !== value)
        }
          : { [name]: [...formData[name], value] };
      } else {
        nameIn = { [name]: [value] };
      }
      setFormData((prevState) => ({ ...prevState, ...nameIn }));
    }
    if (type === 'radio') {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
    setAllFilters(updateFilter(name, value, checked));
  };

  const allValues = Object.values(formData).flat();

  const [showFilters, setShowFilters] = useState(false);

  return (
    <>
      {/* <ThemeProvider theme={theme}> */}
      {projectType ? <Typography sx={findPageStyles.pageTitle} variant={'h5'}>{props.options[projectType]}</Typography> : ''}

      <Box sx={findPageStyles.centralContainer}>

        <FilterBlock
          handleChange={handleChange}
          setFormData={onSetFormData}
          setShowFilters={setShowFilters}
          resetFilters={resetFilters}
          showFilters={showFilters}
          allFilters={allFilters}
        />

        <SelectFilters
          handleChange={handleChange}
          allValues={allValues}
          projectType={projectType}
          allFilters={allFilters}
          setShowFilters={setShowFilters}
          showFilters={showFilters}
        />

        <ProjectsList
          projectType={projectType}
          allFilters={allFilters}
          setShowFilters={setShowFilters}
          showFilters={showFilters}
        />

      </Box>
      {/* </ThemeProvider> */}
    </>
  );
};

export default ProjectsAndFilters;
