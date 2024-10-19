import { Avatar, AvatarGroup, Card, CardContent, Typography } from '@mui/material';

type TAuthorProps = {
  project: any;
};

const Author = (props: TAuthorProps) => {
  const { project } = props;
  return (
    <Card>
      <CardContent>
        <Typography variant="h4">Автор</Typography>
        <AvatarGroup>
          <Avatar
            alt={project.author.name}
            src={project.author.avatar}
          />
        </AvatarGroup>
      </CardContent>
    </Card>
  );
};

export default Author;
