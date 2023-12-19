'use client'
import { useState } from 'react';
import { Container, Box, Button, Typography, Icon, createTheme, ThemeProvider  } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import findPageStyles from './foundProjects/pageStyles'
import { publicSans } from '../utils/fonts';
import { Theme } from './Styles/theme';
const theme = createTheme(Theme);


export default function FindProject() { 
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  const onHandleClick = () => {
    setVisible(!visible);
  };

  const handleClick = (value: string) => {
    router.push(`/find-project/foundProjects?value=${value}`)
  };

  return (
  <>
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" disableGutters>
        <Box sx={findPageStyles.container}>
          <Link href={{ pathname: '/' }} passHref style={findPageStyles.backlLink}>
            <Icon sx={findPageStyles.icon} aria-label="back">
              <ArrowBack sx={findPageStyles.arrowBack} />
            </Icon>
          </Link>
          <Typography variant={'h6'} sx={findPageStyles.title}>Поиск проекта</Typography>
        </Box>
        
        <Box sx={findPageStyles.optionsContainer}>
          <Box sx={findPageStyles.mainOptions}>
            <Button
              className={publicSans.className}
              fullWidth
              onClick={() => handleClick('subscribers')}
              sx={[findPageStyles.buttons, findPageStyles.subscribes]}
            >
              От подписчиков
            </Button>
            <Button sx={[findPageStyles.buttons, findPageStyles.fromSvyat]} onClick={onHandleClick}>
              От Свята
            </Button>
            <Button
              sx={[findPageStyles.buttons, findPageStyles.bests]}
              onClick={() => handleClick('bests')}>
              Лучшие
            </Button>
            <Button
              onClick={() => handleClick('changeInfo')}
              sx={[findPageStyles.buttons, findPageStyles.changeInfo]}
            >
              Изменить данные
            </Button>
          </Box>
          {visible ? (
            <Box sx={findPageStyles.addOptions}>
              <Button sx={[findPageStyles.buttons, findPageStyles.fromSvyat]} onClick={() => handleClick('training')}>
                Тренировочный
              </Button>
              <Button sx={[findPageStyles.buttons, findPageStyles.fromSvyat]} onClick={() => handleClick('advanced')}>
                Продвинутый
              </Button>
              <Button sx={[findPageStyles.buttons, findPageStyles.fromSvyat]} onClick={() => handleClick('complex')}>
                Комплексный
              </Button>
            </Box>
          ) : (null)}
        </Box>
      </Container >
      
    </ThemeProvider>
  </>
  )
}
