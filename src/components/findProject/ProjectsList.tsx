'use client';

import projectsListStyles from '@/styles/findProjectStyles/projectsListStyles';
import { Box, Button, Typography } from '@mui/material';
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { Filters, ProjectsListProps, TProject } from '@/types/findProjects';
import filtersStyles from '@/styles/findProjectStyles/filtersStyles';
import ProjectCard from '@/components/findProject/ProjectCard';
import { getApps } from '@/api/client/apps';

const ProjectsList = (props: ProjectsListProps) => {
  const { projectType, filters } = props;
  const [projects, setProjects] = useState<TProject[]>([]);
  const [lastRequestCurrentPage, setLastRequestCurrentPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [hasAnotherProjects, setHasAnotherProjects] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const WORD_IN_TITLE = 'проект';

  // eslint-disable-next-line no-unused-vars

  const projectsCheck = (relevantProj: TProject[], newProj: TProject[]) => {
    if (
      relevantProj.length > 0 &&
      newProj.length > 0 &&
      relevantProj[relevantProj.length - 1].id !== newProj[newProj.length - 1].id
    ) {
      return [...relevantProj, ...newProj];
    } else if (relevantProj.length === 0 && newProj.length > 0) {
      return [...newProj];
    } else {
      return [...relevantProj];
    }
  };

  const fetchProjects = useCallback(
    async (categoryId: string) => {
      try {
        const appsInf = await getApps({
          page: currentPage,
          category: categoryId,
          filters: filters,
        });
        if (lastRequestCurrentPage !== appsInf.current_page) {
          setProjects((prev) => projectsCheck(prev, appsInf.items));
          setCurrentPage((prev) => prev + 1);
          setLastRequestCurrentPage(appsInf.current_page);
        }
        if (currentPage >= appsInf.last_page) {
          setHasAnotherProjects(false);
        }
        setTotal(appsInf.total);
      } catch (error) {
        throw new Error('An error occurred during try to load more projects', { cause: error });
      }
    },
    [lastRequestCurrentPage, currentPage, projects]
  );

  const onLoadClick = useCallback(() => {
    fetchProjects(projectType || '');
  }, [lastRequestCurrentPage, currentPage, projects]);

  useEffect(() => {
    onLoadClick();
  }, [filters]);

  const caseWord = useCallback((projectsAmount: number, word: string) => {
    const numBeforeWord = Math.abs(projectsAmount) % 100;
    if ((numBeforeWord > 4 && numBeforeWord <= 20) || numBeforeWord === 0) return word + 'ов';
    const lastDigitInNum = numBeforeWord % 10;
    if (lastDigitInNum > 1 && lastDigitInNum <= 4) return word + 'а';
    return word;
  }, []);

  return (
    <Box sx={projectsListStyles.searchContainer}>
      <Typography sx={[projectsListStyles.searchAmount, projectsListStyles.title]}>
        Найдено {total} {caseWord(total, WORD_IN_TITLE)}
      </Typography>
      <Box sx={projectsListStyles.projectCardContainer}>
        {projects.length > 0 ? (
          projects.slice(0, 9 * lastRequestCurrentPage).map((project, index) => (
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
