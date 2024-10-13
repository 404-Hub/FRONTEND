import { Avatar, Box, Grid, Paper, Typography } from '@mui/material';

export default function ProjectCreator({ party }: { party: any }) {
  const { project } = party;

  const { creator } = project;

  const creatorRequest = party.partyMembers.find((member: any) => member.user?.id === creator.id);

  return (
    <Paper
      sx={{ marginBottom: 4, padding: '1.5rem' }}
      elevation={8}
    >
      <Grid
        container
        spacing={0}
      >
        <Grid
          item
          xs={2}
          sx={{ display: 'flex', paddingRight: 0 }} //! Не могу убрать отступ
        >
          {/* left (avatar)  */}
          <Avatar
            alt="Remy Sharp"
            src={creator.profile?.avatar}
            sx={{ width: 56, height: 56, padding: 0 }}
          />
        </Grid>

        <Grid
          item
          xs={10}
        >
          {/** right name, description and etc */}
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '0.8rem' }}>
            <Typography
              variant="subtitle2"
              sx={{ fontSize: '1rem', marginRight: 1 }}
            >
              {creator.name}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ fontSize: '0.9rem', color: '#647380' }}
            >
              {creatorRequest.role}
            </Typography>
          </Box>
          <Typography variant="body2">{creator.profile?.role}</Typography>
          <Box
            sx={{
              backgroundColor: '#F4F6F8',
              padding: '0.5rem 0.5rem 0.5rem 1rem',
              borderRadius: '8px',
              marginBottom: '1.5rem',
            }}
          >
            “{creator.profile?.about}“
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
            <Typography
              variant="body1"
              sx={{ color: '#647380' }}
            >
              Готов уделять:
            </Typography>
            <Typography
              variant="body1"
              sx={{ marginLeft: 1 }}
            >
              {creatorRequest?.time}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
            <Typography
              variant="body1"
              sx={{ color: '#647380' }}
            >
              Жду от команды:
            </Typography>
            <Typography
              variant="body1"
              sx={{ marginLeft: 1 }}
            >
              {party.requirements}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
