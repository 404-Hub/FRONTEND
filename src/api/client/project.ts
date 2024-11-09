import fetchClient from '@/lib/fetch-client';

export const createProject = async (data: { idea_id: string }) => {
  try {
    const response = await fetchClient({
      method: 'POST',
      url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/projects`,
      body: JSON.stringify(data),
    });
    if (!response.ok) throw response;

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const closeProject = async (projectId: string) => {
  try {
    const response = await fetchClient({
      method: 'PUT',
      url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/projects/${projectId}/close`,
    });
    if (!response.ok) throw response;

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const updateProjectStatus = async (projectId: string, status: string) => {
  try {
    const response = await fetchClient({
      method: 'PUT',
      url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/projects/${projectId}/status`,
      body: JSON.stringify({ status }),
    });
    if (!response.ok) throw response;

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
