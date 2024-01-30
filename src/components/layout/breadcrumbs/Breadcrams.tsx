'use client';

import { Options } from '@/types/findProjects';
import { Box, Breadcrumbs, Typography } from '@mui/material';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';

type Props = {
  options?: Options,
  subcategory?: string,
};

const Breadcrams: React.FC<Props> = (props) => {
  const searchParams = useSearchParams();
  const projectType = searchParams.get('value');

  return (
    <Box sx={breadcrumbs.box}>
      <Breadcrumbs aria-label='breadcrumbs' separator='·'>
        <Link style={breadcrumbs.link} href={{ pathname: '/find-project' }}>Найти проект</Link>
        {props.subcategory && !projectType ? <Typography sx={breadcrumbs.active}>{props.subcategory}</Typography> : (null)}
        {props.subcategory && projectType ? <Link style={breadcrumbs.link} href={{ pathname: '/find-project/subcategories' }}>{props.subcategory}</Link> : (null)}
        {projectType && props.options ? <Typography sx={breadcrumbs.active}>
          {props.options[projectType]}
        </Typography> : (null)}
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
    cursor: 'pointer'
  },
  active: {
    color: ' #647380',
  },
};
