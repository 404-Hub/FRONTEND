import { Paper, Typography } from '@mui/material';

export default function ProjectDescription({ project }: { project: any }) {
  return (
    <Paper
      sx={{ marginBottom: 4, padding: '1.5rem 1.5rem 2rem 1.5rem' }}
      elevation={8}
    >
      <Typography
        variant="h6"
        sx={{ marginBottom: 1 }}
      >
        Описание проекта
      </Typography>
      <Typography
        variant="subtitle2"
        sx={{ fontSize: '1rem', paddingBottom: '0.5rem' }}
      >
        Для кого:
      </Typography>
      <div> {project.idea.additional_info}</div>
      <Typography
        variant="subtitle2"
        sx={{ fontSize: '1rem', padding: '0.5rem 0' }}
      >
        Details
      </Typography>
      <div>{project.idea.description}</div>
    </Paper>
  );
}
