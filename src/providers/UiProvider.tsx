'use client';

import { FC, PropsWithChildren } from 'react';
import {
  experimental_extendTheme as extendTheme,
  Experimental_CssVarsProvider as CssVarsProvider,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export const theme = extendTheme();

export const UiProvider: FC<PropsWithChildren> = ({
  children,
}) => (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      {children}
    </CssVarsProvider>
);
