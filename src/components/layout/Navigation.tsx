'use client';

import { useSession, signOut } from 'next-auth/react';
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
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FC, useCallback, useMemo, useState } from 'react';

type HeaderLink = {
  label: string;
  value: string;
};

const pathToLinkSlugMap: Record<HeaderLink['value'], string> = {
  '/': 'main',
  '/my-tasks': 'myTasks',
  '/find-project': 'findProject',
  '/propose-idea': 'proposeIdea',
  '/find-project/subscribers': 'subscribers',
};

const AuthBlock: FC<{ type: 'mobile' | 'desktop' }> = ({ type }) => (
  <Box
    sx={{
      display: 'flex',
      gap: 1,
      justifyContent: 'stretch',
      flexGrow: 1,
      ...(type === 'mobile'
        ? {
            padding: 2,
            '& > *': {
              flex: 1,
              width: '50%',
            },
          }
        : {}),
    }}
  >
    <Link href={{ pathname: '/login' }}>
      <Button
        sx={{
          width: '100%',
        }}
        color="inherit"
        variant={'contained'}
      >
        Войти
      </Button>
    </Link>
    <Link href={{ pathname: '/register' }}>
      <Button
        sx={{
          width: '100%',
        }}
        color="inherit"
        variant={'contained'}
      >
        Регистрация
      </Button>
    </Link>
  </Box>
);

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
            <Button
              color="inherit"
              sx={{ display: 'flex', gap: 1 }}
            >
              Telegram
              <TelegramIcon />
            </Button>
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
    } else {
      console.error('Нет соответствующего ключа для значения:', value);
    }
  };

  return (
    <>
      <Container maxWidth="lg">
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

type Props = {
  isHome?: boolean;
};

export const Navigation: React.FC<Props> = (props) => {
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
    [session]
  );

  return (
    <Box>
      <HeaderDesktop
        activeLink={activeLink}
        links={links}
      />
      {props.isHome ? (
        <HeaderMobile
          activeLink={activeLink}
          links={links}
        />
      ) : (
        ''
      )}
    </Box>
  );
};
