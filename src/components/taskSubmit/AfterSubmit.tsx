'use client';

import { Paper, Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { TTaskSubmitingAfterClickProps } from '@/types/taskSubmit';
import { useEffect, useState } from 'react';
import { textAfterSubmitClick } from './textForTaskSubmit';

const TaskSubmitingAfterClick = (props: TTaskSubmitingAfterClickProps) => {
  const { isValid, submiting } = props;
  const [actualText, setActualText] = useState<string[]>();

  const router = useRouter();

  useEffect(() => {
    const { positive, negative } = textAfterSubmitClick;
    const relevantStrings = Object.values(isValid ? positive : negative);
    setActualText(relevantStrings);
  }, []);

  return (
    <Paper
      sx={{
        backgroundColor: '#F9FAFB',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '78vh',
        maxWidth: { xs: '100%', md: '70%' },
        marginX: 'auto',
        padding: 2,
      }}
    >
      <Box
        sx={{
          display: {
            xs: 'block',
            md: 'none',
          },
        }}
      >
        {actualText?.map((string) => (
          <Typography
            key={string}
            sx={{ paddingY: 1 }}
          >
            {string}
          </Typography>
        ))}
      </Box>
      <Box
        sx={{
          display: {
            xs: 'none',
            md: 'flex',
          },
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'start',
          height: '100%',
          textIndent: '5%',
        }}
      >
        <Typography
          variant="h4"
          align="center"
          fontWeight={800}
          marginBottom={3}
          width="100%"
        >
          {textAfterSubmitClick.positive.thanks}
        </Typography>
        <Typography paragraph>{textAfterSubmitClick.positive.notification}</Typography>
        <Typography paragraph>{textAfterSubmitClick.positive.newProjectpropose}</Typography>
      </Box>
      <Button
        variant="outlined"
        color="success"
        sx={{ textTransform: 'none', fontWeight: 200 }}
        fullWidth
        onClick={() => {
          if (isValid) router.push('/categories');
          else submiting();
        }}
      >
        {isValid ? textAfterSubmitClick.buttonText.positive : textAfterSubmitClick.buttonText.negative}
      </Button>
    </Paper>
  );
};

export default TaskSubmitingAfterClick;
