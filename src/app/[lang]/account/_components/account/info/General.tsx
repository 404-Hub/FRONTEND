import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import Image from 'next/image';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { User } from 'next-auth';
import { TProfile, TRole } from '@/types/entity';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

interface TAccountInfoGeneralProps {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  profile: TProfile;
  setProfile: Dispatch<SetStateAction<TProfile>>;
  roles: TRole[];
  handleUploadClick: (event: ChangeEvent<HTMLInputElement>) => void;
}

const General = (props: TAccountInfoGeneralProps) => {
  const { user, setUser, profile, setProfile, roles, handleUploadClick } = props;
  return (
    <Card>
      <CardContent>
        <Typography variant={'h5'}>Account Info</Typography>
        <Grid
          container
          sx={{ marginTop: '1rem' }}
          rowSpacing={2}
          spacing={2}
        >
          <Grid
            item
            xs={12}
            md={6}
          >
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
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
          >
            <Grid
              container
              spacing={2}
              rowSpacing={2}
            >
              {typeof profile.avatar === 'string' && (
                <Grid
                  item
                  xs={12}
                  md={6}
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${profile.avatar}`}
                    alt={'avatar'}
                    width={120}
                    height={120}
                  />
                </Grid>
              )}
              <Grid
                item
                xs={12}
                md={6}
              >
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
                      style={{ opacity: 0, position: 'absolute', width: '100%' }}
                      onChange={handleUploadClick}
                    />
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <FormControl fullWidth>
              <TextField
                name={'location'}
                value={profile.location ?? ''}
                label={'Location'}
                onChange={(e) => {
                  setProfile((prevState) => ({ ...prevState, location: e.target.value }));
                }}
              />
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Select your role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                label={'Select your role'}
                id={'user-role'}
                value={profile.team_role_id ?? ''}
                onChange={(e) => {
                  setProfile((prevState) => ({ ...prevState, team_role_id: +e.target.value }));
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
          </Grid>
          <Grid
            item
            xs={12}
          >
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
          </Grid>
          <Grid
            item
            xs={12}
          >
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
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default General;
