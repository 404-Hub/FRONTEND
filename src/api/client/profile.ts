import fetchClient from '@/lib/fetch-client';

const getProfileBySlug = async (slug: string) => {
  try {
    const response = await fetchClient({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/profile/${slug}`,
    });
    if (!response.ok) throw response;

    const app = await response.json();

    return app.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export { getProfileBySlug };
