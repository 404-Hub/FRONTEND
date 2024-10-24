import fetchClient from '@/lib/fetch-client';

export const getPartyRequests = async (ideaId: number) => {
  try {
    const response = await fetchClient({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/user/parties?ideaId=${ideaId}`,
    });

    if (!response.ok) throw response;

    return await response.json();
  } catch (error) {
    console.error('Error fetching party requests:', error);
    return null;
  }
};

export const getPartyById = async (id: number) => {
  try {
    const response = await fetchClient({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/user/parties/${id}`,
    });

    if (!response.ok) throw new Error('Ошибка получения данных');

    return await response.json();
  } catch (error) {
    console.error('Error fetching party by ID:', error);
    return null;
  }
};

export const storeParty = async (data: {}) => {
  try {
    const response = await fetchClient({
      method: 'POST',
      url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/user/parties`,
      body: JSON.stringify(data),
    });
    if (!response.ok) throw response;

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
