import { Avatar, Paper } from '@mui/material';

export default function ProjectCreator({ party }: { party: any }) {
  const { project } = party;
  const { creator } = project;

  const creatorRequest = party.partyMembers.find((member: any) => member.user?.id === creator.id);

  return (
    <Paper
      sx={{ marginBottom: 4 }}
      elevation={8}
    >
      <div>
        <div>
          {/* left (avatar)  */}
          <Avatar
            alt="Remy Sharp"
            src={creator.profile?.avatar}
            sx={{ width: 24, height: 24 }}
          />
        </div>
        <div>
          {/** right name, description and etc */}
          <div>
            <div>{creator.name}</div>
            <div>{creator.profile?.role}</div>
          </div>
          <div>{creator.profile?.about}</div>
          <div>Ready to work:{creatorRequest?.time}</div>
          <div>Жду от команды: {party.requirements}</div>
        </div>
      </div>
    </Paper>
  );
}
