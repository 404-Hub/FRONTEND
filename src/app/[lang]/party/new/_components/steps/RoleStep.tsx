'use client';

import { FormControl, Grid, Paper, Typography } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import TextField from '@mui/material/TextField';
import DynamicIcon from '@/app/[lang]/party/new/_components/steps/DynamicIcon';

type RoleStepProps = {
  rolesInfo: Record<string, any>[];
  role: string;
  setRole: Dispatch<SetStateAction<string>>;
  hours: number;
  setHours: Dispatch<SetStateAction<number>>;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
};

const RoleStep = (props: RoleStepProps) => {
  const { rolesInfo, role, setRole, hours, setHours, setDescription, description } = props;

  const handleClick = (roleId: string) => {
    setRole(roleId);
  };

  return (
    <>
      <Grid
        container
        justifyContent={'center'}
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
            Какую роль ты хочешь выполнять?
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent={'center'}
        sx={{ marginTop: '3rem' }}
      >
        <Grid
          item
          xs={12}
        >
          <Grid
            container
            spacing={2}
          >
            {rolesInfo.map((item) => (
              <Grid
                key={item.id}
                item
                md={2}
                xs={6}
              >
                <Paper
                  onClick={() => handleClick(item.id.toString())}
                  className={role === item.id.toString() ? 'isActive' : ''}
                  square
                  elevation={7}
                  key={item.id}
                  sx={{
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '1rem',
                    width: '168px',
                    height: '164px',
                    padding: '1rem',
                    marginBottom: '1rem',
                    borderRadius: '8px',
                    '&.isActive': {
                      backgroundColor: '#E9FFEF',
                      border: '3px solid #2FC362',
                    },
                  }}
                >
                  <DynamicIcon iconName={item.icon} />
                  <Typography
                    variant="body1"
                    sx={{ fontSize: '16px' }}
                  >
                    {item.title}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ marginTop: '1.5rem' }}
        >
          <FormControl
            sx={{ marginBottom: '1rem' }}
            fullWidth
          >
            <TextField
              id="description"
              label="Описание"
              multiline
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              fullWidth
            />
          </FormControl>
          <FormControl
            sx={{ marginBottom: '1rem' }}
            fullWidth
          >
            <TextField
              id="hours"
              label="Часов в месяц"
              type={'number'}
              value={hours === 0 ? '' : hours}
              onChange={(event) => setHours(Number(event.target.value))}
              fullWidth
            />
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};

export default RoleStep;
