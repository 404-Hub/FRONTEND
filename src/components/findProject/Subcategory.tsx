'use client';

import { Box, Button } from '@mui/material';
import React from 'react';
import findPageStyles from '../../styles/findProjectStyles/pageStyles';

type Props = {
  handleClick: (value: string) => void;
}
const Subcategory: React.FC<Props> = (props) => (
    <Box sx={findPageStyles.addOptions}>
      <Button sx={[findPageStyles.buttons, findPageStyles.fromSvyat]} onClick={() => props.handleClick('training')}>
        Тренировочный
      </Button>
      <Button sx={[findPageStyles.buttons, findPageStyles.fromSvyat]} onClick={() => props.handleClick('advanced')}>
        Продвинутый
      </Button>
      <Button sx={[findPageStyles.buttons, findPageStyles.fromSvyat]} onClick={() => props.handleClick('complex')}>
        Комплексный
      </Button>
    </Box>
);

export default Subcategory;
