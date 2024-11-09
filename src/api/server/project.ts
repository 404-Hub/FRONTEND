import fetchServer from '@/lib/fetch-server';

export const getProjects = async (query: string) => {
  try {
    const response = await fetchServer({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/projects?query=${query}`,
    });
    if (!response.ok) throw response;

    const projects = await response.json();

    return projects.data;
  } catch (error) {
    // res.status(500).json({ error: 'GetCategoriesError' });
  }
};

export const getProject = async (projectId: string) => {
  try {
    const response = await fetchServer({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/projects/${projectId}`,
    });
    if (!response.ok) throw response;

    const project = await response.json();

    return project.data;
  } catch (error) {
    console.log(error);
  }
};
