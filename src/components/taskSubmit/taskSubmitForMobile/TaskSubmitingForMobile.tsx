'use client';

import {
  Paper,
  Box,
  Typography,
  Button,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { TTaskSubmitingProps } from '@/types/taskSubmit';
import {
  PAGE_TITLE, NO, YES, GOOD, IS_ALL_READY,
} from '../textForTaskSubmit';

const TaskSubmiting = (props: TTaskSubmitingProps) => {
  const {
    validation, submiting, conditions, handleChangeCondition, isValidCond,
  } = props;

  const router = useRouter();

  const handleValidate = useCallback(() => {
    validation(isValidCond);
  }, [isValidCond]);

  return (
        <Paper
            sx={{
              backgroundColor: '#F9FAFB',
              display: 'flex',
              flexDirection: 'column',
              height: '78vh',
              maxWidth: { xs: '100%' },
              marginX: 'auto',
            }}
        >
            <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '90%',
                }}
            >
                <Typography
                    variant={'h4'}
                    sx={{ padding: 2, fontWeight: '500' }}
                >
                    {PAGE_TITLE}
                </Typography>
                <Paper
                    sx={{
                      backgroundColor: '#F9FAFB',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      height: '100%',
                      overflowY: 'auto',
                      paddingLeft: 2,
                    }}
                >
                    <Typography>{`${GOOD}!`}</Typography>
                    <Typography>{`${IS_ALL_READY}:`}</Typography>
                    <FormGroup>
                        {Object.keys(conditions).map((condition) => (
                                <FormControlLabel
                                    key={condition}
                                    control={
                                        <Checkbox
                                            color="default"
                                            onChange={() => handleChangeCondition(condition)}
                                            size="small"
                                            checked={conditions[condition]}
                                        />
                                    }
                                    label={condition}
                                />
                        ))}
                    </FormGroup>
                </Paper>
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
                        onClick={() => router.back()}
                        fullWidth
                    >
                        {NO}
                    </Button>
                    <Button
                        variant="contained"
                        color="success"
                        sx={{ textTransform: 'none', fontWeight: 200 }}
                        onClick={() => {
                          handleValidate();
                          submiting();
                        }}
                        fullWidth
                    >
                        {YES}
                    </Button>
                </Box>
            </Box>
        </Paper>
  );
};

export default TaskSubmiting;
