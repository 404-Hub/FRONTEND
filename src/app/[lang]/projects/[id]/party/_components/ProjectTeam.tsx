import { Box, Button, Paper, Typography } from '@mui/material';
import Link from 'next/link';

type TProjectTeamMember = {
  id: number;
  user: any;
  role: string;
};

export default function ProjectTeam({ party }: any) {
  const { partyMembers, project } = party;
  const { creator } = project;

  const filteredMembers = partyMembers.filter((member: TProjectTeamMember) => member.user?.id !== creator.id);

  return (
    <Paper
      sx={{ marginBottom: 4, padding: '1.5rem' }}
      elevation={8}
    >
      <div>
        <Typography
          variant="h6"
          sx={{ paddingBottom: '1.5rem' }}
        >
          Project Team
        </Typography>
        {filteredMembers.map((member: TProjectTeamMember) => (
          <Box
            key={member.id}
            sx={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'space-between',
              backgroundColor: '#F4F6F8',
              marginBottom: '1rem',
              borderRadius: '8px',
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontSize: '1rem', paddingLeft: '1.5rem', padding: '1rem' }}
            >
              {member.role} {member.user?.id}
            </Typography>
            <Box sx={{ flex: 1, padding: '1rem' }}>
              <Link href="#">
                <Typography
                  component="span"
                  sx={{
                    color: 'blue',
                    '&:hover': {
                      cursor: 'pointer',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Who is that?
                </Typography>
              </Link>
            </Box>
            {!member.user && (
              <Button
                sx={{
                  backgroundColor: '#18A670',
                  color: '#FFFFFF',
                  width: '3.3rem',
                  height: '2.25rem',
                  top: '0.75rem',
                  right: '0.75rem',
                  borderRadius: '0.375rem',
                  padding: '0.375rem 0.75rem 0.375rem 0.75rem',
                  gap: '1rem',
                  '&:hover': {
                    backgroundColor: 'purple',
                  },
                }}
              >
                Join
              </Button>
            )}
          </Box>
        ))}
      </div>
    </Paper>
  );
}
