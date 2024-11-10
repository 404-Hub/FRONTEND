import fetchServer from '@/lib/fetch-server';

export const getParty = async (projectId: string) => {
  try {
    const response = await fetchServer({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/projects/${projectId}/parties`,
    });
    if (!response.ok) throw response;

    const party = await response.json();

    return party.data;
  } catch (error) {
    console.log('error', error);
    // res.status(500).json({ error: 'GetCategoriesError' });
  }
};

// will return party request for the current user
export const getPartyRequest = async (projectId: string) => {
  try {
    const response = await fetchServer({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/projects/${projectId}/parties/requests`,
    });
    if (!response.ok) throw response;

    const partyRequest = await response.json();
    return partyRequest.data;
  } catch (error) {
    console.log(error);
  }
};
