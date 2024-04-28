import fetchClient from '@/lib/fetch-client';
import { ActualFilter } from '@/types/findProjects';

export const getApps = async (page: number, category: string, filters?: ActualFilter[]) => {
  try {
    const params: Record<string, string> = { page: page.toString(), category };
    if (filters) {
      filters.forEach((filter) => {
        const {
          filterName, filterType, actualRadioOption, actualCheckboxOption,
        } = filter;
        const value = filterType === 'radio' ? actualRadioOption : actualCheckboxOption;
        if (!(filterName in params)) {
          params[filterName] = value;
        } else if (filterType !== 'radio') {
          params[filterName] = `${params[filterName]},${actualCheckboxOption}`;
        }
      });
    }

    const queryString = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join('&');

    const response = await fetchClient({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/apps?${queryString}`,
    });
    if (!response.ok) throw response;

    const apps = await response.json();

    return apps.data;
  } catch (error) {
    // res.status(500).json({ error: 'GetCategoriesError' });
  }
};

export const getApp = async (appId: number) => {
  try {
    const response = await fetchClient({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/apps/${appId}`,
    });
    if (!response.ok) throw response;

    const app = await response.json();

    return app.data;
  } catch (error) {
    console.log(error);
  }
};
