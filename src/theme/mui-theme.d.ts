import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Shadows extends Array<string> {
    z1?: string;
    z4?: string;
    z8?: string;
    z12?: string;
    z16?: string;
    z20?: string;
    z24?: string;
    primary?: string;
    info?: string;
    secondary?: string;
    success?: string;
    warning?: string;
    error?: string;
    card?: string;
    dialog?: string;
    dropdown?: string;
  }

  interface Theme {
    shadows: Shadows;
  }

  interface ThemeOptions {
    shadows?: Shadows;
  }
}
