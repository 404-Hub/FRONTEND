const findPageStyles = {
  pageTitle: {
    display: {
      xs: 'none',
      md: 'block',
    },
    marginTop: '16px',
    marginBottom: '31px',
  },
  mainContainer: {
    margin: '0 auto',
    maxWidth: {
      md: '1156px',
    },
    boxSizing: 'border-box',
    padding: {
      md: '0 16px',
    },
  },
  centralContainer: {
    display: {
      md: 'flex',
    },
    gap: {
      md: '22px',
    },
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: { xs: '16px', md: '0px' },
    background: {
      xs: '#FFFFFF',
      md: 'transparent',
    },
  },
  icon: {
    padding: '0px',
    display: {
      xs: 'flex',
      md: 'none',
    },
  },
  arrowBack: {
    width: 24,
    height: 24,
    color: '#161C24',
  },
  backlLink: {
    width: '24px',
    height: '24px',
  },
  title: {
    fontWeight: '600',
    paddingLeft: { xs: '24px', md: '0px' },
    marginTop: {
      xs: '0',
      md: '30px',
    },
    fontSize: {
      xs: '20px',
      md: '24px',
    },
  },
  link: {
    display: {
      md: 'none',
    },
  },
  optionsContainer: {
    padding: {
      xs: '17px',
      md: '0',
    },
  },
  mainOptions: {
    margin: '0 auto',
    paddingTop: {
      md: '40px',
    },
    fontWeight: '600',
    fontSize: '20px',
    maxWidth: 380,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(47%, 1fr))',
    gap: '16px',
  },
  buttons: {
    aspectRatio: '1',
    color: 'white',
    width: '100%',
    borderRadius: '16px',
    textTransform: 'none',
    fontSize: 20,
    lineHeight: 1.6,
    paddingLeft: '12px',
    paddingRight: '12px',
  },
  subscribes: {
    backgroundColor: '#8D40FB',
  },
  fromSvyat: {
    backgroundColor: '#FC573A',
  },
  bests: {
    backgroundColor: '#2FC362',
  },
  changeInfo: {
    backgroundColor: '#1EB8D7',
  },
  addOptions: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: '1fr',
    gap: '16px',
    margin: '40px auto',
    maxWidth: '578px',
  },
};

export default findPageStyles;
