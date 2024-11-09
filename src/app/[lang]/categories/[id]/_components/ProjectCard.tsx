'use client';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button, Paper } from '@mui/material';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import React, { useCallback, useState } from 'react';
import { ProjectCardProps, TIdea } from '@/types/findProjects';
import { useRouter } from 'next/navigation';

const ProjectCard: React.FC<ProjectCardProps> = (props) => {
  const { project } = props;
  const { title, rating, id, description } = project as TIdea;
  const [elevation, setElevation] = useState(3);
  const height = 288;

  const handleUpVoteClick = useCallback(() => {
    console.log('upvote');
  }, []);

  const router = useRouter();

  return (
    <Paper
      elevation={elevation}
      onMouseEnter={() => setElevation(9)}
      onMouseLeave={() => setElevation(3)}
      sx={{
        padding: 2,
        paddingBottom: 4,
        height,
        overflowY: 'hidden',
        textOverflow: 'ellipsis',
        marginX: 1,
        cursor: 'pointer',
      }}
      onClick={() => {
        router.push(`/ideas/${id}`);
      }}
      className={'projectCardCY'}
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
          sx={{
            backgroundColor: '#F4F6F8',
            width: '28px',
            height: '28px',
            minWidth: '28px',
          }}
          color="inherit"
          onClick={handleUpVoteClick}
        >
          <KeyboardArrowUpIcon />
        </Button>
        <Typography align="center">{rating}</Typography>
        <Button
          sx={{
            width: '28px',
            height: '28px',
            minWidth: '28px',
            margin: 0,
          }}
          onClick={handleUpVoteClick}
        >
          <KeyboardArrowDownIcon sx={{ color: '#647380' }} />
        </Button>
      </Paper>
      <Divider />
      <Typography sx={{ paddingTop: 2, fontSize: 14 }}>№ {id}</Typography>
      <Typography
        sx={{
          paddingTop: 2,
          paddingBottom: 2,
          fontWeight: 600,
          fontSize: 20,
          color: '#161C24',
        }}
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
