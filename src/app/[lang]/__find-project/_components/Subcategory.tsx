'use client';

import findPageStyles from '@/styles/findProjectStyles/pageStyles';
import { Box, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

const Subcategory = () => {
  const router = useRouter();
  const handleClick = (value: string) => {
    router.push(`/find-project/subcategories/foundProjects?value=${value}`);
  };

  return (<Box sx={findPageStyles.addOptions}>
    <Button sx={[findPageStyles.buttons, findPageStyles.fromSvyat]}
      onClick={() => handleClick('training')}>
      Тренировочный
    </Button>
    <Button sx={[findPageStyles.buttons, findPageStyles.fromSvyat]}
      onClick={() => handleClick('advanced')}>
      Продвинутый
    </Button>
    <Button sx={[findPageStyles.buttons, findPageStyles.fromSvyat]}
      onClick={() => handleClick('complex')}>
      Комплексный
    </Button>
  </Box>);
};

export default Subcategory;
