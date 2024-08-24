'use client';

import React, { useEffect, useState } from 'react';
import { getMyApps } from '@/api/client/apps';
import ProjectCard from '@/app/[lang]/__find-project/_components/ProjectCard';
import { TProject } from '@/types/findProjects';
import { Button, Box } from '@mui/material';
import { useRouter } from 'next/navigation';

export const TasksList = () => {
  const [apps, setApps] = useState<TProject[]>([]);
  const router = useRouter();

  useEffect(() => {
    getMyApps().then((appsData: TProject[]) => {
      if (typeof appsData === 'undefined') {
        return;
      }
      setApps(appsData);
    });
  }, []);

  return (
    <>
      {apps.length > 0 ? (
        apps.map((app) => (
          <ProjectCard
            key={app.id}
            project={{
              upvotes: app?.upvotes,
              downvotes: app.downvotes,
              rating: (app.upvotes - app.downvotes).toString(),
              id: app.id,
              title: app.title,
              description: app.description,
            }}
          />
        ))
      ) : (
        <Box sx={{ textAlign: 'center', marginTop: 4 }}>
          <p>
            {/* Ой! Ваш список задач пуст. Почему бы не добавить первую задачу? */}
            Упс! Похоже, у вас пока нет задач. Как насчет того, чтобы взять что-то на себя?
            {/* Нет задач? Давайте это исправим! Добавьте что-нибудь к вашему списку. */}
          </p>
          <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant={'contained'}
              sx={{ flexGrow: 1 }}
              onClick={() => router.push('/categories')}
            >
              Найти проект
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};
