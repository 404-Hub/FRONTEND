'use client';

import projectsListStyles from '@/styles/findProjectStyles/projectsListStyles';
import { Box, Button, Grid, Skeleton, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { ProjectsListProps, TProject } from '@/types/findProjects';
import filtersStyles from '@/styles/findProjectStyles/filtersStyles';
import useGlobalState from '@/lib/hooks/useGlobalState';
import { getIdeas } from '@/api/client/idea';
import ProjectCard from './ProjectCard';

const ProjectsList = (props: ProjectsListProps) => {
  const { categories } = useGlobalState();
  const { categoryId, filtersState } = props;
  const [projects, setProjects] = useState<TProject[]>([]);
  const [lastRequestCurrentPage, setLastRequestCurrentPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [hasAnotherProjects, setHasAnotherProjects] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const WORD_IN_TITLE = 'проект';
  const maxOfProjectsOnPage = 10;

  // eslint-disable-next-line no-unused-vars

  const projectsCheck = (relevantProj: TProject[], newProj: TProject[]) => {
    if (
      relevantProj.length > 0 &&
      newProj.length > 0 &&
      relevantProj[relevantProj.length - 1].id !== newProj[newProj.length - 1].id
    ) {
      return [...relevantProj, ...newProj];
    }
    if (relevantProj.length === 0 && newProj.length > 0) {
      return [...newProj];
    }
    return [...relevantProj];
  };

  const fetchProjects = useCallback(
    async (catId: string) => {
      try {
        const appsInf = await getIdeas(currentPage, catId, filtersState);
        if (lastRequestCurrentPage < currentPage) {
          setProjects((prev) => {
            const updatedProjects = projectsCheck(prev, appsInf.items);
            return updatedProjects;
          });
          setLastRequestCurrentPage(appsInf.current_page);
          setCurrentPage(currentPage + 1);
        }

        if (projects.length + appsInf.items.length >= appsInf.total) {
          setHasAnotherProjects(false);
        }
        setTotal(appsInf.total);
      } catch (error) {
        console.error('Failed to fetch ideas', error);
      }
    },
    [lastRequestCurrentPage, currentPage, filtersState, projects]
  );

  const onLoadClick = useCallback(() => {
    if (hasAnotherProjects) {
      fetchProjects(categoryId || '');
    }
  }, [categoryId, filtersState, projects, hasAnotherProjects]);

  useEffect(() => {
    onLoadClick();
  }, [filtersState]);

  const caseWord = useCallback((projectsAmount: number, word: string) => {
    const numBeforeWord = Math.abs(projectsAmount) % 100;
    if ((numBeforeWord > 4 && numBeforeWord <= 20) || numBeforeWord === 0) return `${word}ов`;
    const lastDigitInNum = numBeforeWord % 10;
    if (lastDigitInNum > 1 && lastDigitInNum <= 4) return `${word}а`;
    return word;
  }, []);

  return (
    <Box sx={{ paddingBottom: 2 }}>
      <Typography
        sx={{ paddingLeft: 2, paddingBottom: 2 }}
        variant="h6"
      >
        Найдено {total} {caseWord(total, WORD_IN_TITLE)}
      </Typography>
      <Grid
        container
        rowSpacing={2}
        columnSpacing={{ xs: 0, sm: 2 }}
      >
        {projects.length > 0
          ? projects.slice(0, maxOfProjectsOnPage * lastRequestCurrentPage).map((project, index) => {
              const { upvotes, downvotes, id, title, description } = project;
              return (
                <Grid
                  key={index}
                  item
                  xs={12}
                  sm={4}
                >
                  <ProjectCard
                    project={{
                      upvotes,
                      downvotes,
                      rating: (upvotes - downvotes).toString(),
                      id,
                      title,
                      description,
                    }}
                  />
                </Grid>
              );
            })
          : [...Array(maxOfProjectsOnPage)].map((_, index) => (
              <Grid
                key={index}
                item
                xs={12}
                sm={4}
              >
                <Skeleton
                  key={index}
                  variant="rectangular"
                  sx={{ width: { xs: '96%', md: 250 }, marginX: 'auto' }}
                  height={288}
                />
              </Grid>
            ))}
        {/* <Typography>Проекты, удовлетворябщие критериям поиска, не найдены </Typography> */}
      </Grid>

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
