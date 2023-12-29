'use client';

import { ArrowBack } from '@mui/icons-material';
import {
  Box, Button, Container, Icon, ThemeProvider, Typography, createTheme,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import findPageStyles from '../../styles/findProjectStyles/pageStyles';
import { Theme } from '../../styles/findProjectStyles/theme';
import { publicSans } from '../../utils/fonts';

const theme = createTheme(Theme);

export default function FindProject() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  const onHandleClick = () => {
    setVisible(!visible);
  };

  const handleClick = (value: string) => {
    router.push(`/find-project/foundProjects?value=${value}`);
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
              <Button
                sx={[findPageStyles.buttons, findPageStyles.fromSvyat]}
                onClick={onHandleClick}
              >
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
  );
}
