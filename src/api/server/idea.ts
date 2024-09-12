import fetchServer from '@/lib/fetch-server';
import type { TCategory } from '@/types/findProjects';

export const getCategories = async () => {
  try {
    const response = await fetchServer({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/ideas/categories`,
    });
    if (!response.ok) throw response;

    // @ts-ignore
    const categories: { success: boolean; data: TCategory[] } = await response.json();

    return categories.data;

    // response.status(200).json(categories);
  } catch (error) {
    // res.status(500).json({ error: 'GetCategoriesError' });
  }
};

export const getCategory = async (categoryId: string) => {
  try {
    const response = await fetchServer({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/categories/${categoryId}`,
    });
    if (!response.ok) throw response;

    const category = await response.json();

    return category.data;
  } catch (error) {
    // res.status(500).json({ error: 'GetCategoriesError' });
  }
};

export const getMyIdeas = async () => {
  try {
    const response = await fetchServer({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/user/ideas`,
    });
    if (!response.ok) throw response;

    const ideas = await response.json();

    return ideas.data;
  } catch (error) {
    // res.status(500).json({ error: 'GetCategoriesError' });
  }
};
