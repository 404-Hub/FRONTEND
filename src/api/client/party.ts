import fetchClient from '@/lib/fetch-client';

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

export const inviteToParty = async (data: {}) => {
  try {
    const response = await fetchClient({
      method: 'POST',
      url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/parties/requests/invite`,
      body: JSON.stringify(data),
    });
    if (!response.ok) throw response;

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
