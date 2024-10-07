import React, { FC, useState } from 'react';
import Box from '@mui/material/Box';
import Link from 'next/link';
import Button from '@mui/material/Button';
import { signOut, useSession } from 'next-auth/react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { Menu, MenuItem, IconButton } from '@mui/material';

const AuthBlock: FC<{ type: 'mobile' | 'desktop'; closeCallback: () => void }> = ({ type, closeCallback }) => {
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    closeCallback();
  };

  const handleLogout = async () => {
    await signOut();
    handleMenuClose();
  };

  return (
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
      <Button
        color="inherit"
        variant={'contained'}
        onClick={handleMenuOpen}
        startIcon={<AccountCircleIcon />}
      >
        Аккаунт
      </Button>
      {session?.user && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>
            <Link href="/profile">Профиль</Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link href="#">Мои Идеи</Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link href="/projects">Мои Проекты</Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link href="/account">Аккаунт</Link>
          </MenuItem>
          <MenuItem onClick={handleLogout}>Выйти</MenuItem>
        </Menu>
      )}
      {!session && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>
            <Link href="/login">Войти</Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link href="/register">Регистрация</Link>
          </MenuItem>
        </Menu>
      )}
    </Box>
  );
};

export { AuthBlock };
