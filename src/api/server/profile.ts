import fetchServer from '@/lib/fetch-server';

export const getProfileBySlug = async (slug: string) => {
  try {
    const response = await fetchServer({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/profile/${slug}`,
    });
    if (!response.ok) throw response;

    const app = await response.json();

    return app.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getProfileProjects = async (userId: number) => {
  try {
    const response = await fetchServer({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/profile/projects/${userId}`,
    });
    if (!response.ok) throw response;

    const projects = await response.json();

    return projects.data;
  } catch (error) {
    console.log(error);
  }
};
