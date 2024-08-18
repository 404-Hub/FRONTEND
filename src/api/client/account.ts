import fetchClient from '@/lib/fetch-client';

interface TChangePasswordData {
  password: string;
  newPassword: string;
  confirm: string;
}

export const changePassword = async (data: TChangePasswordData) => {
  try {
    const response = await fetchClient({
      method: 'POST',
      url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/account/change-password`,
      body: JSON.stringify(data),
    });
    if (!response.ok) throw response;

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
