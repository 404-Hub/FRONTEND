import { Typography, Box, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function ProjectHeader({ project }: { project: any }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
      <Typography
        variant="h4"
        sx={{ fontSize: '2.125rem', paddingTop: '1.5rem', paddingBottom: '1.5rem', fontWeight: 600 }}
      >
        {project.idea.title}
      </Typography>

      <Box sx={{ display: 'flex', gap: '1rem', marginLeft: 'auto' }}>
        <Button
          sx={{
            width: '44px',
            height: '44px',
            borderRadius: '8px',
            border: '1px solid #F4F6F8',
            background: '#FFFFFF',
            minWidth: 'auto',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <EditIcon sx={{ color: '#161C24' }} />
        </Button>
        <Button
          sx={{
            width: '44px',
            height: '44px',
            borderRadius: '8px',
            border: '1px solid #F4F6F8',
            background: '#FFFFFF',
            minWidth: 'auto',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CloseIcon sx={{ color: '#161C24' }} />
        </Button>
        <Button
          sx={{
            width: '44px',
            height: '44px',
            borderRadius: '8px',
            border: '1px solid #F4F6F8',
            background: '#FFFFFF',
            minWidth: 'auto',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ArrowForwardIcon sx={{ color: '#161C24' }} />
        </Button>
      </Box>
    </Box>
  );
}
