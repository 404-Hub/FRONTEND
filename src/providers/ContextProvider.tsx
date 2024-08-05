'use client';

import React, { createContext, PropsWithChildren, useState } from 'react';
import { TCategory } from '@/types/findProjects';

export type TGlobalContext = {
    categories: TCategory[];
    // eslint-disable-next-line no-unused-vars
    setCategories: (categories: TCategory[]) => void;
};

export const GlobalContext = createContext<TGlobalContext>({
  categories: [],
  setCategories: () => {
  },
});

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
