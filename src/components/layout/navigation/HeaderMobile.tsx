import { FC, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Logo } from '@/components/base/logo/Logo';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AuthBlock } from '@/components/layout/navigation/AuthBlock';
import Button from '@mui/material/Button';
import { type HeaderLink } from '@/components/layout/Navigation';

const HeaderMobile: FC<{
  links: HeaderLink[];
  activeLink: HeaderLink['value'];
  pathToLinkSlugMap: Record<HeaderLink['value'], string>;
}> = ({ links, pathToLinkSlugMap }) => {
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
      <Container
        sx={{ display: { sm: 'block', md: 'none' } }}
        maxWidth="lg"
      >
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
          <AuthBlock
            closeCallback={toggleMobileMenu}
            type={'mobile'}
          />
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

export default HeaderMobile;
