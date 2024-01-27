'use client';

import { Box, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import findPageStyles from '@/styles/findProjectStyles/pageStyles';
import { publicSans } from '@/utils/fonts';
import Subcategory from '@/components/findProject/Subcategory';

export default function Categories() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  const onHandleClick = () => {
    setVisible(!visible);
  };

  const handleClick = (value: string) => {
    router.push(`/find-project/foundProjects?value=${value}`);
  };

  return (
    <Box sx={findPageStyles.optionsContainer}>
      <Box sx={findPageStyles.mainOptions}>
        <Button
          className={publicSans.className}
          fullWidth
          onClick={() => handleClick('subscribers')}
          sx={[findPageStyles.buttons, findPageStyles.subscribes]}
        >
          От подписчиков
        </Button>
        <Button
          sx={[findPageStyles.buttons, findPageStyles.fromSvyat]}
          onClick={onHandleClick}
        >
          От Свята
        </Button>
        <Button
          sx={[findPageStyles.buttons, findPageStyles.bests]}
          onClick={() => handleClick('bests')}>
          Лучшие
        </Button>
        <Button
          onClick={() => handleClick('changeInfo')}
          sx={[findPageStyles.buttons, findPageStyles.changeInfo]}
        >
          Изменить данные
        </Button>
      </Box>
      {visible ? (
       <Subcategory handleClick={handleClick} />
      ) : (null)}
    </Box>);
}
