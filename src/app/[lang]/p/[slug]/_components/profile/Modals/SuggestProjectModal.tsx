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
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { TRole } from '@/types/entity';
import { getPartyList, getUserRoles } from '@/api/client/account';
import { inviteToParty } from '@/api/client/party';
import { TPartyListItem } from '@/types/party';

type TSuggestProjectModalProps = {
  open: boolean;
  onClose: () => void;
  userId: number;
};

type TSuggestProjectFormData = {
  user_id: number;
  role_id: string;
  party_id: string | number;
  time: number;
  info: string;
};

type TSuggestProjectError = {
  role: boolean;
  party: boolean;
  time: boolean;
  info: boolean;
};

const SuggestProjectModal = (props: TSuggestProjectModalProps) => {
  const { open, onClose } = props;
  const context = useGlobalState();
  const [roles, setRoles] = useState<TRole[]>(context.teamRoles);
  const [parties, setParties] = useState<TPartyListItem[]>([] as TPartyListItem[]);
  const [formData, setFormData] = useState<TSuggestProjectFormData>({
    user_id: props.userId,
  } as TSuggestProjectFormData);
  const [error, setError] = useState<TSuggestProjectError>({} as TSuggestProjectError);

  useEffect(() => {
    if (Object.keys(context.teamRoles).length === 0) {
      getUserRoles().then((data: TRole[] | undefined) => {
        if (data) {
          setRoles(data);
          context.setTeamRoles(data);
        }
      });

      getPartyList().then((data: TPartyListItem[] | undefined) => {
        if (data) {
          setParties(data);
        }
      });
    }
  }, []);

  const handleSuggestProject = () => {
    if (!formData.role_id || !formData.party_id || !formData.time || !formData.info) {
      if (!formData.role_id) {
        setError((prevState) => ({ ...prevState, role: true }));
      }
      if (!formData.party_id) {
        setError((prevState) => ({ ...prevState, party: true }));
      }
      if (!formData.time) {
        setError((prevState) => ({ ...prevState, time: true }));
      }
      if (!formData.info) {
        setError((prevState) => ({ ...prevState, info: true }));
      }
      return;
    }

    inviteToParty(formData).then((res: { success: boolean }) => {
      console.log('test', res);
      if (res.success) {
        onClose();
      }
    });
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
                  <InputLabel id="demo-simple-select-label">Роль</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    label={'Select role'}
                    id={'user-role'}
                    value={formData.role_id ?? ''}
                    error={error.role}
                    onChange={(e) => {
                      if (error.role) {
                        setError((prevState) => ({ ...prevState, role: false }));
                      }
                      setFormData((prevState) => ({ ...prevState, role_id: e.target.value }));
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
                  <InputLabel id="demo-simple-select-label">Проект</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    label={'Select party'}
                    id={'party'}
                    value={formData.party_id ?? ''}
                    error={error.party}
                    onChange={(e) => {
                      if (error.party) {
                        setError((prevState) => ({ ...prevState, party: false }));
                      }
                      setFormData((prevState) => ({ ...prevState, party_id: e.target.value }));
                    }}
                  >
                    {parties.length === 0 ? (
                      <MenuItem
                        disabled
                        value=""
                      >
                        Вы не участвуете ни в одном проекте
                      </MenuItem>
                    ) : (
                      parties.map((party) => (
                        <MenuItem
                          key={party.id}
                          value={party.id}
                        >
                          {party.title}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                item
                xs={12}
              >
                <FormControl fullWidth>
                  <TextField
                    id="time"
                    label="Часов в месяц"
                    type={'number'}
                    value={formData.time === 0 ? '' : formData.time}
                    error={error.time}
                    onChange={(e) => {
                      if (error.time) {
                        setError((prevState) => ({ ...prevState, time: false }));
                      }
                      setFormData((prevState) => ({ ...prevState, time: Number(e.target.value) }));
                    }}
                    fullWidth
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={12}
              >
                <FormControl fullWidth>
                  <TextField
                    multiline={true}
                    label="Дополнительная информация"
                    fullWidth
                    margin="normal"
                    value={formData.info || ''}
                    error={error.info}
                    onChange={(e) => {
                      if (error.info) {
                        setError((prevState) => ({ ...prevState, info: false }));
                      }
                      setFormData((prevState) => ({ ...prevState, info: String(e.target.value) }));
                    }}
                  />
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
