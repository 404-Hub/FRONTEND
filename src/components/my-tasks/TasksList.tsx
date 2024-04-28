'use client';

import React, { useEffect, useState } from 'react';
import { getMyApps } from '@/api/client/apps';
import ProjectCard from '@/components/findProject/ProjectCard';
import { TProject } from '@/types/findProjects';

export const TasksList = () => {
  const [apps, setApps] = useState<TProject[]>([]);
  useEffect(() => {
    getMyApps().then((appsData: TProject[]) => {
      setApps(appsData);
    });
  }, []);
  return (
      <>
        { apps.map((app) => (
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
        ))}
      </>

  );
};
