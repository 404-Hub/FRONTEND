'use client';

import useGlobalState from '@/lib/hooks/useGlobalState';
import {
  Modal,
  Box,
  Typography,
  FormControl,
  MenuItem,
  Select,
  CardContent,
  Grid,
  Card,
  InputLabel,
  Button,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { TRole } from '@/types/entity';
import { getPartyList, getUserRoles } from '@/api/client/account';

type TSuggestProjectModalProps = {
  open: boolean;
  onClose: () => void;
  userId: number;
};

type TSuggestProjectFormData = {
  user_id: number;
  role: string;
  party: string | number;
};

type TParty = {
  id: number;
  title: string;
};

const SuggestProjectModal = (props: TSuggestProjectModalProps) => {
  const { open, onClose } = props;
  const context = useGlobalState();
  const [roles, setRoles] = useState<TRole[]>(context.teamRoles);
  const [parties, setParties] = useState<TParty[]>([] as TParty[]);
  const [formData, setFormData] = useState<TSuggestProjectFormData>({
    user_id: props.userId,
  } as TSuggestProjectFormData);

  useEffect(() => {
    if (Object.keys(context.teamRoles).length === 0) {
      getUserRoles().then((data) => {
        if (data) {
          setRoles(data);
          context.setTeamRoles(data);
        }
      });

      getPartyList().then((data) => {
        if (data) {
          setParties(data);
        }
      });
    }
  }, []);

  const initialFormData = {};

  const handleSuggestProject = () => {
    console.log('Form data', formData);
    console.log('Suggest project');
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="suggest-project-modal-title"
      aria-describedby="suggest-project-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ mb: 2 }}
        >
          Предложить проект
        </Typography>

        <Card>
          <CardContent>
            <Grid
              container
              spacing={2}
              rowSpacing={2}
            >
              <Grid
                item
                xs={12}
              >
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Select role</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    label={'Select role'}
                    id={'user-role'}
                    value={formData.role ?? ''}
                    onChange={(e) => {
                      setFormData((prevState) => ({ ...prevState, role: e.target.value }));
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
                  <InputLabel id="demo-simple-select-label">Select party</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    label={'Select party'}
                    id={'party'}
                    value={formData.party ?? ''}
                    onChange={(e) => {
                      setFormData((prevState) => ({ ...prevState, party: e.target.value }));
                    }}
                  >
                    {parties.map((party) => (
                      <MenuItem
                        key={party.id}
                        value={party.id}
                      >
                        {party.title}
                      </MenuItem>
                    ))}
                  </Select>
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
                    handleSuggestProject();
                  }}
                >
                  Предложить
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
};

export default SuggestProjectModal;
