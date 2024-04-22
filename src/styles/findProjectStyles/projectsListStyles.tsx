const projectsListStyles = {
  searchContainer: {
    flex: 1,
    padding: {
      xs: '0 16px',
      md: 0,
    },
  },
  searchAmount: {
    margin: {
      xs: '0 0 17px 0px',
      md: '17px 0 25px 0px',
    },
  },
  title: {
    fontWeight: '600',
    fontSize: '20px',
    color: '#161C24',
  },
  projectCardContainer: {
    display: {
      xs: 'flex',
      md: 'grid',
    },
    flexDirection: 'column',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr) )',
    gridAutoRows: 'minmax(100px, auto)',
    gap: '12px',
    margin: {
      xs: 0,
      md: '16px 0',
    },
  },
  loadButton: {
    display: 'block',
    margin: '40px auto 16px',
  },
};

export default projectsListStyles;
