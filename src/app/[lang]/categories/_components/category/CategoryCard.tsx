import { Card, CardActionArea, CardContent, Grid, Typography } from '@mui/material';
import type { TCategory, TCardProps } from '@/types/findProjects';

const styles = {
  card: {
    height: '140px',
  },
};

export const CategoryCard = (props: TCardProps) => {
  const { category } = props;
  const handleClick = (value: TCategory) => {
    if (value.children?.length > 0) {
      if (typeof props.setCurrentCategory === 'function') {
        props.setCurrentCategory(value);
      }
    } else if (value.id === 'back') {
      if (typeof props.setCurrentCategory === 'function') {
        props.setCurrentCategory(null);
      }
    } else if (typeof props.onCategorySelect === 'function') {
      props.onCategorySelect(value);
    }
  };
  return (
    <Grid
      item
      xs={6}
      md={4}
      key={category.id}
    >
      <Card>
        <CardActionArea sx={styles.card}>
          <CardContent
            data-test={`category-${category.id}`}
            onClick={() => handleClick(category)}
          >
            <Typography>{category.title}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};
