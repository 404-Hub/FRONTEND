'use client'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Button } from '@mui/material';

type Props = {
  project: {
    rating: string,
    number: number,
    name: string,
    description: string
  },
};

const ProjectCard: React.FC<Props> = (props) => {
  return (
    <Box sx={[projectCardStyles.container]}>
      <Box sx={projectCardStyles.ratingContainer}>
        <Button sx={[projectCardStyles.arrowButtons, projectCardStyles.activeArrow]} color='inherit'>
          <KeyboardArrowUpIcon />
        </Button>
        <Typography sx={[projectCardStyles.cardText, projectCardStyles.cardRating]}>{props.project.rating}</Typography>
        <Button sx={projectCardStyles.arrowButtons}>
          <KeyboardArrowDownIcon sx={projectCardStyles.passiveArrow}/>
        </Button>
      </Box>
      <Typography sx={projectCardStyles.projectNumber}>№ {props.project.number}</Typography>
      <Typography sx={projectCardStyles.title}>{props.project.name}</Typography>
      <Typography sx={[projectCardStyles.cardText, projectCardStyles.projectDescription]}>{props.project.description}</Typography>
    </Box>
  )
}

export default ProjectCard

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
  },
 title: {
  fontWeight: '600',
  fontSize: '20px',
  color: "#161C24",
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
    paddingTop: '9px'
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
