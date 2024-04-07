'use client';

import projectCardStyles from '@/styles/findProjectStyles/projectCardStyles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';
import { TProject } from '@/types/findProjects';

type Props = {
  project: TProject;
  projectRef?: string;
};

const ProjectCard: React.FC<Props> = (props) => {
  const { project } = props;
  const { title, rating, id, description } = project as TProject;

  return (
    <Box sx={[projectCardStyles.container]}>
      <Box sx={projectCardStyles.ratingContainer}>
        <Button
          sx={[projectCardStyles.arrowButtons, projectCardStyles.activeArrow]}
          color="inherit"
        >
          <KeyboardArrowUpIcon />
        </Button>
        <Typography sx={[projectCardStyles.cardText, projectCardStyles.cardRating]}>
          {rating}
        </Typography>
        <Button sx={projectCardStyles.arrowButtons}>
          <KeyboardArrowDownIcon sx={projectCardStyles.passiveArrow} />
        </Button>
      </Box>
      <Typography sx={projectCardStyles.projectNumber}>№ {id}</Typography>
      <Typography sx={projectCardStyles.title}>{title}</Typography>
      <Typography sx={[projectCardStyles.cardText, projectCardStyles.projectDescription]}>
        {description}
      </Typography>
    </Box>
  );
};

export default ProjectCard;
