'use client';

import { Avatar, Box, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getUserProfile } from '@/api/client/account';
import { TProfile } from '@/types/entity';

const Header = () => {
  const [profile, setProfile] = useState<TProfile>();

  useEffect(() => {
    getUserProfile().then((data) => {
      if (data) {
        setProfile(data);
      }
    });
  }, []);

  return (
    <Grid
      item
      xs={12}
    >
      <Box
        display={'flex'}
        justifyContent={'center'}
        flexDirection={'column'}
        sx={{
          position: 'relative',
          paddingBottom: '3rem',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px 16px 0 0',
        }}
      >
        <Box
          sx={{
            background: 'url("/images/cover.png") no-repeat center',
            backgroundSize: 'cover',
            width: '100%',
            height: '216px',
            borderRadius: '1rem',
          }}
        ></Box>
        <Grid
          container
          sx={{
            position: 'absolute',
            bottom: '1rem',
            left: { xs: '0', md: '2rem' },
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'center', md: 'flex-end' },
          }}
          spacing={'1.5rem'}
        >
          <Grid item>
            <Avatar
              sx={{ width: '120px', height: '120px' }}
              src={'/images/default_avatar.png'}
            />
          </Grid>
          <Grid
            item
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
            }}
          >
            <Box sx={{ marginBottom: '1rem' }}>
              <Typography
                variant="h5"
                color={'#FFFFFF'}
              >
                Alex Smith
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1">Backend developer</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default Header;
