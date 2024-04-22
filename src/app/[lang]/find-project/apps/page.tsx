import AppsList from '@/components/findProject/AppsList';
import findPageStyles from '@/styles/findProjectStyles/pageStyles';
import { Options } from '@/types/findProjects';
import { Box } from '@mui/material';

function FoundProjects() {
  const options: Options = {
    subscribers: 'От Подписчиков',
    changeInfo: 'Изменить данные',
    bests: 'Лучшие',
    training: 'Тренировочный',
    advanced: 'Продвинутый',
    complex: 'Комплексный',
  };

  return (
    <Box sx={findPageStyles.mainContainer}>
      <AppsList />
    </Box>
  );
}

export default FoundProjects;
