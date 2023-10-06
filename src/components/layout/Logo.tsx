import { FC } from 'react';
import Typography from '@mui/material/Typography';
import { SX } from '../../../types/sx';

export type LogoProps = {
  sx?: SX;
};

export const Logo: FC<LogoProps> = ({ sx }) => (
  <Typography
    variant="h6"
    sx={sx}
  >
    404 Hub
  </Typography>
);
