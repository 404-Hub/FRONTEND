'use client';

import projectCardStyles from '@/styles/findProjectStyles/projectCardStyles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Project } from '@/types/findProjects';

type Props = {
  project: Project,
};

const ProjectCard: React.FC<Props> = (props) => (
  <Box sx={[projectCardStyles.container]}>
    <Box sx={projectCardStyles.ratingContainer}>
      <Button sx={[projectCardStyles.arrowButtons, projectCardStyles.activeArrow]} color='inherit'>
        <KeyboardArrowUpIcon />
      </Button>
      <Typography
        sx={[projectCardStyles.cardText, projectCardStyles.cardRating]}
      >{props.project.rating}</Typography>
      <Button sx={projectCardStyles.arrowButtons}>
        <KeyboardArrowDownIcon sx={projectCardStyles.passiveArrow} />
      </Button>
    </Box>
    <Typography sx={projectCardStyles.projectNumber}>№ {props.project.number}</Typography>
    <Typography sx={projectCardStyles.title}>{props.project.name}</Typography>
    <Typography
      sx={[projectCardStyles.cardText, projectCardStyles.projectDescription]}
    >{props.project.description}</Typography>
  </Box>
);

export default ProjectCard;
