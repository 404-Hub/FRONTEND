'use client';

import React, { createContext, useContext, PropsWithChildren } from 'react';

type LocaleContextType = string;

const LocaleContext = createContext<LocaleContextType>('en');

export const useLocale = (): LocaleContextType => useContext(LocaleContext);

type LocaleProviderProps = {
  locale: LocaleContextType;
};

export const LocaleProvider:
  React.FC<PropsWithChildren<LocaleProviderProps>> = ({ children, locale }) => (
  <LocaleContext.Provider value={locale}>
    {children}
  </LocaleContext.Provider>
  );
