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
    marginLeft: '10px',
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
  clearIcon: {
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

export default selectFiltersStyles;
