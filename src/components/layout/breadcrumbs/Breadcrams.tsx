'use client';

import React from 'react';
import { Box, Breadcrumbs, Typography } from '@mui/material';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Options } from '../../../Types/Types';

type Props = {
  options: Options
};

const Breadcrams: React.FC<Props> = (props) => {
  const searchParams = useSearchParams();
  const projectType = searchParams.get('value');

  return (
    <Box sx={breadcrumbs.box}>
      <Breadcrumbs aria-label='breadcrumbs' separator='·'>
        <Link style={breadcrumbs.link} href={{ pathname: '/find-project' }}>Найти проект</Link>
        {projectType ? <Typography sx={breadcrumbs.active}>{props.options[projectType]}</Typography> : ''}
      </Breadcrumbs>
    </Box>
  );
};
export default Breadcrams;

const breadcrumbs = {
  box: {
    display: {
      xs: 'none',
      md: 'flex',
    },
    margin: '23px 0 16px',
  },
  link: {
    textDecoration: 'none',
    color: '#161C24',
  },
  active: {
    color: ' #647380',
  },
};
