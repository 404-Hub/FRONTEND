import { Box, Button } from "@mui/material";
import TuneIcon from '@mui/icons-material/Tune';
import ClearIcon from '@mui/icons-material/Clear';
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AllFilters, HandleValueType, SelectedFilters } from "../../Types/Types";


type Props = {
  projectType: string | null;
  allFilters: AllFilters;
  setShowFilters: Dispatch<SetStateAction<boolean>>;
  showFilters: boolean;
  allValues: string[];
  handleChange: HandleValueType;
};
const getCheckedOptions = (ob: AllFilters): any[] => {
  const checkedOptions: any[] = [];

  for (const item of ob) {
    const options = item.options.filter((option: any) => option.checked === true).map((el) =>({ ...el, filter:item.name, type: item.type }));
    checkedOptions.push(...options);
  }

  return checkedOptions;
}

const SelectFilters: React.FC<Props> = (props) => {
  const [filtersExist, setFiltersExist] = useState<boolean>(false);
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters[]>([]);
  
  useEffect(()=>{
    setFiltersExist(selectedFilters.length>0);
    setSelectedFilters(getCheckedOptions(props.allFilters));
  }, [props.allFilters]);
  useEffect(()=>{
    setFiltersExist(selectedFilters.length>0);
  }, [selectedFilters]);
  
  return (
    <>
      <Box sx={selectFiltersStyles.filtersContainer} style={{ justifyContent: filtersExist ? 'space-between': 'flex-end'}}>
        {selectedFilters.length ? (
          <Box sx={{ display: !props.showFilters ? 'flex' : 'none', gap: '12px', overflow: 'auto' }}>
            {selectedFilters.map((item, index) =>
              <Box key={index} sx={selectFiltersStyles.selectedFilters}>
                {item.label}
                <Button onClick={()=> props.handleChange(item.filter, item.name, item.type, !item.checked)} sx={selectFiltersStyles.clearButton}>
                  <ClearIcon sx={selectFiltersStyles.clearIcon} />
                </Button>
              </Box>
            )}
          </Box>)
          : ''}
        <Button
          onClick={() => props.setShowFilters(true)} 
          color='inherit' 
          sx={selectFiltersStyles.filtersButton} 
        >
          <TuneIcon sx={selectFiltersStyles.tuneIcon} />
          { filtersExist ? <Box sx={selectFiltersStyles.filtersIndicator} /> : ''}
        </Button>
      </Box>
    </>
  )
};

export default SelectFilters;


const selectFiltersStyles = {
  filtersContainer: {
    padding: '16px',
    display: {
      xs: 'flex',
      md: 'none',
    },
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
  filtersButton: {
    border: '1px solid #DFE3E8',
    borderRadius: '8px',
    minWidth: '0',
    width: '44px',
    height: '44px',
    padding: '0',
    flex: 'none',
    marginLeft:'10px',
  },
  filtersIndicator: {
    position: 'absolute',
    top: '6px',
    right: '6px',
    background: '#FC573A',
    borderRadius: '50%',
    width: '6px',
    height: '6px',
  },
  tuneIcon: {
    width: '18px',
  },
  selectedFilters: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '12px',
    border: '1px solid #DFE3E8',
    borderRadius: '8px',
    padding: '8px',
    fontSize: '14px',
    whiteSpace: 'nowrap',
  },
  clearIcon:{
    alignItems: 'center',
    borderRadius: '100%',
    backgroundColor: '#919EAA',
    color: '#FFFFFF',
    padding: '4px',
    height: '12px',
    width: '12px',
  },
  clearButton: {
    padding: 0,
    minWidth: '0',
  },
};