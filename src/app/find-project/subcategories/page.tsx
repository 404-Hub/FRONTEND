import Subcategory from '@/components/findProject/Subcategory';
import { Navigation } from '@/components/layout/Navigation';
import Breadcrams from '@/components/layout/breadcrumbs/Breadcrams';
import findPageStyles from '@/styles/findProjectStyles/pageStyles';
import { Box } from '@mui/material';

export default function Subcategories() {


  return (
    <>
      <Navigation />
      <Box sx={findPageStyles.mainContainer}>
        <Breadcrams subcategory={'От Свята'} />
        <Subcategory />
      </Box>
    </>
  );
}
