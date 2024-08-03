'use client';

import {
  Paper, Box, Typography, Button,
} from '@mui/material';
import { useState } from 'react';
import { TGithubAdd } from '@/types/taskSubmit';
import GithubInput from '../Atoms/GithubInput';
import { PAGE_TITLE_GIT, BACK, FATHER } from '../textForTaskSubmit';

const GithubAdd = (props: TGithubAdd) => {
  const { githubCheck, submiting } = props;

  const [isInputValid, setIsInputValid] = useState(true);

  return (
        <Paper
            sx={{
              backgroundColor: '#F9FAFB',
              display: 'flex',
              flexDirection: 'column',
              height: '78vh',
              maxWidth: { xs: '100%', md: '70%' },
              marginX: 'auto',
            }}
        >
            <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '90%',
                }}
            >
                <Typography
                    variant={'h4'}
                    sx={{ padding: 2, fontWeight: '500' }}
                >
                    {PAGE_TITLE_GIT}
                </Typography>
                <GithubInput
                    isInputValid={isInputValid}
                    setIsInputValid={setIsInputValid}
                />
                <Box
                    sx={{
                      backgroundColor: 'transparent',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingX: 1,
                      paddingTop: 2,
                      background: '#F9FAFB',
                      gap: 1,
                    }}
                >
                    <Button
                        variant="contained"
                        color="error"
                        sx={{ textTransform: 'none', fontWeight: 200 }}
                        onClick={submiting}
                        fullWidth
                    >
                        {BACK}
                    </Button>
                    <Button
                        variant="contained"
                        color="success"
                        sx={{ textTransform: 'none', fontWeight: 200 }}
                        onClick={() => {
                          if (isInputValid) githubCheck(true);
                        }}
                        fullWidth
                    >
                        {FATHER}
                    </Button>
                </Box>
            </Box>
        </Paper>
  );
};

export default GithubAdd;
