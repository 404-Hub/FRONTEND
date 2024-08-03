import { Container, Grid } from '@mui/material';
import type { TSubCategoryProps } from '@/types/findProjects';
import { CategoryCard } from './CategoryCard';

export const SubCategory = (props: TSubCategoryProps) => {
  const { category } = props;
  return (
    <Container>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <CategoryCard
          category={{ id: 'back', name: '<- Назад', children: [] }}
          onCategorySelect={props.onCategorySelect}
          setCurrentCategory={props.setCurrentCategory}
        />
        {category.children.map((child) => (
          <CategoryCard
            category={child}
            onCategorySelect={props.onCategorySelect}
            setCurrentCategory={props.setCurrentCategory}
            key={`${category.id}_${child.id}`}
          />
        ))}
      </Grid>
    </Container>
  );
};
