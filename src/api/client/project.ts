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
