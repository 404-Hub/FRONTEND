import { Box, Button, Paper } from '@mui/material';
import Link from 'next/link';

type TProjectTeamMember = {
  id: number;
  user: string | null;
  role: string;
};

type TProjectTeamProps = {
  partyMembers: TProjectTeamMember[];
};

export default function ProjectTeam({ partyMembers }: TProjectTeamProps) {
  return (
    <Paper
      sx={{ marginBottom: 4 }}
      elevation={8}
    >
      <div>
        <h2>Project Team</h2>
        {/* Flex */}
        {partyMembers.map((member) => (
          <Box
            key={member.id}
            sx={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'space-between',
            }}
          >
            <div>{member.role}</div>
            <Box sx={{ flex: 1 }}>
              <Link href="#">Who is that?</Link>
            </Box>
            {!member.user && <Button>Join</Button>}
          </Box>
        ))}
      </div>
    </Paper>
  );
}
