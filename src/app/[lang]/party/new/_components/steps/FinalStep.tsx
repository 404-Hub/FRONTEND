import { FormControl, Grid, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import type { Dispatch, SetStateAction } from 'react';

interface TFinalStep {
  duration: string;
  setDuration: Dispatch<SetStateAction<string>>;
}

const FinalStep = (props: TFinalStep) => {
  const { duration, setDuration } = props;
  return (
    <Grid
      container
      justifyContent={'center'}
      sx={{ marginTop: '1rem' }}
    >
      <Grid
        item
        xs={12}
        md={8}
      >
        <Typography
          variant="h4"
          sx={{ textAlign: 'center' }}
        >
          Дедлайн, уточните когда заявка будет неактуальна? (можно изменить)
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
      >
        <Grid
          container
          justifyContent={'center'}
          sx={{ marginTop: '1.5rem' }}
        >
          <Grid
            item
            xs={12}
            md={6}
          >
            <FormControl
              sx={{ marginBottom: '1rem' }}
              fullWidth
            >
              <TextField
                multiline
                id="duration"
                label="Дедлайн в днях"
                value={duration}
                onChange={(event) => setDuration(event.target.value)}
                fullWidth
              />
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FinalStep;
