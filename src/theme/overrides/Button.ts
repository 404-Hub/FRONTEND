import { alpha, darken, Theme } from '@mui/material/styles';

export default function Button(theme: Theme) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            boxShadow: 'none',
          },
        },
        sizeLarge: {
          height: 48,
        },
        containedInherit: {
          color: theme.palette.grey[800],
          boxShadow: theme.shadows.z8,
          '&:hover': {
            backgroundColor: theme.palette.grey[400],
          },
        },
        containedPrimary: {
          boxShadow: theme.shadows.primary,
        },
        containedSecondary: {
          boxShadow: theme.shadows.secondary,
        },
        containedSuccess: {
          color: theme.palette.success.contrastText,
          boxShadow: theme.shadows.primary,
          '&:hover': {
            backgroundColor: darken(theme.palette.success.main, 0.2),
          },
        },
        outlinedInherit: {
          border: `1px solid ${alpha(theme.palette.grey[500], 0.32)}`,
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
        outlinedSuccess: {
          border: `1px solid ${theme.palette.success.main}`,
        },
        textInherit: {
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
      },
    },
  };
}
