'use client';

import React, { createContext, PropsWithChildren, useState } from 'react';
import { TCategory } from '@/types/findProjects';

export const GlobalContext = createContext({});

export default function ContextProvider({ children }: PropsWithChildren) {
  const [categories, setCategories] = useState([] as TCategory[]);

  const value = {
    categories,
    setCategories,
  };
  return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
  );
}
