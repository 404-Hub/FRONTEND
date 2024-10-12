import { Paper } from '@mui/material';

export default function ProjectDescription({ project }: { project: any }) {
  return (
    <Paper
      sx={{ marginBottom: 4 }}
      elevation={8}
    >
      <h2>Описание проекта</h2>
      <h3>Для кого</h3>
      <div> {project.idea.additional_info}</div>
      <h3>Details</h3>
      <div>{project.idea.description}</div>
    </Paper>
  );
}
