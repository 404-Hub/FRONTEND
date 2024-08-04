'use client';

import { useEffect, useState } from 'react';

export const useIsMobile = () => {
  const localWindow = typeof window !== 'undefined' ? window : null;

  const [width, setWidth] = useState<number | undefined>(localWindow?.innerWidth);

  function handleWindowSizeChange() {
    setWidth(localWindow?.innerWidth);
  }

  useEffect(() => {
    localWindow?.addEventListener('resize', handleWindowSizeChange);
    return () => {
      localWindow?.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  return width && width <= 768;
};
