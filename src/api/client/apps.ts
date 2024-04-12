import fetchClient from '@/lib/fetch-client';
import { GetAppsProps } from '@/types/findProjects';

export const getApps = async (props: GetAppsProps) => {
  const { page, category, filters } = props;
  try {
    let queryString = '?';
    filters
      ? filters.forEach((filter) => {
          const { filterName, filterType, actualCheckboxOptions, actualRadioOption } = filter;
          queryString = `${queryString === '?' ? '?' : queryString + '&'}${
            filterType === 'checkbox' ? filterName + '[]' : filterName
          }=${filterType === 'checkbox' ? [] : ''}${
            filterType === 'radio' ? actualRadioOption : actualCheckboxOptions.join('&') + '[]'
          }`;
        })
      : (queryString = '');
    const response = await fetchClient({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/apps?page=${page}&category=${category}${queryString}`,
    });
    if (!response.ok) throw response;

    const apps = await response.json();

    return apps.data;
  } catch (error) {
    // res.status(500).json({ error: 'GetCategoriesError' });
  }
};
