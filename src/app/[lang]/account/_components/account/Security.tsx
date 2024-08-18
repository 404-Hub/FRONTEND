import { Button, FormControl, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { changePassword } from '@/api/client/account';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { Iconify } from '@/components/base/iconify/Iconify';

const Security = () => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const formData = {
      password,
      newPassword,
      confirm: confirmPassword,
    };

    changePassword(formData).then((data) => {
      console.log(data);
    });
  };

  return (
    <Grid
      container
      rowGap={'1rem'}
      sx={{
        marginTop: '2rem',
      }}
    >
      <Grid
        item
        xs={12}
      >
        <FormControl fullWidth>
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label={'Current password'}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          ></TextField>
        </FormControl>
      </Grid>
      <Grid
        item
        xs={12}
      >
        <FormControl fullWidth>
          <TextField
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            label={'New password'}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          ></TextField>
        </FormControl>
      </Grid>
      <Grid
        item
        xs={12}
      >
        <FormControl fullWidth>
          <TextField
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            label={'Confirm new password'}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          ></TextField>
        </FormControl>
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
            handleClick();
          }}
        >
          Save
        </Button>
      </Grid>
    </Grid>
  );
};

export default Security;
