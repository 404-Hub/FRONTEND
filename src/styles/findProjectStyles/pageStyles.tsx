const findPageStyles = {
  pageTitle: {
    display: {
      xs: 'none',
      md: 'block',
    },
    marginTop: '16px',
    marginBottom: '31px',
    fontWeight: 800,
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
    transition: 'transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
    width: { xs: '100vw', md: '20%' },
    position: { md: 'static', xs: 'fixed' },
    left: { xs: 0, md: 'none' },
    top: { xs: '10%', md: 'none' },
    zIndex: 1000,
    backgroundColor: { xs: '#F9FAFB', md: 'transparent' },
    display: 'flex',
    flexDirection: 'column',
    height: { xs: '90%', md: 'auto' },
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
    display: {
      xs: 'flex',
      md: 'none',
    },
  },
  title: {
    fontWeight: '600',
    paddingLeft: { xs: '24px', md: '0px' },
    marginTop: {
      xs: '0',
      md: '24px',
    },
    marginBottom: {
      xs: '0',
      md: '32px',
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
  buttons: {
    backgroundColor: '#FFD600',
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
