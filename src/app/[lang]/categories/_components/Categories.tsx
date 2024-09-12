'use client';

import { Container } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { TCategory, TCategoryProps, TSetCategoryCallback } from '@/types/findProjects';
import { useRouter } from 'next/navigation';
import useGlobalState from '@/lib/hooks/useGlobalState';
import Category from './category/Category';
import { SubCategory } from './category/SubCategory';

function Categories(props: TCategoryProps) {
  const context = useGlobalState();
  const { categories } = props;
  useEffect(() => {
    if (context.categories.length === 0 && categories.length > 0) {
      context.setCategories(categories);
    }
  }, [categories, context, context.categories]);
  const router = useRouter();

  const [currentCategory, setCurrentCategory] = useState<null | TCategory>(null);
  const setCategoryCallBack: TSetCategoryCallback = (category: TCategory | null) => {
    setCurrentCategory(category);
  };

  const onCategorySelect = useCallback(
    (category: TCategory) => {
      router.push(`/categories/${category.id}`);
    },
    [router]
  );

  const subCategory: TCategory = useMemo(() => {
    if (currentCategory === null) {
      return {} as TCategory;
    }
    return categories.find((item) => parseInt(item.id, 10) === parseInt(currentCategory.id, 10)) ?? ({} as TCategory);
  }, [categories, currentCategory]);

  return (
    <Container>
      {currentCategory === null && (
        <Category
          categories={categories}
          onCategorySelect={onCategorySelect}
          setCurrentCategory={setCategoryCallBack}
        />
      )}
      {currentCategory !== null && (
        <SubCategory
          category={subCategory}
          onCategorySelect={onCategorySelect}
          setCurrentCategory={setCategoryCallBack}
        />
      )}
    </Container>
  );
}

export default Categories;
