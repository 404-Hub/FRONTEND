import { FC } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export const MainCover: FC = () => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        maxWidth: 500,
      }}
    >
      <Typography variant={'h4'}>
        Привет! Это 404Hub 🤖
      </Typography>
      <Typography variant={'body1'}>
        Здесь можно 🔎 найти или 🗃 предложить идею проекта.

        Расскажи какого сервиса тебе не хватает,
        а разработчик, которому нужны пет проекты и опыт в портфолио, поможет с реализацией.
      </Typography>
      <Box sx={{ display: 'flex' }}>
        <Button variant={'contained'} sx={{ flexGrow: 1 }}>
          Найти проект
        </Button>
        <Button sx={{ flexGrow: 1 }}>
          Предложить идею
        </Button>
      </Box>
    </Box>
);
