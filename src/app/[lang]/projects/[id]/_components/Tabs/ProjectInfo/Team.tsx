import { Avatar, AvatarGroup, Card, CardContent, Typography } from '@mui/material';

type TTeamProps = {
  project: any;
};

const Team = (props: TTeamProps) => {
  const { project } = props;
  return (
    <Card>
      <CardContent>
        <Typography variant="h4">Команда</Typography>
        <AvatarGroup>
          {project.team.map((member: any) => (
            <Avatar
              key={member.id}
              alt={member.name}
              src={member.avatar}
            />
          ))}
        </AvatarGroup>
      </CardContent>
    </Card>
  );
};

export default Team;
