'use client';

import { Box, Button, Typography } from '@mui/material';
import React, {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import projectsListStyles from '@/styles/findProjectStyles/projectsListStyles';
import filtersStyles from '../../../styles/findProjectStyles/filtersStyles';
import { AllFilters } from '../../../Types/Types';
import searchResults from '../../../mockups/searchResultsData.json';
import ProjectCard from './ProjectCard';

type Props = {
  projectType: string;
  allFilters: AllFilters;
  setShowFilters: Dispatch<SetStateAction<boolean>>;
  showFilters: boolean;
};

const ProjectsList: React.FC<Props> = (props) => {
  const [projects, setProjects] = useState<{ rating: string; number: number; name: string; description: string; }[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [prevPage, setPrevPage] = useState(currentPage - 1);

  const fetchProjects = async (page: number, projectType: string) => {
    try {
      const items = searchResults.searchResults.find((el) => el.currentPage === currentPage);
      setProjects(projects.concat(items!.results));
      setTotal(items!.totalCount);
    } catch (err) {
      console.log(err);
      setPrevPage(page - 1);
    }
  };

  useEffect(() => {
    if (currentPage !== prevPage) {
      fetchProjects(currentPage, props.projectType);
    }
  }, [currentPage]);

  const onLoadClick = () => {
    setCurrentPage(currentPage + 1);
  };

  const WORDS = ['проект', 'проекта', 'проектов'];
  const numWord = (value: number, words: string[]) => {
    const numWordМalue = Math.abs(value) % 100;
    const num = numWordМalue % 10;
    if (numWordМalue > 10 && numWordМalue < 20) return words[2];
    if (num > 1 && num < 5) return words[1];
    if (num === 1) return words[0];
    return words[2];
  };

  return (

    <Box sx={projectsListStyles.searchContainer}>
      <Typography sx={[projectsListStyles.searchAmount, projectsListStyles.title]}>
        Найдено {total} {numWord(total, WORDS)}
      </Typography>
      <Box sx={projectsListStyles.projectCardContainer}>
        {projects?.length ? (projects.map((project, index) => (
          <ProjectCard
            key={index}
            project={{
              rating: project.rating,
              number: project.number,
              name: project.name,
              description: project.description,
            }}
          />))
        ) : (
          <Typography>Проекты, удовлетворябщие критериям поиска, не найдены </Typography>
        )}
      </Box>
      <Button
        onClick={onLoadClick} style={projectsListStyles.loadButton}
        sx={[filtersStyles.button, filtersStyles.buttonCancel]}>Загрузить еще</Button>
    </Box>
  );
};

export default ProjectsList;
