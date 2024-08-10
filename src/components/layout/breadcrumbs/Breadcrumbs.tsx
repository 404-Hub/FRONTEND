'use client';

import { Box, Breadcrumbs as MUIBreadcrumbs, Typography } from '@mui/material';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';

const Breadcrumbs = (props: { subcategory: string; options: Record<string, any> }) => {
  const searchParams = useSearchParams();
  const projectType = searchParams.get('value');

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
      cursor: 'pointer',
    },
    active: {
      color: ' #647380',
    },
  };

  return (
    <Box sx={breadcrumbs.box}>
      <MUIBreadcrumbs
        aria-label="breadcrumbs"
        separator="·"
      >
        <Link
          style={breadcrumbs.link}
          href={{ pathname: '/find-project' }}
        >
          Найти проект
        </Link>
        {props.subcategory && !projectType ? (
          <Typography sx={breadcrumbs.active}>{props.subcategory}</Typography>
        ) : null}
        {props.subcategory && projectType ? (
          <Link
            style={breadcrumbs.link}
            href={{ pathname: '/find-project/subcategories' }}
          >
            {props.subcategory}
          </Link>
        ) : null}
        {projectType && props.options ? (
          <Typography sx={breadcrumbs.active}>{props.options[projectType]}</Typography>
        ) : null}
      </MUIBreadcrumbs>
    </Box>
  );
};
export default Breadcrumbs;
