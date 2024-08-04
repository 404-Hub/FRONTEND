import {
  Box,
  Grid,
} from '@mui/material';
import type { TCategoryProps } from '@/types/findProjects';
import { CategoryCard } from './CategoryCard';

export default function Category(props: TCategoryProps) {
  const { categories } = props;

  return (
        <Box sx={{ flexGrow: 1 }}>
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
                    category={{
                      id: 'popular', name: 'popular', title: 'Лучшие', children: [],
                    }}
                    onCategorySelect={props.onCategorySelect}
                    setCurrentCategory={props.setCurrentCategory}
                />
                <CategoryCard
                    category={{
                      id: 'new', name: 'new', title: 'Новые', children: [],
                    }}
                    onCategorySelect={props.onCategorySelect}
                    setCurrentCategory={props.setCurrentCategory}
                />
            </Grid>
        </Box>);
}
