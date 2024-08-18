import { type ChangeEvent, useCallback, useEffect, useState } from 'react';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import { Box, Typography, Button, Select, FormControl, MenuItem, InputLabel } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TextField from '@mui/material/TextField';
import { getUserProfile, getUserRoles, saveUserProfile } from '@/api/client/account';
import Image from 'next/image';
import { TProfile, TRole } from '@/types/entity';

const Info = () => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState({} as User);
  const [roles, setRoles] = useState<TRole[]>([]);
  const [profile, setProfile] = useState<TProfile>({} as TProfile);

  useEffect(() => {
    getUserRoles().then((data) => {
      if (data) {
        setRoles(data);
      }
    });
    getUserProfile().then((data) => {
      if (data) {
        setProfile(data);
      }
    });
  }, []);

  useEffect(() => {
    setUser(session?.user || ({} as User));
  }, [status, session]);

  const handleSaveClick = useCallback(() => {
    const formData = {
      ...profile,
      team_role_id: profile.team_role_id,
      name: user.name,
    };

    saveUserProfile(formData).then(() => {
      console.log('Profile saved');
    });
  }, [profile, user]);

  const handleUploadClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    const file = event.target.files[0];
    setProfile((prevState) => ({ ...prevState, avatar: file }));
  };

  return (
    <Box>
      <Box>
        <Typography variant={'h5'}>Personal Info</Typography>
        {typeof profile.avatar === 'string' && (
          <Image
            src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${profile.avatar}`}
            alt={'avatar'}
            width={120}
            height={120}
          />
        )}
        <Box>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload avatar
            <input
              accept="image/*"
              type={'file'}
              style={{ opacity: 0 }}
              onChange={handleUploadClick}
            />
          </Button>
        </Box>
        <Box sx={{ marginTop: '1rem' }}>
          <FormControl fullWidth>
            <TextField
              name={'name'}
              label={'User Name'}
              value={user.name ?? ''}
              onChange={(e) => {
                setUser((prevState) => ({ ...prevState, name: e.target.value }));
              }}
            />
          </FormControl>
        </Box>
        <Box sx={{ marginTop: '1rem' }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select your role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              label={'Select your role'}
              id={'user-role'}
              value={profile.team_role_id ?? ''}
              onChange={(e) => {
                setProfile((prevState) => ({ ...prevState, role: e.target.value as string }));
              }}
            >
              {roles.map((role) => (
                <MenuItem
                  key={role.id}
                  value={role.id}
                >
                  {role.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ marginTop: '1rem' }}>
          <FormControl fullWidth>
            <TextField
              name={'about'}
              value={profile.about ?? ''}
              label={'About'}
              onChange={(e) => {
                setProfile((prevState) => ({ ...prevState, about: e.target.value }));
              }}
            />
          </FormControl>
        </Box>
        <Box sx={{ marginTop: '1rem' }}>
          <FormControl fullWidth>
            <TextField
              name={'availability'}
              value={profile.availability ?? ''}
              label={'Availability'}
              onChange={(e) => {
                setProfile((prevState) => ({ ...prevState, availability: e.target.value }));
              }}
            />
          </FormControl>
        </Box>
      </Box>
      <Box>
        <Button
          onClick={() => {
            handleSaveClick();
          }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default Info;
