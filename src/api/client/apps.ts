import fetchClient from '@/lib/fetch-client';

export const getApps = async (page: number, category: string | null) => {
  try {
    const response = await fetchClient({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/apps?page=${page}&category=${category}`,
    });
    if (!response.ok) throw response;

    const apps = await response.json();

    return apps.data;
  } catch (error) {

    // res.status(500).json({ error: 'GetCategoriesError' });
  }
};
