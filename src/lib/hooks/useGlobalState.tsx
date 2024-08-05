'use client';

import { useContext } from 'react';
import { GlobalContext, type TGlobalContext } from '@/providers/ContextProvider';

const useGlobalState = () => useContext(GlobalContext) as unknown as TGlobalContext;
export default useGlobalState;
