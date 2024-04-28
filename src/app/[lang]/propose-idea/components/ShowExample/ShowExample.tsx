'use client';

import React, { useState } from 'react';
import {
  Box, Typography, IconButton, Paper,
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

interface props {
  title: string;
  content: string;
}

export const ShowExample = ({ title, content }: props) => {
  const [showExample, setShowExample] = useState<boolean>(false);

  const toggleExample = () => {
    setShowExample(!showExample);
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Paper
          elevation={1}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            padding: '8px',
          }}
        >
          <Typography
            variant="body1"
            sx={{ fontSize: '0.875rem', color: 'text.secondary' }}
          >
            {title}
          </Typography>
          <IconButton
            onClick={toggleExample}
            sx={{ color: 'action.active' }}
          >
            {showExample ? <RemoveIcon /> : <AddIcon />}
          </IconButton>
        </Paper>
      </Box>
      {showExample && (
        <Paper
          elevation={1}
          sx={{ marginTop: '0.1rem', padding: '8px' }}
        >
          <Typography
            variant="body1"
            sx={{ fontSize: '0.875rem', color: 'text.secondary' }}
          >
            {content}
          </Typography>
        </Paper>
      )}
    </>
  );
};
