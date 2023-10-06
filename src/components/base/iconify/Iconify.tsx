import { forwardRef } from 'react';
import { Icon } from '@iconify/react';
import Box from '@mui/material/Box';
import { SX } from '../../../../types/sx';

export type IconifyProps = {
  sx?: SX;
  width?: string | number;
  icon: string;
};

export const Iconify = forwardRef<unknown, IconifyProps>(
  ({ icon, width = 20, sx, ...other }, ref) => (
    <Box
      ref={ref}
      component={Icon}
      icon={icon}
      sx={{ width, height: width, ...sx }}
      {...other}
    />
  )
);
