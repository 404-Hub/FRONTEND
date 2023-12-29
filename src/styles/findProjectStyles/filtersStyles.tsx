const filtersStyles = {
  filterMainContainer: {
    backgroundColor: {
      xs: '#F9FAFB',
      md: 'transparent',
    },
    filterContainer: {
      display: {
        xs: 'block', md: 'flex',
      },
      flexDirection: 'row',
    },
    height: {
      xs: '100vh',
      md: 'auto',
    },
    position: {
      xs: 'fixed',
      md: 'static',
    },
    zIndex: 1000,
    overflow: {
      xs: 'hidden',
      md: 'visible',
    },
    width: '100%',
  },

  filterTitle: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    display: {
      xs: 'flex',
      md: 'none',
    },
  },
  iconButton: {
    padding: 0,
  },
  filtersReset: {
    display: {
      xs: 'none',
      md: 'flex',
    },
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '34px',
  },
  button: {
    border: 1,
    borderRadius: '6px',
    textTransform: 'none',
  },
  buttonReset: {
    borderColor: '#FFF2E6',
    color: '#FC573A',
    margin: '0',
    padding: '0',
    width: '100px',
    height: '36px',
    fontSize: '16px',
  },
  searchSelection: {
    display: {
      xs: 'none',
      md: 'block',
    },
    marginTop: '16px',
    marginBottom: {
      md: '31px',
    },
    fontSize: '24px',
    fontWeight: '600',
  },
  filtersBox: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: {
      xs: '32px',
      md: 0,
    },
    marginTop: { xs: '0px' },
    width: { xs: '100%', md: '264px' },
    borderRadius: '8px',
    boxShadow: { xs: 'none', md: '0px 6px 12px -4px #161C241F' },
    padding: { xs: '0', md: '16px' },
    backgroundColor: {
      md: '#ffffff',
    },
  },
  filterContainer: {
    width: '100%',
    height: {
      xs: 'calc(100% - 30px - 48px)',
      md: 'auto',
    },
    padding: {
      xs: '24px 16px 16px',
      md: '24px 0 16px',
    },
    overflow: {
      xs: 'auto',
      md: 'visible',
    },
    boxSizing: 'border-box',
  },
  filterBlock: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: {
      xs: '6px',
      md: '13px',
    },
  },
  filterBlockLabel: {
    marginBottom: {
      xs: '18px',
      md: '20px',
    },
    textTransform: {
      xs: 'none',
      md: 'uppercase',
    },
    fontSize: {
      md: '12px',
    },
  },
  filterLabel: {
    marginBottom: {
      xs: '27px',
      md: '19px',
    },
  },
  formControlLabel: {
    '& .MuiFormControlLabel-label': { ml: '19px' },
  },
  formSelect: {
    color: '#C4CDD5',
    height: 0,
    '& .MuiSvgIcon-root': { fontSize: 20 },
    '&.Mui-checked': { color: '#18A670' },
  },
  buttonBox: {
    display: { xs: 'flex', md: 'none' },
    flexDirection: 'row',
    marginRight: '0',
    marginTop: '68px',
    padding: '16px',
    justifyContent: 'space-between',
  },
  buttonCancel: {
    color: '#18A670',
    borderColor: '#18A670',
    height: '48px',
    flex: 1,
    mr: 2,
    fontSize: '16px',
  },

  buttonConfirm: {
    fontSize: '16px',
    color: '#FFFFFF',
    backgroundColor: '#18A670',
    flex: 1,
  },
};

export default filtersStyles;
