'use client';

import { useSession } from 'next-auth/react';
import { Logo } from '@/components/base/logo/Logo';
import { theme } from '@/theme';
import MenuIcon from '@mui/icons-material/Menu';
import TelegramIcon from '@mui/icons-material/Telegram';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { usePathname, useRouter } from 'next/navigation';
import {
  FC, useCallback, useMemo, useState,
} from 'react';
import { AuthBlock } from '@/components/layout/navigation/AuthBlock';
import Link from 'next/link';

type HeaderLink = {
  label: string;
  value: string;
};

const pathToLinkSlugMap: Record<HeaderLink['value'], string> = {
  '/': 'main',
  '/tasks': 'myTasks',
  '/categories': 'findProject',
  '/projects/new': 'proposeIdea',
  '/find-project/subscribers': 'subscribers',
};

const HeaderDesktop: FC<{
  links: HeaderLink[];
  activeLink: HeaderLink['value'];
}> = ({ links, activeLink }) => {
  const router = useRouter();
  const handleTabClick = (value: string) => {
    const pathKey = Object.keys(pathToLinkSlugMap).find((key) => pathToLinkSlugMap[key] === value);
    if (pathKey) {
      router.push(pathKey);
    } else {
      console.error('Нет соответствующего ключа для значения:', value);
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ display: { xs: 'none', md: 'block' } }}
    >
      <AppBar
        position="sticky"
        color={'transparent'}
        sx={{
          boxShadow: 'none',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexGrow: 1,
            maxWidth: '1440px',
          }}
        >
          <Logo />
          {/* https://github.com/mui/material-ui/issues/32749#issuecomment-1258711077 */}
          <Tabs
            value={activeLink || false}
            onChange={(_, value) => handleTabClick(value)}
          >
            {links.map(({ label, value }) => (
              <Tab
                key={value}
                label={label}
                value={value}
                sx={{
                  fontSize: theme.typography.pxToRem(12),
                  padding: 1,
                }}
              />
            ))}
          </Tabs>
          <Box sx={{ display: 'flex', gap: 3 }}>
              <Link target={'_blank'} href={'https://t.me/svyatamesto'}>
                  <Button
                      color="inherit"
                      sx={{ display: 'flex', gap: 1 }}
                  >
                      Telegram
                      <TelegramIcon />
                  </Button>
              </Link>
            <AuthBlock type={'desktop'} />
          </Box>
        </Toolbar>
      </AppBar>
    </Container>
  );
};

const HeaderMobile: FC<{
  links: HeaderLink[];
  activeLink: HeaderLink['value'];
}> = ({ links }) => {
  const [isMobileMenuExpanded, setIsMobileMenuExpanded] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuExpanded(!isMobileMenuExpanded);
  }, [isMobileMenuExpanded, setIsMobileMenuExpanded]);

  const router = useRouter();
  const handleTabClick = (value: string) => {
    const pathKey = Object.keys(pathToLinkSlugMap).find((key) => pathToLinkSlugMap[key] === value);
    if (pathKey) {
      router.push(pathKey);
      toggleMobileMenu();
    } else {
      console.error('Нет соответствующего ключа для значения:', value);
    }
  };

  return (
    <>
      <Container sx={{ display: { sm: 'block', md: 'none' } }} maxWidth="lg">
        <AppBar
          position="sticky"
          color={'transparent'}
          sx={{
            boxShadow: 0,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Toolbar
            sx={{
              display: 'flex',
              gap: 1,
              padding: 0,
            }}
          >
            <IconButton onClick={toggleMobileMenu}>
              <MenuIcon />
            </IconButton>
            <Logo />
          </Toolbar>
        </AppBar>
      </Container>
      <Drawer
        anchor={'left'}
        open={isMobileMenuExpanded}
        onClose={toggleMobileMenu}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '80vw',
          }}
        >
          <Box
            sx={{
              paddingTop: 3,
              paddingLeft: 3,
              paddingRight: 3,
              paddingBottom: 1,
            }}
          >
            <Typography
              variant={'h6'}
              align={'left'}
              sx={{ width: '100%' }}
            >
              Menu
            </Typography>
          </Box>
          <AuthBlock type={'mobile'} />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: 2,
            }}
          >
            {links.map((tab) => (
              <Button
                key={tab.value}
                onClick={() => handleTabClick(tab.value)}
              >
                <Typography
                  variant={'body2'}
                  align={'left'}
                  sx={{ width: '100%' }}
                >
                  {tab.label}
                </Typography>
              </Button>
            ))}
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export const Navigation: FC = () => {
  const pathname = usePathname();
  const session = useSession();

  const activeLink = useMemo(() => pathToLinkSlugMap[pathname], [pathname]);

  const links = useMemo<HeaderLink[]>(
    () => [
      {
        label: 'Главная',
        value: 'main',
      },
      {
        label: 'Мои задачи',
        value: 'myTasks',
      },
      {
        label: 'Найти проект',
        value: 'findProject',
      },
      ...(session.status === 'authenticated'
        ? [
          {
            label: 'Предложить идею для проекта',
            value: 'proposeIdea',
          },
        ]
        : []),
    ],
    [session],
  );

  return (
    <Box>
      <HeaderDesktop
        activeLink={activeLink}
        links={links}
      />
      <HeaderMobile activeLink={activeLink} links={links} />
    </Box>
  );
};
