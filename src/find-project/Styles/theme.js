const Theme = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1124,
      xl: 1536,
    },
  },
  typography: {
    htmlFontSize: 18.2857,
    h5: {
      lineHeight: 1.3335,
      fontWeight: 600,
      fontSize: '24px',
    },
    h6: {
      fontSize: '20px',
      lineHeight: 1.6,
      fontWeight: 600,
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
      },
    }
  },
}

export { Theme };