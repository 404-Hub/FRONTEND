'use client';

import { useSession } from 'next-auth/react';
import Box from '@mui/material/Box';
import { usePathname } from 'next/navigation';
import {
  FC, useMemo,
} from 'react';
import HeaderDesktop from '@/components/layout/navigation/HeaderDesktop';
import HeaderMobile from '@/components/layout/navigation/HeaderMobile';

export type HeaderLink = {
    label: string;
    value: string;
};

const pathToLinkSlugMap: Record<HeaderLink['value'], string> = {
  '/': 'main',
  '/tasks': 'myTasks',
  '/categories': 'findProject',
  '/projects/new': 'proposeIdea',
  '/find-project/subscribers': 'subscribers',
};

export const Navigation: FC = () => {
  const pathname = usePathname();
  const session = useSession();

  const activeLink = useMemo(() => pathToLinkSlugMap[pathname], [pathname]);

  const links = useMemo<HeaderLink[]>(
    () => [
      {
        label: 'Главная',
        value: 'main',
      },
      {
        label: 'Мои задачи',
        value: 'myTasks',
      },
      {
        label: 'Найти проект',
        value: 'findProject',
      },
      ...(session.status === 'authenticated'
        ? [
          {
            label: 'Предложить идею для проекта',
            value: 'proposeIdea',
          },
        ]
        : []),
    ],
    [session],
  );

  return (
        <Box>
            <HeaderDesktop
                activeLink={activeLink}
                links={links}
                pathToLinkSlugMap={pathToLinkSlugMap}
            />
            <HeaderMobile activeLink={activeLink} links={links} pathToLinkSlugMap={pathToLinkSlugMap}/>
        </Box>
  );
};
