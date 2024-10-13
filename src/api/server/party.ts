import fetchServer from '@/lib/fetch-server';

export const getParty = async (projectId: string) => {
  try {
    const response = await fetchServer({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/projects/${projectId}/parties`,
    });
    if (!response.ok) throw response;

    const party = await response.json();

    console.log('party', party);
    return party.data;
  } catch (error) {
    console.log('error', error);
    // res.status(500).json({ error: 'GetCategoriesError' });
  }
};
