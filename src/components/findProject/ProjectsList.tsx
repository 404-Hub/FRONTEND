'use client';

import projectsListStyles from '@/styles/findProjectStyles/projectsListStyles';
import { Box, Button, Grid, Skeleton, Typography } from '@mui/material';
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { Filters, ProjectsListProps, TProject } from '@/types/findProjects';
import filtersStyles from '@/styles/findProjectStyles/filtersStyles';
import ProjectCard from '@/components/findProject/ProjectCard';
import { getApps } from '@/api/client/apps';
import Paper from '@mui/material/Paper';

const ProjectsList = (props: ProjectsListProps) => {
  const { projectType, filters } = props;
  const [projects, setProjects] = useState<TProject[]>([]);
  const [lastRequestCurrentPage, setLastRequestCurrentPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [hasAnotherProjects, setHasAnotherProjects] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const WORD_IN_TITLE = 'проект';
  const maxOfProjectsOnPage = 9;

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
          ? projects
              .slice(0, maxOfProjectsOnPage * lastRequestCurrentPage)
              .map((project, index) => {
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
                        upvotes: upvotes,
                        downvotes: downvotes,
                        rating: (upvotes - downvotes).toString(),
                        id: id,
                        title: title,
                        description: description,
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
