'use client';

import { Avatar, Box, Grid, Typography } from '@mui/material';
import { TProfileInfo } from '@/types/profile';

type THeaderProps = {
  profile: TProfileInfo;
};

const Header = (props: THeaderProps) => {
  let { avatar } = props.profile;

  if (!avatar) {
    avatar = '/images/default_avatar.png';
  }

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
              src={avatar}
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
                {props.profile.name}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1">{props.profile.role}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default Header;
