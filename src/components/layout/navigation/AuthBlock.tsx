import { FC } from 'react';
import Box from '@mui/material/Box';
import Link from 'next/link';
import Button from '@mui/material/Button';
import { signOut, useSession } from 'next-auth/react';

const AuthBlock: FC<{ type: 'mobile' | 'desktop' }> = ({ type }) => {
  const { data: session } = useSession();

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
            {
                session?.user && (
                    <>
                        <Link href={'#'} onClick={async () => { await signOut(); }}>
                            <Button
                                sx={{
                                  width: '100%',
                                }}
                                color="inherit"
                                variant={'contained'}
                            >
                                Выйти
                            </Button>
                        </Link>
                        <Link href={{ pathname: '/my-account' }}>
                            <Button
                                sx={{
                                  width: '100%',
                                }}
                                color="inherit"
                                variant={'contained'}
                            >
                                Аккаунт
                            </Button>
                        </Link>
                    </>
                )
            }
            {
                !session && (
                    <>
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
                    </>
                )
            }
        </Box>
  );
};

export { AuthBlock };
