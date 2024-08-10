import { FC } from 'react';
import { useRouter } from 'next/navigation';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Logo } from '@/components/base/logo/Logo';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { theme } from '@/theme';
import Box from '@mui/material/Box';
import Link from 'next/link';
import Button from '@mui/material/Button';
import TelegramIcon from '@mui/icons-material/Telegram';
import { AuthBlock } from '@/components/layout/navigation/AuthBlock';
import { type HeaderLink } from '@/components/layout/Navigation';

const HeaderDesktop: FC<{
  links: HeaderLink[];
  activeLink: HeaderLink['value'];
  pathToLinkSlugMap: Record<HeaderLink['value'], string>;
}> = ({ links, activeLink, pathToLinkSlugMap }) => {
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
            <Link
              target={'_blank'}
              href={'https://t.me/svyatamesto'}
            >
              <Button
                color="inherit"
                sx={{ display: 'flex', gap: 1 }}
              >
                Telegram
                <TelegramIcon />
              </Button>
            </Link>
            <AuthBlock
              closeCallback={() => {}}
              type={'desktop'}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default HeaderDesktop;
