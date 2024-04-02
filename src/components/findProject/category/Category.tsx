import {
  Box,
  Grid,
} from '@mui/material';
import type { TCategoryProps } from '@/types/findProjects';
import { CategoryCard } from '@/components/findProject/category/CategoryCard';

export default function Category(props: TCategoryProps) {
  const { categories } = props;

  return (
        <Box>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {categories.map((category) => (
                    <CategoryCard
                        category={category}
                        onCategorySelect={props.onCategorySelect}
                        setCurrentCategory={props.setCurrentCategory}
                        key={category.id}
                    />
                ))}
                <CategoryCard
                    category={{ id: 'popular', name: 'Лучшие', children: [] }}
                    onCategorySelect={props.onCategorySelect}
                    setCurrentCategory={props.setCurrentCategory}
                />
                <CategoryCard
                    category={{ id: 'new', name: 'Новые', children: [] }}
                    onCategorySelect={props.onCategorySelect}
                    setCurrentCategory={props.setCurrentCategory}
                />
            </Grid>
        </Box>);
}
