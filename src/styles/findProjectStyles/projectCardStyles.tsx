const projectCardStyles = {
  container: {
    backgroundColor: '#ffffff',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    borderRadius: '12px',
    boxShadow: '0px 6px 12px -4px #161C241F',
    maxWidth: {
      xs: '380px',
      md: '264px',
    },
    cursor: 'pointer',
    transition: 'box-shadow 0.2s ease-in-out',
    '&:hover': {
      boxShadow: '0px 6px 12px -4px #454F5A',
    },
  },
  title: {
    fontWeight: '600',
    fontSize: '20px',
    color: '#161C24',
  },
  cardText: {
    fontSize: '16px',
  },
  cardRating: {
    color: '#1C8C59',
  },
  projectNumber: {
    fontSize: '14px',
  },
  projectDescription: {
    paddingTop: '9px',
  },
  ratingContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '12px',
    alignItems: 'center',
    paddingBottom: {
      xs: '15px',
      ms: '19px',
    },
    marginBottom: '8px',
    borderBottom: '1px solid #DFE3E8',
  },
  arrowButtons: {
    padding: '0',
    minWidth: '28px',
    borderRadius: '4px',
    width: '28px',
    height: '28px',
  },
  activeArrow: {
    backgroundColor: '#F4F6F8',
  },
  passiveArrow: {
    color: '#647380',
  },
};

export default projectCardStyles;
