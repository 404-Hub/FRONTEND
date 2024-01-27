import { Navigation } from '@/components/layout/Navigation';
import Breadcrams from '@/components/layout/breadcrumbs/Breadcrams';
import findPageStyles from '@/styles/findProjectStyles/pageStyles';
import { Box } from '@mui/material';
import { Options } from '@/types/findProjects';
import ProjectsAndFilters from '@/components/findProject/ProjectsAndFilters';

export default function Subcategories() {
  const options: Options = {
    subscribers: 'От Подписчиков',
    changeInfo: 'Изменить данные',
    bests: 'Лучшие',
    training: 'Тренировочный',
    advanced: 'Продвинутый',
    complex: 'Комплексный',
  };

  return (
    <>
      <Navigation />
      <Box sx={findPageStyles.mainContainer}>
        <Breadcrams options={options} />
        <ProjectsAndFilters options={options} />
      </Box>
    </>
  );
}
