'use client';

import React, { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from 'react';
import { TCategory } from '@/types/findProjects';
import { TProfile, TRole } from '@/types/entity';

export type TGlobalContext = {
  categories: TCategory[];
  setCategories: Dispatch<SetStateAction<TCategory[]>>;
  userProfile: TProfile;
  setUserProfile: Dispatch<SetStateAction<TProfile>>;
  teamRoles: TRole[];
  setTeamRoles: Dispatch<SetStateAction<TRole[]>>;
};

export const GlobalContext = createContext<TGlobalContext>({
  categories: [],
  setCategories: () => {},
  userProfile: {} as TProfile,
  setUserProfile: () => {},
  teamRoles: [],
  setTeamRoles: () => {},
});

export default function ContextProvider({ children }: PropsWithChildren) {
  const [categories, setCategories] = useState([] as TCategory[]);
  const [userProfile, setUserProfile] = useState<TProfile>({} as TProfile);
  const [teamRoles, setTeamRoles] = useState<TRole[]>([]);

  const value = {
    categories,
    setCategories,
    userProfile,
    setUserProfile,
    teamRoles,
    setTeamRoles,
  };
  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
}
