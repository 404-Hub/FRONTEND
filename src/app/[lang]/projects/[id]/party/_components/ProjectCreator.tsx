import { Paper } from '@mui/material';

export default function ProjectCreator({ project }: { project: any }) {
  return (
    <Paper
      sx={{ marginBottom: 4 }}
      elevation={8}
    >
      <div>
        <div>
          {/* left (avatar)  */}
          <img
            src=""
            alt=""
          />
        </div>
        <div>
          {/** right name, description and etc */}
          <div>
            <div>Name</div>
            <div>Profession</div>
          </div>
          <div>Descrioption</div>
          <div>Ready to work</div>
          <div>Ожидания</div>
        </div>
      </div>
    </Paper>
  );
}
