'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { FC, useMemo } from 'react';
import HeaderDesktop from '@/components/layout/navigation/HeaderDesktop';
import HeaderMobile from '@/components/layout/navigation/HeaderMobile';
import { Container } from '@mui/material';

export type HeaderLink = {
  label: string;
  value: string;
};

const pathToLinkSlugMap: Record<HeaderLink['value'], string> = {
  '/': 'main',
  '/tasks': 'myTasks',
  '/categories': 'findProject',
  '/ideas/new': 'proposeIdea',
  '/find-project/subscribers': 'subscribers',
};

export const Navigation: FC = () => {
  const pathname = usePathname();
  const session = useSession();

  const activeLink = useMemo(() => pathToLinkSlugMap[pathname], [pathname]);

  const links = useMemo<HeaderLink[]>(
    () => [
      // {
      //   label: 'Главная',
      //   value: 'main',
      // },
      // {
      //   label: 'Мои задачи',
      //   value: 'myTasks',
      // },
      {
        label: 'Найти проект',
        value: 'findProject',
      },
      {
        label: 'Предложить идею для проекта',
        value: 'proposeIdea',
      },
    ],
    [session]
  );

  return (
    <Container component={'header'}>
      <HeaderDesktop
        activeLink={activeLink}
        links={links}
        pathToLinkSlugMap={pathToLinkSlugMap}
      />
      <HeaderMobile
        activeLink={activeLink}
        links={links}
        pathToLinkSlugMap={pathToLinkSlugMap}
      />
    </Container>
  );
};
