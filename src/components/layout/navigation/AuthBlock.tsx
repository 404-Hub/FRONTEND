import { FC } from 'react';
import Box from '@mui/material/Box';
import Link from 'next/link';
import Button from '@mui/material/Button';

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

export { AuthBlock };
