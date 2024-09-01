import { Card, CardContent, FormControl, FormGroup, Grid, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { User } from 'next-auth';
import { TProfile } from '@/types/entity';
import { Dispatch, SetStateAction, useCallback } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

interface TAccountInfoContactsProps {
  user: User;
  setProfile: Dispatch<SetStateAction<TProfile>>;
  profile: TProfile;
}

const Contacts = (props: TAccountInfoContactsProps) => {
  const { user, setProfile, profile } = props;

  const handleClick = useCallback(
    (key: keyof TProfile) => {
      if (Object.keys(profile).includes(key)) {
        setProfile((prevState) => ({ ...prevState, [key]: +!prevState[key] }));
      }
    },
    [profile]
  );
  return (
    <Card>
      <CardContent>
        <Typography variant={'h5'}>Contact Info</Typography>
        <Grid
          container
          spacing={2}
          rowSpacing={2}
          sx={{ marginTop: '1rem' }}
        >
          <Grid
            item
            xs={12}
            md={6}
          >
            <FormGroup row>
              <FormControl fullWidth>
                <TextField
                  name={'email'}
                  value={user.email ?? ''}
                  label={'Email'}
                  disabled
                />
              </FormControl>
              <FormControlLabel
                control={<Checkbox />}
                label={'Public'}
                checked={Boolean(profile.is_email_public)}
                onChange={() => handleClick('is_email_public')}
              />
            </FormGroup>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
          >
            <FormGroup row>
              <FormControl fullWidth>
                <TextField
                  name={'telegram'}
                  value={profile.telegram ?? ''}
                  label={'Telegram'}
                  onChange={(e) => {
                    setProfile((prevState) => ({ ...prevState, telegram: e.target.value }));
                  }}
                />
              </FormControl>
              <FormControlLabel
                control={<Checkbox />}
                label={'Public'}
                checked={Boolean(profile.is_telegram_public)}
                onChange={() => handleClick('is_telegram_public')}
              />
            </FormGroup>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
          >
            <FormGroup row>
              <FormControl fullWidth>
                <TextField
                  name={'github'}
                  value={profile.github ?? ''}
                  label={'github'}
                  onChange={(e) => {
                    setProfile((prevState) => ({ ...prevState, github: e.target.value }));
                  }}
                />
              </FormControl>
              <FormControlLabel
                control={<Checkbox />}
                label={'Public'}
                checked={Boolean(profile.is_github_public)}
                onChange={() => handleClick('is_github_public')}
              />
            </FormGroup>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
          >
            <FormGroup row>
              <FormControl fullWidth>
                <TextField
                  name={'website'}
                  value={profile.website ?? ''}
                  label={'Website'}
                  onChange={(e) => {
                    setProfile((prevState) => ({ ...prevState, website: e.target.value }));
                  }}
                />
              </FormControl>
              <FormControlLabel
                control={<Checkbox />}
                label={'Public'}
                checked={Boolean(profile.is_website_public)}
                onChange={() => handleClick('is_website_public')}
              />
            </FormGroup>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
          >
            <FormGroup row>
              <FormControl fullWidth>
                <TextField
                  name={'link'}
                  value={profile.link ?? ''}
                  label={'Profile Link'}
                  onChange={(e) => {
                    setProfile((prevState) => ({ ...prevState, link: e.target.value }));
                  }}
                />
              </FormControl>
              <FormControlLabel
                control={<Checkbox />}
                label={'Public'}
                checked={Boolean(profile.is_public)}
                onChange={() => handleClick('is_public')}
              />
            </FormGroup>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Contacts;
