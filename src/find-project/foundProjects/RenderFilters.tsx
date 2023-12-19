'use client'
import { Box, Checkbox, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import filtersStyles from './filtersStyles';
import { AllFilters, HandleValueType } from '../../Types/Types';


type Props = {
  allFilters: AllFilters;
  handleChange: HandleValueType
  showFilters: boolean,
}


const RenderFilters: React.FC<Props> = (props) => {
return (
<>
<Box sx={filtersStyles.filterContainer}>
{props.allFilters.map((filter) => {
  if (filter.type === 'checkbox') {
    return (
    <Box key={filter.name} sx={filtersStyles.filterBlock}>
      <Typography variant={'h6'} sx={filtersStyles.filterBlockLabel}>{filter.label}</Typography>
      {filter.options.map((option) => (
        <FormControlLabel
          key={option.name}
          label={option.label}
          sx={filtersStyles.filterLabel}
          control={
            <Checkbox
              key={option.name}
              checked={option.checked}  
              sx={[filtersStyles.formControlLabel, filtersStyles.formSelect]}
              onChange={()=> props.handleChange(filter.name, option.name, filter.type, !option.checked)}
            />
            }
        />
      ))}
    </Box>
    );
  } else if (filter.type === 'radio') {
    return (
      <Box key={filter.name} sx={filtersStyles.filterBlock}>
        <Typography variant={'h6'} sx={filtersStyles.filterBlockLabel}>{filter.label}</Typography>
        <RadioGroup name={filter.name}>
          {filter.options.map((option) => (
            <FormControlLabel
              key={option.name}
              sx={filtersStyles.filterLabel}
              control={<Radio   checked={option.checked}   sx={filtersStyles.formSelect} />}
              value={option.name}
              label={option.label}
              onChange={()=> props.handleChange(filter.name, option.name, filter.type, !option.checked)}
            />
          ))}
        </RadioGroup>
      </Box>
    );
  } else {
    return (null);
  }
})}
</Box>
</>
)}

export default RenderFilters;

