import fetchServer from '@/lib/fetch-server';

export const getRoles = async () => {
  try {
    const response = await fetchServer({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/roles`,
    });
    if (!response.ok) throw response;

    const roles = await response.json();

    return roles.data;
  } catch (error) {
    // res.status(500).json({ error: 'GetCategoriesError' });
  }
};
