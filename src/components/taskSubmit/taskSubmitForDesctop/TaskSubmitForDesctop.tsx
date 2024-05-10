'use client';

import {
  Paper,
  Box,
  Typography,
  Button,
  FormControlLabel,
  FormGroup,
  Checkbox,
  Tooltip,
  Grid,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { PAGE_TITLE, GOOD, IS_ALL_READY, CANSEL, SUBMITING } from '../textForTaskSubmit';
import GithubInput from '../Atoms/GithubInput';
import { TTaskSubmitProps } from '@/types/taskSubmit';
import { textAfterSubmitClick } from '../textForTaskSubmit';
import { styled } from '@mui/material/styles';
import { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import TaskSubmitingAfterClick from '../AfterSubmit';

const TaskSubmitForDesctop = (props: TTaskSubmitProps) => {
  const { conditions, handleChangeCondition, isValidCond } = props;
  const [isInputValid, setIsInputValid] = useState(true);
  const [isActiveButton, setIsActiveButton] = useState(false);
  const [isAllOk, setIsAllOk] = useState(false);

  const router = useRouter();

  const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip
      {...props}
      classes={{ popper: className }}
    />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 500,
    },
  });

  useEffect(() => {
    setIsActiveButton(isInputValid && isValidCond);
  }, [isValidCond, isInputValid]);

  const handleSubmit = useCallback(() => {
    setIsAllOk(isActiveButton);
  }, [isActiveButton]);

  return (
    <Paper
      sx={{
        backgroundColor: '#F9FAFB',
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        height: '90vh',
        width: '70%',
        marginX: 'auto',
      }}
    >
      {!isAllOk ? (
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
              gap: 3,
            }}
          >
            <Typography>{`${GOOD}!`}</Typography>
            <Typography>{`${IS_ALL_READY}:`}</Typography>
            <FormGroup sx={{ gap: 2 }}>
              {Object.keys(conditions).map((condition) => {
                if (condition === 'Есть публичный git репозиторий') {
                  return (
                    <div key={condition}>
                      <FormControlLabel
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
                      <GithubInput
                        isInputValid={isInputValid}
                        setIsInputValid={setIsInputValid}
                        isVisible={conditions[condition]}
                      />
                    </div>
                  );
                }
                return (
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
                );
              })}
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
              {CANSEL}
            </Button>
            <CustomWidthTooltip
              title={
                <Grid
                  justifyContent="center"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                    padding: 2,
                    color: 'grey',
                  }}
                >
                  <Typography>{textAfterSubmitClick.negative.regret}</Typography>
                  <Typography>{textAfterSubmitClick.negative.add}</Typography>
                </Grid>
              }
            >
              <Grid
                sx={{
                  flexGrow: 1,
                  width: '100%',
                }}
              >
                <Button
                  variant="contained"
                  color="success"
                  sx={{ textTransform: 'none', fontWeight: 200 }}
                  disabled={!isActiveButton}
                  fullWidth
                  onClick={handleSubmit}
                >
                  {SUBMITING}
                </Button>
              </Grid>
            </CustomWidthTooltip>
          </Box>
        </Box>
      ) : (
        <TaskSubmitingAfterClick
          isValid={isAllOk}
          submiting={() => {
            setIsAllOk(false);
          }}
        />
      )}
    </Paper>
  );
};

export default TaskSubmitForDesctop;
