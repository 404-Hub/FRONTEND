import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import React, { PropsWithChildren } from 'react';

type TEmptyMemberProps = {
  member: any;
};

const EmptyMember = (props: PropsWithChildren<TEmptyMemberProps>) => {
  const { member } = props;
  return (
    <Box
      key={member.id}
      sx={{
        display: 'flex',
        gap: '1rem',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F4F6F8',
        marginBottom: '1rem',
        borderRadius: '8px',
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{ fontSize: '1rem', paddingLeft: '1.5rem', padding: '1rem' }}
      >
        {member.role}
      </Typography>
      <Box sx={{ flex: 1, padding: '1rem' }}>
        <Link href="#">
          <Typography
            component="span"
            sx={{
              color: 'blue',
              '&:hover': {
                cursor: 'pointer',
                textDecoration: 'underline',
              },
            }}
          >
            Who is that?
          </Typography>
        </Link>
      </Box>
      {props.children}
    </Box>
  );
};

export default EmptyMember;
