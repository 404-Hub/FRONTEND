import fetchClient from '@/lib/fetch-client';
import { ActualFilter } from '@/types/findProjects';

export const getIdeas = async (page: number, category: string, filters?: Record<string, string[]>) => {
  try {
    const params: Record<string, string[]> = { ...filters, page: [page.toString()], category_id: [category] };

    const queryString = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join('&');

    const response = await fetchClient({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/ideas?${queryString}`,
    });
    if (!response.ok) throw response;

    const ideas = await response.json();

    return ideas.data;
  } catch (error) {
    // res.status(500).json({ error: 'GetCategoriesError' });
  }
};

export const getIdea = async (ideaId: number) => {
  try {
    const response = await fetchClient({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/ideas/${ideaId}`,
    });
    if (!response.ok) throw response;

    const app = await response.json();

    return app.data;
  } catch (error) {
    console.log(error);
  }
};

export const createIdea = async (data: {}) => {
  try {
    const response = await fetchClient({
      method: 'POST',
      url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/ideas`,
      body: JSON.stringify(data),
    });
    if (!response.ok) throw response;

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const assignApp = async (ideaId: number) => {
  try {
    const response = await fetchClient({
      method: 'POST',
      url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/ideas/assign/${ideaId}`,
    });
    if (!response.ok) throw response;

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getMyIdeas = async () => {
  try {
    const response = await fetchClient({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/user/ideas`,
    });
    if (!response.ok) throw response;

    const ideas = await response.json();

    return ideas.data;
  } catch (error) {
    console.log(error);
  }
};

export const voteIdea = async (id: string, type: 'up' | 'down') => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/ideas/vote/${type}/${id}`;
  const response = await fetchClient({
    method: 'POST',
    url,
  });
  if (!response.ok) {
    throw new Error(`Ошибка при голосовании: ${response.statusText}`);
  }
  return response.json();
};
