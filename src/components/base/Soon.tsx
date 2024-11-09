import { Paper, Box, Typography } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';

const Soon = () => {
  const i = 1;

  return (
    <Box
      sx={{ width: '100%' }}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Paper
        sx={{ width: '320px' }}
        elevation={8}
      >
        <Box
          sx={{ padding: '1rem' }}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <ConstructionIcon />
          <Typography variant="h6">В разработке...</Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Soon;
