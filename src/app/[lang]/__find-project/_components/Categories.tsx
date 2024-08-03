'use client';

import { Container } from '@mui/material';
import { SubCategory } from '@/app/[lang]/__find-project/_components/category/SubCategory';
import { useCallback, useMemo, useState } from 'react';
import type { TCategory, TCategoryProps, TSetCategoryCallback } from '@/types/findProjects';
import Category from '@/app/[lang]/__find-project/_components/category/Category';
import { useRouter } from 'next/navigation';

function Categories(props: TCategoryProps) {
  const { categories } = props;
  const router = useRouter();

  const [currentCategory, setCurrentCategory] = useState<null | TCategory>(null);
  const setCategoryCallBack: TSetCategoryCallback = (category: TCategory | null) => {
    setCurrentCategory(category);
  };

  const onCategorySelect = useCallback(
    (category: TCategory) => {
      router.push(`/find-project/apps?value=${category.id}`);
    },
    [router],
  );

  const subCategory: TCategory = useMemo(() => {
    if (currentCategory === null) {
      return {} as TCategory;
    }
    return (
      categories.find((item) => parseInt(item.id, 10) === parseInt(currentCategory.id, 10))
      ?? ({} as TCategory)
    );
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
