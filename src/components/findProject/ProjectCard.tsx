'use client';

import projectCardStyles from '@/styles/findProjectStyles/projectCardStyles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button, Paper } from '@mui/material';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { TProject } from '@/types/findProjects';

type Props = {
  project: TProject;
  projectRef?: string;
};

const ProjectCard: React.FC<Props> = (props) => {
  const { project } = props;
  const { title, rating, id, description } = project as TProject;
  const [elevation, setElevation] = useState(3);
  const height = 288;

  const handleUpVoteClick = () => {
    console.log('upvote');
  };

  return (
    <Paper
      elevation={elevation}
      onMouseEnter={() => setElevation(9)}
      onMouseLeave={() => setElevation(3)}
      sx={{
        padding: 2,
        paddingBottom: 4,
        height: height,
        overflowY: 'hidden',
        textOverflow: 'ellipsis',
      }}
    >
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 1,
          paddingBottom: 2,
        }}
      >
        <Button
          sx={[projectCardStyles.arrowButtons, projectCardStyles.activeArrow]}
          color="inherit"
          onClick={handleUpVoteClick}
        >
          <KeyboardArrowUpIcon />
        </Button>
        <Typography sx={[projectCardStyles.cardText, projectCardStyles.cardRating]}>
          {rating}
        </Typography>
        <Button
          sx={projectCardStyles.arrowButtons}
          onClick={handleUpVoteClick}
        >
          <KeyboardArrowDownIcon sx={{ color: '#647380' }} />
        </Button>
      </Paper>
      <Divider />
      <Typography sx={{ paddingTop: 2, fontSize: 14 }}>№ {id}</Typography>
      <Typography
        sx={{ paddingTop: 2, paddingBottom: 2, fontWeight: 600, fontSize: 20, color: '#161C24' }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: 16,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {description}
      </Typography>
    </Paper>
  );
};

export default ProjectCard;
