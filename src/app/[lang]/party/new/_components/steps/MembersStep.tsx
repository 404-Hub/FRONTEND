import { Box, FormControl, Grid, Typography, Paper } from '@mui/material';
import type { Dispatch, SetStateAction } from 'react';
import { Info } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

type MembersStepProps = {
  rolesInfo: Record<string, any>[];
  roles: string[];
  setRoles: Dispatch<SetStateAction<string[]>>;
  requirements: string;
  setRequirements: Dispatch<SetStateAction<string>>;
};

const MembersStep = (props: MembersStepProps) => {
  const { rolesInfo, roles, setRoles, requirements, setRequirements } = props;

  const handleClick = (roleId: string) => {
    if (roles.includes(roleId)) {
      setRoles(roles.filter((item) => item !== roleId));
    } else {
      setRoles([...roles, roleId]);
    }
  };

  const handleRemove = (roleId: number) => {
    const newArr = [...roles];
    const index = newArr.indexOf(roleId.toString());
    newArr.splice(index, 1);
    setRoles(newArr);
  };

  const handleAdd = (roleId: number) => {
    setRoles([...roles, roleId.toString()]);
  };

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
          Кого ты хочешь видеть в команде?
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
          >
            <Grid
              container
              spacing={2}
            >
              {rolesInfo.map((item) => (
                <Grid
                  key={item.id}
                  item
                  xs={2}
                >
                  <Paper
                    onClick={() => handleClick(item.id.toString())}
                    className={roles.includes(item.id.toString()) ? 'isActive' : ''}
                    square
                    elevation={7}
                    key={item.id}
                    sx={{
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
                    {item.component ? <item.component /> : <Info />}
                    <Typography
                      variant="body1"
                      sx={{ fontSize: '16px' }}
                    >
                      {item.title}
                    </Typography>
                    {roles.includes(item.id.toString()) && (
                      <Box
                        width={'80%'}
                        display={'flex'}
                        flexDirection={'row'}
                        justifyContent={'space-between'}
                      >
                        <RemoveIcon
                          sx={{ cursor: 'pointer' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemove(item.id);
                          }}
                        />
                        <Typography
                          variant="body1"
                          sx={{ fontSize: '16px' }}
                        >
                          {roles.filter((v) => v === item.id.toString()).length}
                        </Typography>
                        <AddIcon
                          sx={{ cursor: 'pointer' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAdd(item.id);
                          }}
                        />
                      </Box>
                    )}
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
          >
            <Typography
              variant="h4"
              sx={{ textAlign: 'center' }}
            >
              Что ждешь от членов команды?
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{ marnigTop: '1rem' }}
          >
            <FormControl
              sx={{ marginBottom: '1rem' }}
              fullWidth
            >
              <TextField
                multiline
                id="description"
                label="Описание"
                value={requirements}
                onChange={(event) => setRequirements(event.target.value)}
                fullWidth
              />
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MembersStep;
