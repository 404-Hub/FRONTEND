import { Card, CardContent, Typography } from '@mui/material';

type TDescriptionProps = {
  project: any;
};
const Description = (props: TDescriptionProps) => {
  const { project } = props;
  return (
    <Card
      sx={{
        flex: 1,
        maxWidth: {
          sm: '100%',
          md: '50%',
        },
      }}
    >
      <CardContent>
        <Typography variant="h4">Описание проекта</Typography>
        <Typography
          variant="h6"
          sx={{ mt: 2 }}
        >
          Для кого:
        </Typography>
        <Typography variant="body1">{project.idea.additional_info}</Typography>
        <Typography
          variant="h6"
          sx={{ mt: 2 }}
        >
          Детали:
        </Typography>
        <Typography variant="body1">{project.idea.description}</Typography>
      </CardContent>
    </Card>
  );
};

export default Description;
