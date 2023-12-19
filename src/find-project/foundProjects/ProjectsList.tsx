'use client'

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import ProjectCard from './ProjectCard';
import filtersStyles from './filtersStyles';
import searchResults from '../../../mockups/searchResultsData.json';
import { AllFilters } from '@/app/Types/Types';


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

  const res = searchResults.searchResults[0].results;

  const fetchProjects = async (page: number, projectType: string) => {
    try {
      const items = searchResults.searchResults.find((el) => el.currentPage === currentPage);
      setProjects(projects.concat(items.results));
      setTotal(items.totalCount)
    } catch (err) {
      console.log(err);
      setPrevPage(page - 1);
    }
  }

  useEffect(() => {
    if (currentPage !== prevPage) {
      fetchProjects(currentPage, props.projectType);
    }
  }, [currentPage])

  const onLoadClick = () => {
    setCurrentPage(currentPage + 1);
  };

  let allValues = Object.values(props.allFilters).flat();

  const WORDS = ['проект', 'проекта', 'проектов'];
  const numWord = (value: number, words: string[]) => {
    value = Math.abs(value) % 100;
    var num = value % 10;
    if (value > 10 && value < 20) return words[2];
    if (num > 1 && num < 5) return words[1];
    if (num == 1) return words[0];
    return words[2];
  }

  return (

    <Box sx={projectsListStyles.searchContainer}>
      <Typography sx={[projectsListStyles.searchAmount, projectsListStyles.title]}>
        Найдено {total} {numWord(total, WORDS)}
      </Typography>
      <Box sx={projectsListStyles.projectCardContainer}>
        {projects?.length ?
          (projects.map((project, index) => {
            return (
              <ProjectCard
                key={index}
                project={{
                  rating: project.rating,
                  number: project.number,
                  name: project.name,
                  description: project.description
                }}
              />)
          })
          ) : (
            <Typography>Проекты, удовлетворябщие критериям поиска, не найдены </Typography>
          )}
      </Box>
      <Button
        onClick={onLoadClick} style={projectsListStyles.loadButton}
        sx={[filtersStyles.button, filtersStyles.buttonCancel]}>Загрузить еще</Button>
    </Box>
  )
}

export default ProjectsList


export const projectsListStyles = {
  searchContainer: {
    flex: 1,
    padding: {
      xs: '0 16px',
      md: 0,
    },
  },
  searchAmount: {
    margin: {
      xs: '0 0 17px 0px',
      md: '17px 0 25px 0px',
    },
  },
  title: {
    fontWeight: '600',
    fontSize: '20px',
    color: "#161C24",
  },
  projectCardContainer: {
    display: {
      xs: "flex",
      md: "grid"
    },
    flexDirection: 'column',
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr) )",
    gridAutoRows: "minmax(100px, auto)",
    gap: '12px',
  },
  loadButton: {
    display: 'block',
    margin: '40px auto 16px',
  },
};