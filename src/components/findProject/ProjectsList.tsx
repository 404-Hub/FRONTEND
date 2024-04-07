'use client';

import projectsListStyles from '@/styles/findProjectStyles/projectsListStyles';
import { Box, Button, Typography } from '@mui/material';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Filters, TProject } from '@/types/findProjects';
import filtersStyles from '@/styles/findProjectStyles/filtersStyles';
import ProjectCard from '@/components/findProject/ProjectCard';
import { getApps } from '@/api/client/apps';

type Props = {
  projectType: string | null;
  allFilters: Filters;
  setShowFilters: Dispatch<SetStateAction<boolean>>;
  showFilters: boolean;
};

const ProjectsList: React.FC<Props> = (props) => {
  const { projectType, allFilters, setShowFilters, showFilters } = props;
  const [projects, setProjects] = useState<TProject[]>([]);
  const [total, setTotal] = useState(0);
  const [hasAnotherProjects, setHasAnotherProjects] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [prevPage, setPrevPage] = useState(currentPage - 1);
  const WORD_IN_TITLE = 'проект';

  // eslint-disable-next-line no-unused-vars
  const fetchProjects = async (page: number, categoryId: string) => {
    try {
      const appsInf = await getApps(currentPage, categoryId);
      setProjects((prev) => {
        let newArrayOFProjects = appsInf.items as TProject[];

        if (prev.length === 0 && newArrayOFProjects.length > 0) {
          newArrayOFProjects = [...newArrayOFProjects];
        } else if (newArrayOFProjects.length === 0) {
          setHasAnotherProjects(false);
          newArrayOFProjects = [...prev];
        } else if (newArrayOFProjects[0].id !== prev[0].id) {
          newArrayOFProjects = [...prev, ...newArrayOFProjects];
        }
        return newArrayOFProjects;
      });
      setTotal(appsInf.total);
    } catch (error) {
      setPrevPage(page - 1);
      throw new Error('An error occurred during try to load more projects', { cause: error });
    }
  };

  useEffect(() => {
    if (currentPage !== prevPage) {
      fetchProjects(currentPage, projectType || '');
    }
  }, [currentPage]);

  const onLoadClick = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const caseWord = (projectsAmount: number, word: string) => {
    const numBeforeWord = Math.abs(projectsAmount) % 100;
    if ((numBeforeWord > 4 && numBeforeWord <= 20) || numBeforeWord === 0) return word + 'ов';
    const lastDigitInNum = numBeforeWord % 10;
    if (lastDigitInNum > 1 && lastDigitInNum <= 4) return word + 'а';
    return word;
  };

  return (
    <Box sx={projectsListStyles.searchContainer}>
      <Typography sx={[projectsListStyles.searchAmount, projectsListStyles.title]}>
        Найдено {total} {caseWord(total, WORD_IN_TITLE)}
      </Typography>
      <Box sx={projectsListStyles.projectCardContainer}>
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={{
                upvotes: project.upvotes,
                downvotes: project.downvotes,
                rating: (project.upvotes - project.downvotes).toString(),
                id: project.id,
                title: project.title,
                description: project.description,
              }}
            />
          ))
        ) : (
          <Typography>Проекты, удовлетворябщие критериям поиска, не найдены </Typography>
        )}
      </Box>
      {hasAnotherProjects && (
        <Button
          onClick={onLoadClick}
          style={projectsListStyles.loadButton}
          sx={[filtersStyles.button, filtersStyles.buttonCancel]}
        >
          Загрузить еще
        </Button>
      )}
    </Box>
  );
};

export default ProjectsList;
