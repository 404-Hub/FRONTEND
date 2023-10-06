'use client';

import { PropsWithChildren } from 'react';
import { CssBaseline } from '@mui/material';
import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
  StyledEngineProvider,
} from '@mui/material/styles';
import { Shadows } from '@mui/material/styles/shadows';
import palette from './palette';
import shadows from './shadows';
import customShadows from './customShadows';
import componentsOverride from './overrides';

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette,
  shape: { borderRadius: 6 },
  shadows: {
    ...(shadows() as Shadows),
    ...customShadows(),
  },
});

theme.components = componentsOverride(theme);

export function ThemeProvider({ children }: PropsWithChildren) {
  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
