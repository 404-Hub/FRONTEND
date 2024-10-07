import fetchClient from '@/lib/fetch-client';
import { TProfile, TRole } from '@/types/entity';

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

export const getUserRoles = async () => {
  try {
    const response = await fetchClient({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/roles`,
    });
    if (!response.ok) throw response;

    const resp = await response.json();

    return resp.data as Promise<TRole[]>;
  } catch (error) {
    console.log(error);
  }
};

export const getUserProfile = async () => {
  try {
    const response = await fetchClient({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/user/profile`,
    });
    if (!response.ok) throw response;

    return (await response.json()) as Promise<TProfile>;
  } catch (error) {
    console.log(error);
  }
};

export const saveUserProfile = async (data: any) => {
  try {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key === 'avatar' && typeof data[key] === 'string') {
        return;
      }
      formData.append(key, data[key]);
    });

    console.log('formData', formData);

    const response = await fetchClient({
      method: 'POST',
      url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/user/profile`,
      body: formData,
    });
    if (!response.ok) throw response;

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getPartyList = async () => {
  try {
    const response = await fetchClient({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/user/party/list`,
    });
    if (!response.ok) throw response;

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
