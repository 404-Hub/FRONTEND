'use client'
import {Options, AllFilters} from '../../Types/Types';
import { SetStateAction, useEffect, useState } from 'react';
import { Box, Typography, createTheme, ThemeProvider } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import filters from '../../mockups/filters.json'
import Breadcrams from '../../Breadcrumbs/Breadcrams';
import FilterBlock from './FilterBlock';
import SelectFilters from './SelectFilters';
import findPageStyles from './pageStyles'
import { Theme } from '../Styles/theme';
import ProjectsList from './ProjectsList';

const theme = createTheme(Theme);

export default function FoundProjects () {
  const [allFilters, setAllFilters] = useState<AllFilters>([]);

  const fetchAllFilters = () => {
    try {
      // const response = await getAllFilters();
      // const filtersList = response.data.map(item => ({ key: item.id, value: item.name }))
      setAllFilters(filters.filters);
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllFilters();
  }, [])

  const uncheckAll = () =>{
    const newObj = allFilters.map((item) => {
      const newOptions = item.options.map((option) => {
        return { ...option, checked: false };
      });
      return { ...item, options: newOptions };
    });
    return newObj;
  }
  const resetFilters = () => {
    console.log('resetFilters');
    setAllFilters(uncheckAll());
    setFormData([]);
  }  

  const router = useRouter();
  const searchParams = useSearchParams();
  
  const projectType = searchParams.get("value");
  if (!projectType) {
    router.push(`/find-project`)
  }

  const options:Options = {
    'subscribers': 'От Подписчиков',
    'changeInfo': 'Изменить данные',
    'bests': 'Лучшие',
    'training': 'Тренировочный',
    'advanced': 'Продвинутый',
    'complex': 'Комплексный'
  };


  const [formData, setFormData] = useState<{name: string; value: string; type: string; checked: boolean}[]>([]);

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
  };
  
  const onSetFormData = (value: SetStateAction<{
    name: string;
    value: string;
    type: string;
    checked: boolean;
}[]>) => {
    if(value.length){
      setFormData(value)
    } else{
      // fetchAllFilters()s
    }
  }
  const updateFilter = (name:string, value:string, checked:boolean) => {
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
  }

  const handleChange = (name: string, value: string, type: string, checked: boolean) => {
    if (type === 'checkbox') {
      let nameIn:any;
      if ([name] in formData) {
        nameIn = formData[name].includes(value) ? { [name]: formData[name].filter((item: any) => item !== value) } : { [name]: [...formData[name], value] };
      } else {
        nameIn = { [name]: [value] };
      }
      setFormData((prevState) => ({ ...prevState, ...nameIn }));
    }
    if (type === 'radio') {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
    console.log('filters:', updateFilter(name,value, checked));
    setAllFilters(updateFilter(name,value, checked));
  };

  const allValues = Object.values(formData).flat();

  const [showFilters, setShowFilters] = useState(false);

  return (
  <>
    <ThemeProvider theme={theme}>
      <Box sx={findPageStyles.mainContainer}>
        <Breadcrams options = {options} />
        
        { projectType ? <Typography sx={findPageStyles.pageTitle} variant={'h5'}>{options[projectType]}</Typography> : ''}
        
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
      </Box>
    
    </ThemeProvider>
  </>
  )
}