'use client';

import { useContext, createContext, PropsWithChildren } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { theme } from '@/theme';

export type ViewportContextState = {
  smOrLess: boolean;
  smOrMore: boolean;
  mdOrLess: boolean;
  lgOrLess: boolean;
};

export const ViewportContext = createContext<ViewportContextState>({
  smOrLess: false,
  smOrMore: false,
  mdOrLess: false,
  lgOrLess: false,
});

export function ViewportProvider({ children }: PropsWithChildren) {
  const lgOrLess = useMediaQuery(theme.breakpoints.down('lg'));
  const mdOrLess = useMediaQuery(theme.breakpoints.down('md'));
  const smOrLess = useMediaQuery(theme.breakpoints.down('sm'));
  const smOrMore = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <ViewportContext.Provider
      value={{
        smOrLess,
        smOrMore,

        mdOrLess,
        lgOrLess,
      }}
    >
      {children}
    </ViewportContext.Provider>
  );
}

export const useViewport = () => useContext(ViewportContext);
