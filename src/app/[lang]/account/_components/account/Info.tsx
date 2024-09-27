import { type ChangeEvent, useCallback, useEffect, useState } from 'react';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import { AlertColor, Box, Button, Grid, Snackbar } from '@mui/material';
import { getUserProfile, getUserRoles, saveUserProfile } from '@/api/client/account';
import { TProfile, TRole } from '@/types/entity';
import General from '@/app/[lang]/account/_components/account/info/General';
import Contacts from '@/app/[lang]/account/_components/account/info/Contacts';
import useGlobalState from '@/lib/hooks/useGlobalState';
import { Alert } from '@mui/lab';
import CheckIcon from '@mui/icons-material/Check';

const Info = () => {
  const context = useGlobalState();
  const { data: session, status } = useSession();
  const [user, setUser] = useState({} as User);
  const [roles, setRoles] = useState<TRole[]>(context.teamRoles);
  const [profile, setProfile] = useState<TProfile>(context.userProfile);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('Profile saved');
  const [severity, setSeverity] = useState<AlertColor>('success');

  useEffect(() => {
    if (Object.keys(context.userProfile).length === 0) {
      getUserProfile().then((data) => {
        if (data) {
          setProfile(data);
          context.setUserProfile(data);
        }
      });
    }
    if (Object.keys(context.teamRoles).length === 0) {
      getUserRoles().then((data) => {
        if (data) {
          setRoles(data);
          context.setTeamRoles(data);
        }
      });
    }
  }, []);

  useEffect(() => {
    setUser(session?.user || ({} as User));
  }, [status, session]);

  const handleSaveClick = useCallback(() => {
    const formData: Record<string, any> = {
      ...profile,
      team_role_id: profile.team_role_id,
      name: user.name,
    };

    Object.keys(formData).forEach((key) => {
      if (formData[key] === null) {
        delete formData[key];
      }
    });

    console.log('formData', formData);

    saveUserProfile(formData).then((res) => {
      if (res) {
        setOpen(true);
      } else {
        setMessage('Failed to save profile');
        setSeverity('error');
        setOpen(true);
      }
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
    <Box sx={{ marginTop: '1rem', marginBottom: '2rem' }}>
      <Grid
        container
        spacing={2}
        rowSpacing={2}
      >
        <Grid
          item
          xs={12}
        >
          <General
            user={user}
            setUser={setUser}
            profile={profile}
            setProfile={setProfile}
            roles={roles}
            handleUploadClick={handleUploadClick}
          />
        </Grid>
        <Grid
          item
          xs={12}
        >
          <Contacts
            user={user}
            setProfile={setProfile}
            profile={profile}
          />
        </Grid>
        <Grid
          item
          xs={12}
          display={'flex'}
          justifyContent={'flex-end'}
        >
          <Button
            variant={'contained'}
            color={'primary'}
            onClick={() => {
              handleSaveClick();
            }}
          >
            Save
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={open}
        autoHideDuration={3000}
      >
        <Alert
          variant={'filled'}
          severity={severity}
          onClose={() => setOpen(false)}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Info;
